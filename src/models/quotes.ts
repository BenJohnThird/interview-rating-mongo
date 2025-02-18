import mongoose, { Schema } from 'mongoose';

export interface Quote extends mongoose.Document {
    quoteText: string;
}

const QuoteSchema: Schema = new mongoose.Schema<Quote>({
    quoteText: {
        type: String,
        required: [true, 'Quote Text is required'],
        unique: true,
    },
});

const Quotes = mongoose.model<Quote>(
    'Quotes',
    QuoteSchema
);

export default Quotes;
