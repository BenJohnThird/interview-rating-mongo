import catchErrors from '../utils/catch-errors';
import { Request, Response } from 'express';
import Quotes, { Quote } from '../models/quotes';
import appAssert from '../utils/app-assert';
import { BAD_REQUEST, CREATED, NOT_FOUND } from '../constants/http';

export const getQuotes = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const randomQuote = await Quotes.find();
        appAssert(randomQuote, NOT_FOUND, 'No Random Quote generated');
        res.status(200).json(randomQuote);
    }
);

export const getRandomQuote = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const quotesCount = await Quotes.countDocuments();
        appAssert(quotesCount, BAD_REQUEST, 'No Quotes in the DB');
        const randomQuote = await Quotes.findOne().skip(quotesCount - 1);
        appAssert(randomQuote, NOT_FOUND, 'No Random Quote generated');
        res.status(200).json(randomQuote);
    }
);

export const createMultipleQuotes = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const quotesArray = req.body;
        appAssert(quotesArray, BAD_REQUEST, 'Quotes must be supplied');
            
        if (!Array.isArray(quotesArray) || !quotesArray.length) {
            appAssert(quotesArray, BAD_REQUEST, 'Quotes must be supplied');
        }
            
        const quotesDocs: Quote[] = quotesArray.map((text: string) => ({ quoteText: text }));

        // Insert multiple quotes at once
        const savedQuotes = await Quotes.insertMany(quotesDocs);
        res.status(CREATED).json({ message: 'Quotes created successfully', quotes: savedQuotes });
    }
);
