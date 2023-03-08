const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ids = new Schema({
    hr:
        {    
            type:Number,
        }
    ,
    ac:
        {   type:Number
        }
    
    });
  
    module.exports = mongoose.model('ids',ids);