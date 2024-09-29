import mongoose, { Schema } from 'mongoose';

const BallSchema = new Schema({
    overId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Over', 
        required: true 
    },
    batsmanId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', required: true 
    },
    bowlerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', required: true 
    },
    ballNumber: { 
        type: Number, 
        required: true 
    },
    runsScored: { 
        type: Number, 
        default: 0 
    },
    isWicket: { 
        type: Boolean, 
        default: false 
    },
    isExtra: { 
        type: Boolean, 
        default: false 
    },
    extraType: { 
        type: String, 
        enum: ['Wide', 'No Ball', 'Bye', 'Leg Bye'], 
        default: null 
    },
});

const Ball = mongoose.model('Ball', BallSchema);
export default Ball;
