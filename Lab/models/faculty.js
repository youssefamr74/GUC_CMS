const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const faculty = new Schema({
name:
    {
        type:String,
        unique : true,
        required:true
    }
});
module.exports.facultySchema = faculty;
module.exports.facultyModel = mongoose.model('faculty',faculty);