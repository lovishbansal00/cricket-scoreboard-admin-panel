import express from 'express';
import { getBatsman, getBowlers } from '../controllers/playerController';
import { controllerMiddleware } from '../middlewares/controllerMiddleware';

const router = express.Router();

// Route to change the player on wicket fall
router.get('/getBatsman/:teamId', controllerMiddleware(getBatsman));

// Route to change the player on demand (retired hurt or tactical switch)
router.get('/getBowlers/:teamId', controllerMiddleware(getBowlers));

export default router;
