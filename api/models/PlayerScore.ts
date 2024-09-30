import mongoose, { Schema } from 'mongoose';

const PlayerScoreSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    runsScored: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    oversBowled: { type: Number, default: 0 },
    maidensBowled: { type: Number, default: 0 },
});

const PlayerScore = mongoose.model('PlayerScore', PlayerScoreSchema);
export default PlayerScore;
