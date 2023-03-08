const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const location = new Schema({
room:{
    type:String,        
    unique : true,
    required:true
},
type:{
    type:String,
    required:true
},
capacity:{
    type:Number,
    required:true
}
});
module.exports = mongoose.model('location',location);