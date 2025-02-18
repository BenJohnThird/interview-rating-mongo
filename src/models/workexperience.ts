import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
    name: string;
    description: string;
    companyName: string;
    responsibilities: string[];
    techStack: string[];
    isCurrentCompany: boolean;
    isPrivate: boolean;
    startDate: string;
    endDate: string;
}

const WorkExperienceSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    companyName: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    techStack: { type: [String], required: true },
    isCurrentCompany: { type: Boolean, required: true },
    isPrivate: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
}, { timestamps: true });

export const WorkExperience = mongoose.model<IWorkExperience>(
    'WorkExperience',
    WorkExperienceSchema
);
