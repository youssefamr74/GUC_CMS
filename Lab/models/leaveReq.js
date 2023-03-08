const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveReq = new Schema({
typeOfReq:
    {
        type: String,
        enum:["Annual Leave" , "Accidental Leaves","Sick Leave", "Maternity Leave","Compensation Leave"]
    }
,
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
module.exports.leaveReqModel = mongoose.model('leaveReq',leaveReq);
module.exports.leaveReqSchema = leaveReq;