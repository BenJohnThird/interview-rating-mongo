import User from '../models/users';
import { SessionModel } from '../models/session';
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import appAssert from '../utils/app-assert';
import { UNAUTHORIZED } from '../constants/http';
import { RefreshTokenPayload, refreshTokenSignOptions, signToken } from '../utils/jwt';

export interface CreateAccountParams {
    email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams): Promise<any> => {

    const user = await User.create({
        email: data.email,
        password: data.password
    });

    // Create session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    });

    // sign access and refresh token
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,
        {
            audience: ['user'],
            expiresIn: '30d',
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id
        },
        JWT_SECRET,
        {
            audience: ['user'],
            expiresIn: '15m',
        }
    );

    return {
        user,
        accessToken,
        refreshToken,
    };
};

interface LoginParams {
    email: string;
    password: string;
    userAgent?: string;
};
export const loginUser = async ({
    email,
    password,
    userAgent,
}: LoginParams): Promise<any> => {
    const user = await User.login(email, password);
    appAssert(user, UNAUTHORIZED, 'Invalid email or password');

    const userId = user._id;
    const session = await SessionModel.create({
        userId,
        userAgent,
    });

    const sessionInfo: RefreshTokenPayload = {
        sessionId: session._id,
    };

    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
    const accessToken = signToken({
        ...sessionInfo,
        userId,
    });
    return {
        accessToken,
        refreshToken,
    };
};
