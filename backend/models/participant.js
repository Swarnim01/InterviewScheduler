const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone: {
        type: String,
        required: true,
    },
    // password:{
    //     type:String,
    //     required:true
    // },
});

var Participants =  mongoose.model('Participant',ParticipantSchema);
module.exports = Participants;