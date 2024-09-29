import express, {Router, Request, Response} from 'express';
import { createNewBall, setRunsForBall } from '../controllers/ballController';
import { controllerMiddleware } from '../middlewares/controllerMiddleware';

const router:Router = express.Router();

// Route for creating a new ball
router.post('/create', controllerMiddleware(createNewBall));

// Route for setting runs for a particular ball
router.put('/runs', controllerMiddleware(setRunsForBall));

export default router;
