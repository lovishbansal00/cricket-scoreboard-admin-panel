import mongoose from 'mongoose';
import Team from '../models/Team';
import Player from '../models/Player';
import Match from '../models/Match';
import Innings from '../models/Innings';

// Seed Function
const seedData = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        // await mongoose.connect(process.env.MONGODB_URI || 'your_mongo_uri', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });

        // console.log('Connected to MongoDB');

        // Clear existing data
        await Team.deleteMany({});
        await Player.deleteMany({});
        await Match.deleteMany({});
        await Innings.deleteMany({});

        // Create teams
        const teamIndia = new Team({
            teamName: 'Team India',
        });
        const teamPakistan = new Team({
            teamName: 'Team Pakistan',
        });

        await teamIndia.save();
        await teamPakistan.save();
        console.log('Teams seeded');

        // Create players for Team India
        const playersIndia = [
            { name: 'Rohit Sharma', teamId: teamIndia._id, role: 'Batsman' },
            { name: 'Virat Kohli', teamId: teamIndia._id, role: 'Batsman' },
            { name: 'Shikhar Dhawan', teamId: teamIndia._id, role: 'Batsman' },
            { name: 'KL Rahul', teamId: teamIndia._id, role: 'Batsman' },
            { name: 'Rishabh Pant', teamId: teamIndia._id, role: 'Batsman' },
            { name: 'Hardik Pandya', teamId: teamIndia._id, role: 'All-Rounder' },
            { name: 'Jasprit Bumrah', teamId: teamIndia._id, role: 'Bowler' },
            { name: 'Bhuvneshwar Kumar', teamId: teamIndia._id, role: 'Bowler' },
            { name: 'Mohammed Shami', teamId: teamIndia._id, role: 'Bowler' },
            { name: 'Yuzvendra Chahal', teamId: teamIndia._id, role: 'Bowler' },
            { name: 'Ravindra Jadeja', teamId: teamIndia._id, role: 'All-Rounder' },
        ];

        // Save Team India players
        const savedPlayersIndia = await Player.insertMany(playersIndia);
        console.log('Players for Team India seeded');

        // Create players for Team Pakistan
        const playersPakistan = [
            { name: 'Babar Azam', teamId: teamPakistan._id, role: 'Batsman' },
            { name: 'Mohammad Rizwan', teamId: teamPakistan._id, role: 'Batsman' },
            { name: 'Fakhar Zaman', teamId: teamPakistan._id, role: 'Batsman' },
            { name: 'Shaheen Afridi', teamId: teamPakistan._id, role: 'Bowler' },
            { name: 'Shadab Khan', teamId: teamPakistan._id, role: 'All-Rounder' },
            { name: 'Imad Wasim', teamId: teamPakistan._id, role: 'All-Rounder' },
            { name: 'Wahab Riaz', teamId: teamPakistan._id, role: 'Bowler' },
            { name: 'Mohammad Amir', teamId: teamPakistan._id, role: 'Bowler' },
            { name: 'Harish Sohail', teamId: teamPakistan._id, role: 'Batsman' },
            { name: 'Asif Ali', teamId: teamPakistan._id, role: 'Batsman' },
            { name: 'Haris Rauf', teamId: teamPakistan._id, role: 'Bowler' },
        ];

        // Save Team Pakistan players
        const savedPlayersPakistan = await Player.insertMany(playersPakistan);
        console.log('Players for Team Pakistan seeded');

        // Create a match
        const match = new Match({
            team1Id: teamIndia._id,
            team2Id: teamPakistan._id,
            matchDate: new Date(),
            venue: 'Mumbai', 
        });

        const savedMatch = await match.save();
        console.log('Match seeded');

        // Create first innings for the match
        const innings = new Innings({
            matchId: savedMatch._id,
            battingTeam: teamIndia._id,
            bowlingTeam: teamPakistan._id,
            runs: 0,
            wickets: 0,
            overs: 0,
        });

        await innings.save();
        console.log('First innings seeded');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

export default seedData;
