import { Request, Response } from 'express';
import { CREATED } from '../constants/http';
import catchErrors from '../utils/catch-errors';
import { createAccount, loginUser } from '../services/auth.service';

export const login = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const userAgent = req.headers['user-agent'];

        const data = await loginUser({ email, password, userAgent });
        res.status(200).json(data);
    }
);

export const signup = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const userAgent = req.headers['user-agent'];

        // call service
        const data = await createAccount({ email, password, userAgent });
        res.status(CREATED).json(data);
    }
);
