import mongoose, { Schema } from 'mongoose';

const OverSchema = new Schema({
    inningId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inning',
        required: true
    },
    bowlerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        required: true },
    overNumber: { 
        type: Number, 
        required: true },
    balls: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ball' 
    }]
});

const Over = mongoose.model('Over', OverSchema);
export default Over;