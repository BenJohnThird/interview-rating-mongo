import { UNAUTHORIZED } from '../constants/http';
import { verifyToken } from '../utils/jwt';
import appAssert from '../utils/app-assert';
import AppErrorCode from '../constants/app-error-code';

// wrap with catchErrors() if you need this to be async
const authenticate = (req: any, res: any, next: any): any => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    appAssert(
        accessToken,
        UNAUTHORIZED,
        'Not authorized',
        AppErrorCode.InvalidAccessToken
    );

    const { error, payload } = verifyToken(accessToken);
    appAssert(
        payload,
        UNAUTHORIZED,
        error === 'jwt expired' ? 'Token expired' : 'Invalid token',
        AppErrorCode.InvalidAccessToken
    );

    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
};

export default authenticate;
