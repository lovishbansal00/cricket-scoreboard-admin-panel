import { Request, Response } from 'express';
import Innings from '../models/Innings';

// Fetch all innings data
export const getInnings = async (req: Request, res: Response) => {
  try {
    const innings = await Innings.find().populate('battingTeam bowlingTeam');
    res.status(200).json(innings);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch specific inning data by matchId
export const getInningByMatch = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  try {
    const inning = await Innings.findOne({ matchId }).populate('battingTeam bowlingTeam');
    if (inning) {
      res.status(200).json(inning);
    } else {
      res.status(404).json({ message: "Inning not found" });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
