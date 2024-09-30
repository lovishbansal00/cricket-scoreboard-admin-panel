import mongoose, { Schema } from 'mongoose';

const MatchResultSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    winningTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    losingTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    resultType: { type: String, enum: ['Win', 'Draw', 'Tie', 'No Result'], required: true },
});

const MatchResult = mongoose.model('MatchResult', MatchResultSchema);
export default MatchResult;
