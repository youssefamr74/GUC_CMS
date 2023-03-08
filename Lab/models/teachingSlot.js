const location = require('./location');
const mongoose = require('mongoose');
const course = require('./course').courseModel;

const Schema = mongoose.Schema;
const teachingSlot = new Schema({
lecORtut:
    {
        
        type:String,
        enum:["Lecture","Tutorial","lab"]
    }
,
staffMember:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }
]
,
course:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }
]
,
location:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    }

,
timing:
    {
        type: Date
    }
 
});
module.exports.teachingSlotSchema = teachingSlot;
module.exports.teachingSlotModel = mongoose.model('teachingSlots',teachingSlot);