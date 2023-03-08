const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const department = new Schema({
name:
    {
        type:String,
        unique : true,
        required:true
    }
,
headOfDepartment:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memebers'
}
,
faculty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'faculty'
},
courses:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }
]
});
module.exports.departmentSchema = department;
module.exports.departmentModel = mongoose.model('departments',department);