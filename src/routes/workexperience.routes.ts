import express from 'express';
import { createWorkExperience,
    getPublicWorkExperiences,
    getWorkExperiences,
    updateWorkExperience } from '../controllers/workexperience.controller';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.get('/Public', getPublicWorkExperiences);
router.get('/', authenticate, getWorkExperiences);
router.post('/', authenticate, createWorkExperience);
router.put('/:id', authenticate, updateWorkExperience);

export default router;
