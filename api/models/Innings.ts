import mongoose, { Schema } from 'mongoose';

const InningSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    battingTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    bowlingTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
});

const Innings = mongoose.model('Inning', InningSchema);
export default Innings;
