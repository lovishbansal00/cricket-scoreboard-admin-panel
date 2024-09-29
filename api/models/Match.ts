import mongoose, { Schema } from 'mongoose';

const MatchSchema = new Schema({
    team1Id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    team2Id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },
    matchDate: { type: Date, required: true },
    venue: { type: String, required: true },
    // oversLimit: { type: Number, required: true },
});

const Match = mongoose.model('Match', MatchSchema);
export default Match;
