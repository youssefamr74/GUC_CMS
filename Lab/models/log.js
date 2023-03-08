const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const log = new Schema({
type:
    {
        type:String,    //sign in / sign out
        required:true
    },
date:{
    type:Date,
    required:true
},
staffMember:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
}
});

module.exports = mongoose.model('log',log);