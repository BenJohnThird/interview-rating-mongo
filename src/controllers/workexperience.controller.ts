import { Request, Response } from 'express';
import { WorkExperience } from '../models/workexperience';
import catchErrors from '../utils/catch-errors';

export const getPublicWorkExperiences = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const experiences = await WorkExperience.find({ isPrivate: false });
        res.status(200).json(experiences);
    }
);

export const getWorkExperiences = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const experiences = await WorkExperience.find();
        res.status(200).json(experiences);
    }
);

export const createWorkExperience = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const newExperience = new WorkExperience(req.body);
        await newExperience.save();
        res.status(201).json(newExperience);
    }
);

export const updateWorkExperience = catchErrors(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedExperience = await WorkExperience
            .findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExperience) {
            res.status(404).json({ message: 'Work Experience not found' });
            return;
        }

        res.status(200).json(updatedExperience);
    }
);
