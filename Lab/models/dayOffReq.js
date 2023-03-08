const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayOffReq = new Schema({
desiredDay:
    {
        type: String,
        enum:["Saturday" , "Sunday","Monday", " Tuesday","Wednesday","Thursday"]
    }
,
status:
    {
        type:String,
        enum:["accepted","rejected","pending"],
        default:"pending"
    }
,
Reason:
    {
        type:String
    }
,
sender:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }
],
receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members',
    required: true
},
dateofreq: [{
    type : Date
}
]

});
module.exports.dayOffReqModel = mongoose.model('dayOffRequests',dayOffReq);
module.exports.dayOffReqSchema = dayOffReq;