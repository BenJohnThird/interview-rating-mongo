import jwt, { VerifyOptions, SignOptions } from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import { IUsers } from '../models/users';
import { SessionDocument } from '../models/session';

export interface RefreshTokenPayload {
    sessionId: SessionDocument['_id'];
}

export interface AccessTokenPayload {
    userId: IUsers['_id'];
    sessionId: SessionDocument['_id'];
}

type SignOptionsAndSecret = SignOptions & {
    secret: string;
};

const defaults: SignOptions = {
    audience: ['User'],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '15m',
    secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: '30d',
    secret: JWT_REFRESH_SECRET,
};

export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options?: SignOptionsAndSecret
): any => {
    const { secret, ...signOpts } = options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
        ...defaults,
        ...signOpts,
    });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
    token: string,
    options?: VerifyOptions & {
        secret?: string;
    }
): any => {
    const { secret = JWT_SECRET, ...verifyOpts } = options || {};
    try {
        const payload = jwt.verify(token, secret, {
            ...defaults,
            ...verifyOpts,
        }) as TPayload;
        return {
            payload,
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};
