import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    multiplier:{
        type: Number,
        required:true
    },
    level:{
        type: Number,
         required:true
        },
    score:{
        type: Number,
        required:true
    }
});
 const Scores = mongoose.model('Scores', resultSchema);
 export default Scores;
