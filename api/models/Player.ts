import mongoose, { Schema } from 'mongoose';

const PlayerSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    teamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['Batsman', 'Bowler', 'All-Rounder'], 
        required: true 
    },
});

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
