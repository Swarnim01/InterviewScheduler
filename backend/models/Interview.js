const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
            Date : {type : Date , required : true},
            StartTime : { type : Date , required : true},
            EndTime : { type : Date , required : true},
            Participant : { type :String , required : true},
            Reason : {type :String}
});

var Interviews =  mongoose.model('Interview',InterviewSchema);
module.exports = Interviews;