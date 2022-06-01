import { Router } from 'express';
import { issueUpdated } from '../controllers/webhooks';

const router = Router();

router.post('/atlassian/updated/:issueId', issueUpdated);

export default router;
