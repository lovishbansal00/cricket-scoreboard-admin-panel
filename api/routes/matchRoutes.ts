import express from 'express';
import { getScore } from '../controllers/matchController';
import { controllerMiddleware } from '../middlewares/controllerMiddleware';

const router = express.Router();

// Route to get all innings
router.get('/:inningId', controllerMiddleware(getScore));

// Route to get inning by matchId

export default router;
