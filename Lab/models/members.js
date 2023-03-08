const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const members = new Schema({
   
id:
    {
        type:String,
        unique : true,
        required:true
    }
,
email:
    {
        type:String,
        unique : true,
        required:true
    }
,
password:
    {
        type : String ,
        required : true,
        minlength:5
    }
,
displayName:
    {
        type:String
    }
,
salary:
    {
        type : Number,
    }
,
officeLocation:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    }
,
role : 
    {
        type : String
    }
,
status : 
    {
        type : String
    }
,
faculty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'faculty'
}
,
department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
}
,
teachingSlots:{ 
    type:mongoose.Schema.Types.ObjectId,
    ref: 'teachingSlot'
},
firstLogin:{
    type:Number
},
DayOff : {
    type: String,
    enum:["Saturday" , "Sunday","Monday", " Tuesday","Wednesday","Thursday"]
},
missingDays:{
    type:Number,
    default:0
},
missingHours:{
    type:Number,
    default:0
}

});
module.exports.membersSchema = members;
module.exports.membersModel = mongoose.model('members',members);