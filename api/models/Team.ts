import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
    teamName: { type: String, required: true },
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;
