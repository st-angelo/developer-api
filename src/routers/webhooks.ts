import { Router } from 'express';
import { login } from '../controllers/authentication';

const router = Router();

router.post('/login', login);

export default router;
