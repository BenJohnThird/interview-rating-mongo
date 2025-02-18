import mongoose, { Document, Schema } from 'mongoose';
import { thirtyDaysFromNow } from '../utils/date';

export interface SessionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const SessionSchema: Schema = new Schema<SessionDocument>({
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, default: thirtyDaysFromNow },
});

export const SessionModel = mongoose.model<SessionDocument>(
    'Session',
    SessionSchema,
);
