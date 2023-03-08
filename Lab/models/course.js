const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
name:
    {
        type:String,
        unique : true,
        required:true
    }
,
instructors :[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }
]
,
teaching_assistants:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }   
]
,
coordinator:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }
],

department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
}

});
module.exports.courseModel = mongoose.model('courses',course);
module.exports.courseSchema = course;