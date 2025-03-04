import express from 'express';
import { login, signup } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.post('/refresh', () => {
});

export default router;
