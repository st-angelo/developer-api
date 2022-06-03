import { Router } from 'express';
import { issueUpdated } from '../controllers/webhook';

const router = Router();

router.post('/atlassian/issue-updated/:issueId', issueUpdated);

export default router;
