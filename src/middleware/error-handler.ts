import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/http';
import AppError from '../utils/app.error';

const handleAppError = (res: any, error: AppError): any => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        handleAppError(res, error);
        return;
    }

    res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
};

export default errorHandler;
