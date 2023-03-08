const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notified = new Schema({
    notification:{
        type: String,
        enum:["accepted" , "rejected"]
    },
    idofsender:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'members'
        },
    idofleaverequest :{
            type: mongoose.Schema.Types.ObjectId,
            ref :'leaveReq'
          },
    idofslotlinkingrequest :{
            type: mongoose.Schema.Types.ObjectId,
            ref :'slotlinkngrequest'
          },
    idofdayoffrequest :{
            type: mongoose.Schema.Types.ObjectId,
            ref :'dayOffReq'
          },
});

module.exports.NotifiedModel = mongoose.model('Notified',Notified);
module.exports.NotifiedSchema = Notified;
