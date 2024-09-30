import { NextFunction, Request, Response } from 'express';
import Ball from '../models/Ball';
import Over from '../models/Over';
import Player from '../models/Player';
import Match from '../models/Match';

// Create a new ball
export const createNewBall = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { overId, batsmanId, bowlerId, inningId } = req.body;

        // Validate input
        if (!overId || !batsmanId || !bowlerId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if Over, Batsman, and Bowler exist
        const over = await Over.findById(overId);
        if (!over)
            return res.status(404).json({ error: 'Over not found' });

        const batsman = await Player.findById(batsmanId);
        if (!batsman)
            return res.status(404).json({ error: 'Batsman not found' });

        const bowler = await Player.findById(bowlerId);
        if (!bowler)
            return res.status(404).json({ error: 'Bowler not found' });

        // Check if over already has 6 balls
        const currentBallCount = over.balls.length;
        if (currentBallCount >= 6) {
            return res.status(400).json({ error: 'This over already has 6 balls. Cannot add more.' });
        }

        // Create a new ball
        const newBall = new Ball({
            overId,
            batsmanId,
            bowlerId,
            ballNumber: currentBallCount + 1, // Setting ball number as next available number
        });

        await newBall.save();

        over.balls.push(newBall._id); // Add the new ball to the over
        await over.save();

        // If 6 balls are completed in this over, create a new over
        let nextOver = null;
        if (over.balls.length === 6) {
            const newOver = new Over({
                overNumber: over.overNumber + 1, // Increment the over number
                bowlerId, // Assign a bowler, this can be changed based on frontend selection
                inningId: inningId,
            });

            nextOver = await newOver.save(); // Save the new over to the database
        }
        
        console.log('New ball created successfully');
        return res.status(201).json({
            message: 'New ball created successfully',
            ball: newBall,
            nextOver, // Include new over details if a new over was created0
        });
    } catch (error) {
        console.error('Error creating new ball:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Set runs for a particular ball
export const setRunsForBall = async (req: Request, res: Response) => {
    try {
        const { ballId, runsScored, isWicket, isExtra, extraType } = req.body;

        // Validate required fields
        if (!ballId || runsScored === undefined)
            return res.status(400).json({ error: 'Ball ID and runsScored are required' });

        // Find the ball by ID
        const ball = await Ball.findById(ballId);
        if (!ball)
            return res.status(404).json({ error: 'Ball not found' });

        // Update the ball's runs and other properties
        ball.runsScored = runsScored;

        // If it's a wicket, mark it as such
        if (isWicket !== undefined) {
            ball.isWicket = isWicket;
        }

        // If it's an extra (like a wide or no ball), mark it as such
        if (isExtra !== undefined) {
            ball.isExtra = isExtra;
            if (isExtra && extraType) {
                ball.extraType = extraType;
            }

            // Save the updated ball
            await ball.save();

            return res.status(200).json({
                message: 'Ball updated successfully',
                ball,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
