const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotlinkingrequest = new Schema({
Reason:
    {
        type:String
    }
,
status:
    {
        type:String,
        enum:["accepted","rejected","pending"],
        default:"pending"
    },
receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },

sender:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }
],
slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachingSlot',
    required: true
},
dateofreq: [{
        type : Date
}
]
});
module.exports.slotlinkingrequestModel = mongoose.model('slotlinkingrequest',slotlinkingrequest);
module.exports.slotlinkingrequestSchema = slotlinkingrequest;