import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import ballRoutes from './routes/ballRoutes';
import playerRoutes from './routes/playerRoutes';
import seedData from './utils/seedDatabase';
import utilRouter from './utils/extractSeededData';
import matchRouter from './routes/matchRoutes';


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
app.use('/api/match-details', utilRouter);
app.use('/api/ball', ballRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/match', matchRouter);



// Start server 
const startServer = async () =>{
  await seedData(); // Seed the database on startup

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
}

startServer().catch((err) => console.error(err));