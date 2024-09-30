import { Request, Response } from 'express';
import Innings from '../models/Innings';
import Ball from '../models/Ball';
import Over from '../models/Over';

export const getScore = async (req: Request, res: Response) => {
    const { inningId } = req.params;

    try {
      // Fetch inning details and populate the team name
      const inning = await Innings.findById(inningId).populate('battingTeam', 'teamName');
  
      if (!inning) {
        return res.status(404).json({ message: 'Inning not found' });
      }
  
      // Count the number of balls bowled in the current inning
      const ballsBowled = await Ball.countDocuments({ overId: { $in: await Over.find({ inningId }).select('_id') } });
  
      res.json({
        battingTeam: inning?.battingTeam,
        runs: inning.runs,
        wickets: inning.wickets,
        ballsUsed: ballsBowled,
        wide: 0, // Default 0 or populate if it's part of your system
        noBall: 0, // Default 0 or populate if it's part of your system
        legBye: 0, // Default 0 or populate if it's part of your system
        bye: 0, // Default 0 or populate if it's part of your system
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching inning details', error });
    }
};
