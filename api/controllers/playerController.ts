import { Request, Response } from 'express';
import Player from '../models/Player';

// Change player on wicket fall
export const getBatsman = async (req: Request, res: Response) => {
    const { teamId } = req.params;
    try {
        const players = await Player.find({ teamId });
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching players' });
    }
};

// Change player on demand (e.g., retired hurt)
export const getBowlers = async (req: Request, res: Response) => {
    const { teamId } = req.params;

    try {
        const bowlers = await Player.find({
            teamId,
            role: { $in: ['Bowler', 'All-Rounder'] },
        });
        res.json(bowlers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bowlers' });
    }
};
