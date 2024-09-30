import express, { Request, Response, Router } from 'express';
import Match from '../models/Match';
import Innings from '../models/Innings';
import { controllerMiddleware } from '../middlewares/controllerMiddleware';

const utilRouter: Router = express.Router();

// API to get match and inning details
utilRouter.get('/get', controllerMiddleware(async (req: Request, res: Response)=> {
    try {
        // Find the latest match
        const match = await Match.findOne({}).sort({ matchDate: -1 }).lean();
        if (!match) 
            return res.status(404).json({ message: 'No match found' });

        // Find the first innings for the match
        const innings = await Innings.findOne({ matchId: match._id }).lean();
        if (!innings) 
            return res.status(404).json({ message: 'No innings found' });

        res.json({
            matchId: match._id,
            inningId: innings._id,
            battingTeamId: innings.battingTeam,
            bowlingTeamId: innings.bowlingTeam,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching match details', error });
    }
}));

export default utilRouter;