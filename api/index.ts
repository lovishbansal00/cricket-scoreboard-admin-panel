import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import ballRoutes from './routes/ballRoutes';
// import playerRoutes from './routes/playerRoutes';
// import bowlerRoutes from './routes/bowlerRoutes';
// import matchRoutes from './routes/matchRoutes';
import seedData from './utils/seedDatabase';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cricket_scoringDB';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/ball', ballRoutes);
// app.use('/api/player', playerRoutes);
// app.use('/api/bowler', bowlerRoutes);
// app.use('/api/match', matchRoutes);


// Start server 
const startServer = async () =>{
  await seedData(); // Seed the database on startup

  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });
}

startServer().catch((err) => console.error(err));