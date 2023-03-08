const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courses = require('./course').courseSchema
const teachingSlots = require('./teachingSlot').teachingSlotSchema
const replacmentrequest = new Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },

    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachingSlot',
        required: true
    },
    status: {
        type: String,
        enum:["accepted","rejected","pending"],
        default: "pending"
    },
    dateofreq: [{
            type : Date
    }
    ]
});


module.exports.replacmentrequestSchema = replacmentrequest;
module.exports.replacmentrequestModel = mongoose.model('replacmentrequest',replacmentrequest);