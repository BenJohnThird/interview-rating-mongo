import express from 'express';
import { createMultipleQuotes, getQuotes, getRandomQuote } from '../controllers/quote.controller';

const router = express.Router();

router.get('/', getQuotes);
router.get('/random', getRandomQuote);
router.post('/multiple', createMultipleQuotes);

export default router;
