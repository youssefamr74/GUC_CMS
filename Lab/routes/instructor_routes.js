const express= require('express');
const Router = express.Router();
const jsonwebtoken = require('jsonwebtoken')

const members = require('../models/members').membersModel
const courses = require('../models/course').courseModel
const departments = require('../models/department').departmentModel
const location = require('../models/location')
const teachingSlots = require('../models/teachingSlot').teachingSlotModel

Router.route('/viewMySlots').get( async (req,res)=>{
    let{course}= (req.body);

    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);
    
    const mem = await members.findOne({id:payload.id});
    let c = [];

    if(course)
    {
        try{
            const currentCourse = await courses.findOne({name:course});
            if(!currentCourse.instructors.includes(mem._id) && !currentCourse.teaching_assistants.includes(mem._id)) {
                return res.status(400).json({msg:"You are not one of the instructors of teaching assistants teaching this course."});
            }
            c = await teachingSlots.find({course:currentCourse._id,staffMember:mem._id});
            if(c.length == 0)
                return res.status(400).json({msg:"there is not any assigned slots to you yet"});
            else
                return res.send(c);
        } catch (err) {
            throw err;
        }
    } else {
        try{
            c = await teachingSlots.find({staffMember:mem._id});
            console.log(c);
            if(c.length == 0)
                return res.status(400).json({msg:"there is not any assigned slots to you yet"});
            else
                return res.send(c);
        } catch (err) {
            throw err;
        }
    }
    
})

Router.route('/assignStaffToSlot').post(async (req,res)=>{
    let {member,course,date,room} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !member || !date || !room){
        return res.status(400).json({msg:"please enter the course, member, time and location you want to assign them"});
    }

    const recievedDate = new Date(date);

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const newMember = await members.find({displayName:member});
    const currentLocation = await location.findOne({room:room});


    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"You are not one of the instructors teaching this course."});
    }

    if(currentCourse.instructors.includes(newMember._id) || currentCourse.coordinator.includes(newMember._id)){
        return res.status(400).json({msg:"You must assign from the teaching assistant members only, not from instructors or coordinators"});
    }

    if(!currentCourse.teaching_assistants.includes(newMember._id)){
        return res.status(400).json({msg:"This member is not one of the teaching assistants of this course!!"});
    }

    try{
        x = await teachingSlots.findOne({course:currentCourse._id, location:currentLocation._id, timing:recievedDate, staffMember:{$ne:[]}})
        if(x){
            console.log("There is a member already assigned in this time and location!!");
            return res.status(400).json({msg:"There is a member already assigned in this time and location!!"});
        }
        c = await teachingSlots.find({course:currentCourse._id, location:currentLocation._id, timing:recievedDate , staffMember:[]});
        if(c.length==0){
            console.log("There isn't any available slot with this time and location!!");
            return res.status(400).json({msg:"There isn't any available slot with this time and location!!"});
        }else{
            await teachingSlots.updateMany({course:currentCourse._id, location:currentLocation._id, timing:recievedDate , staffMember:[]}, {$push:{staffMember:newMember._id}});
            console.log("member assigned successfully");
            res.send("member assigned successfully");
        }
    } catch (err) {
        throw err;
    }
})

Router.route('/updateStaffOfSlot').put( async (req,res)=>{
    let {currentMember,newMember,course,date,room} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !newMember || !currentMember || !date || !room){
        return res.status(400).json({msg:"please enter the course, new member, date and location you want to assign him/her"});
    }

    const recievedDate = new Date(date);

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const nMember = await members.findOne({displayName:newMember});
    const currentLocation = await location.findOne({room:room});
    const currMember = await members.findOne({displayName:currentMember});
    
    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"This user is not one of the instructors teaching this course."});
    }

    if(currentMember === newMember){
        return res.status(400).json({msg:"The new member has the same name of the current member!!!"});
    }

    if(currentCourse.instructors.includes(nMember._id) || currentCourse.coordinator.includes(nMember._id)){
        return res.status(400).json({msg:"You must update only from the teaching assistant members, not from instructors or coordinators"});
    }

    if(!currentCourse.teaching_assistants.includes(nMember._id)){
        return res.status(400).json({msg:"This new member is not one of the teaching assistants of this course!!"});
    }

    if(!currentCourse.teaching_assistants.includes(currMember._id)){
        return res.status(400).json({msg:"This current member is not one of the teaching assistants of this course!!"});
    }

    try{

        x = await teachingSlots.findOne({course:currentCourse._id, location:currentLocation._id, timing:recievedDate})
        if(!x.staffMember[0]){
            console.log("There isn't any assigned slot to this course in this time and location!!");
            return res.status(400).json({msg:"There isn't any assigned slot to this course in this time and location!!"});
        } else if(x.staffMember[0].equals(nMember._id)){
            console.log("The new member already assigned in this time and location!!");
            return res.status(400).json({msg:"The new member already assigned in this time and location!!"});
        }

        let c = [];
        c = await teachingSlots.find({course:currentCourse._id, staffMember:currMember._id, location:currentLocation._id, timing:recievedDate});
        if(c.length == 0){
            console.log("There isn't any assigned slots to this current member in this time!!");
            return res.status(400).json({msg:"There isn't any assigned slots to this current member in this time!!"});
        }
        else{
            await teachingSlots.updateMany({course:currentCourse._id, staffMember:currMember._id, location:currentLocation._id, timing:recievedDate}, {$push:{staffMember:nMember._id}});
            await teachingSlots.updateMany({course:currentCourse._id, staffMember:currMember._id, location:currentLocation._id, timing:recievedDate}, {$pull:{staffMember:currMember._id}});
            console.log("The new member updated successfully in this time and location");
            res.send("The new member updated successfully in this time and location");
        }
    } catch (err) {
        throw err;
    }
})

Router.route('/updateStaffFromCourse').put(async (req,res)=>{
    let {currentMember,newMember,course} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !newMember || !currentMember){
        return res.status(400).json({msg:"please enter the course, current member and new member you want to assign him/her"});
    }

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const nMember = await members.find({displayName:newMember}); 
    const currMember = await members.findOne({displayName:currentMember});
    
    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"This user is not one of the instructors teaching this course."});
    }

    if(currentMember === newMember){
        return res.status(400).json({msg:"the new member has the same name of the current member!!!"});
    }

    if(currentCourse.instructors.includes(nMember._id) || currentCourse.coordinator.includes(nMember._id)){
        return res.status(400).json({msg:"You must update only from the teaching assistant members, not from instructors or coordinators"});
    }

    if(currentCourse.teaching_assistants.includes(nMember._id)){
        return res.status(400).json({msg:"This new member already exists in this course!!"});
    }

    if(!currentCourse.teaching_assistants.includes(currMember._id)){
        return res.status(400).json({msg:"This current member does not exist in this course!!"});
    }

    try{
        await courses.updateMany({_id:currentCourse._id, teaching_assistants:currMember._id}, {$push:{teaching_assistants:nMember._id}});
        await courses.updateMany({_id:currentCourse._id, teaching_assistants:currMember._id}, {$pull:{teaching_assistants:currMember._id}});

        let c = [];
        c = await teachingSlots.find({course:currentCourse._id, staffMember:currMember._id});
        if(c.length == 0){
            console.log("The current member does not have any slots but we updated the new member successfully in the course");
            return res.status(400).json({msg:"The current member does not have any slots but we updated the new member successfully in the course"});
        }
        else{
            await teachingSlots.updateMany({course:currentCourse._id, staffMember: currMember._id}, {$push:{staffMember:nMember._id}}); 
            await teachingSlots.updateMany({course:currentCourse._id, staffMember: currMember._id}, {$pull:{staffMember:currMember._id}});
            console.log("The new member updated successfully in the course and slots");
            return res.status(400).json({msg:"The new member updated successfully in the course and slots"});
        }
    } catch (err) {
        throw err;
    }
})

Router.route('/deleteStaffFromSlot').delete(async (req,res)=>{
    let {member,course,date,room} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !member || !date || !room){
        return res.status(400).json({msg:"Please enter the course, member, date and location you want to delete"});
    }

    const recievedDate = new Date(date);

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const deletedMember = await members.find({displayName:member});
    const currentLocation = await location.findOne({room:room});
    

    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"This user is not one of the instructors teaching this course."});
    }

    if(currentCourse.instructors.includes(deletedMember._id) || currentCourse.coordinator.includes(deletedMember._id)){
        return res.status(400).json({msg:"You must delete only from the teaching assistant members, not from instructors or coordinators"});
    }

    if(!currentCourse.teaching_assistants.includes(deletedMember._id)){
        return res.status(400).json({msg:"This member is not already one of the teaching assistants of this course!!"});
    }

    try{
        let c = [];
        c = await teachingSlots.find({course:currentCourse._id, location:currentLocation._id, timing: recievedDate, staffMember:deletedMember._id});
        if(c.length == 0){
            console.log("There isn't any available slot to this member with this time and location!!");
            return res.status(400).json({msg:"There isn't any available slot to this member with this time and location!!"});
        }else{
            await teachingSlots.updateMany({course:currentCourse._id, location:currentLocation._id, timing: recievedDate, staffMember:deletedMember._id},
                {$pull:{staffMember:deletedMember._id}});
            console.log("member deleted successfully from this time and location");
            return res.send("member deleted successfully from this time and location");
        }
    } catch (err) {
        throw err;
    }

})

Router.route('/RemoveStaffFromCourse').delete( async (req,res)=>{
    let {member,course} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !member){
        return res.status(400).json({msg:"Please enter the course, member, date and location you want to delete"});
    }

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const deletedMember = await members.find({displayName:member});
    
    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"This user is not one of the instructors teaching this course."});
    }

    if(currentCourse.instructors.includes(deletedMember._id) || currentCourse.coordinator.includes(deletedMember._id)){
        return res.status(400).json({msg:"You must delete only from the teaching assistant members, not from instructors or coordinators"});
    }

    if(!currentCourse.teaching_assistants.includes(deletedMember._id)){
        return res.status(400).json({msg:"This member is not one of the teaching assistants of this course!!"});
    }

    try{
        let t = [];
        t = await teachingSlots.find({course:currentCourse._id, staffMember:deletedMember._id});
        if(t.length == 0){
            await courses.findByIdAndUpdate(currentCourse._id,{$pull:{teaching_assistants:deletedMember._id}});
            console.log("This Member does not have any slots but we removed him successfully from this course");
            return res.send("This Member does not have any slots but we removed him successfully from this course");
        }else{
            await teachingSlots.updateMany({course:currentCourse._id, staffMember:deletedMember._id},{$pull:{staffMember:deletedMember._id}});
            await courses.findByIdAndUpdate(currentCourse._id,{$pull:{teaching_assistants:deletedMember._id}});
            console.log("Member removed successfully from this course and his assigned slots");
            return res.send("Member removed successfully from this course and his assigned slots");
        }
    } catch (err) {
        throw err;
    }

})

Router.route('/assignCoordinatorToCourse').put( async (req,res)=>{
    let {member,course} = (req.body);
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);

    if(!course || !member){
        return res.status(400).json({msg:"please enter the course and the member you want to assign them"});
    }

    const user = await members.findOne({id:payload.id});
    const currentCourse = await courses.findOne({name:course});
    const newMember = await members.find({displayName:member});
    
    if(!currentCourse.instructors.includes(user._id)){
        return res.status(400).json({msg:"You are not one of the instructors teaching this course."});
    }

    if(currentCourse.coordinator.includes(newMember._id)){
        return res.status(400).json({msg:"This member is already the coordinator of this course"});
    }

    if(currentCourse.coordinator.length >= 1){
        return res.status(400).json({msg:"You can not assign more than one coordinator!!"});
    }

    await courses.findByIdAndUpdate(currentCourse._id,{$push:{coordinator:newMember._id}});
    console.log("This member assigned successfully to be the coordinator");
    return res.send("This member assigned successfully to be the coordinator");
})

Router.route('/viewCoverage').get( async(req,res)=>{
    
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD);
    const user = await members.findOne({id:payload.id});

    if(payload.role === "instructor"){
        try{
            let s = [];
            const dep = payload.department
            const coursedep =await departments.findById(dep).select('courses')
            if(coursedep === null){
                res.status(401).json({msg:"no courses found"});
            }
            else{
                let coverage = 0;
                for(let i = 0; i < coursedep.courses.length; i++){
                    const coursename = await courses.findById(coursedep.courses[i])
                    const ts = await teachingSlots.find({course:coursedep.courses[i]})
                    if(ts.length === 0){
                        coverage = 0;
                    }
                    else{
                        const unts = await teachingSlots.find({course:coursedep.courses[i] ,staffMember:{$ne:[]}})
                        coverage = (unts.length/ts.length)*100
                    }
                s.push(coursename.name + " : " + coverage + "%")
            }
            res.send(s)
         }
        }
        catch(error) {
            res.status(500).json({error:error.message});
        }
    }
})

Router.route('/viewStaff').get( async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD)

    if(payload.role !== "instructor"){
        return res.status(401).json({msg:"not allowed"});
    }
    else{
        try{
        const member = await members.find({department: payload.department[0]},
            function(err,obj) { console.log(obj); }).select('email displayName role DayOff officeLocation');
            res.send(member)
        }
        catch (error){
            res.status(500).json({error:error.message});
        }
    }
})

Router.route('/viewStaffperCourse').get( async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jsonwebtoken.verify(req.header('token'),JWT_PASSWORD)
    
    if(payload.role === "instructor"){
        let{course}=req.body
    
        if(!course)
            return res.status(401).json({msg:"Please enter the name of the course!"});
        else{
            const match = await courses.find({name:course})
            try{
                if(match == ""){
                    res.status(401).json({msg:"course is not found"});
                }
                else{  
                    const dep = payload.department
                    const coursedep =await departments.findById(dep)
                    if(coursedep !== null){
                        if(coursedep.courses.includes(match[0]._id)){
                            let ta = [];
                            let inst = [];
                        for(let i = 0 ; i<match[0].teaching_assistants.length;i++){
                        const tas = await match[0].teaching_assistants[i]
                        ta.push(await members.findById(tas))
                            }
                        for(let i = 0; i < match[0].instructors.length; i++){
                            const inst2 = await match[0].instructors[i]
                            inst.push(await members.findById(inst2))
                        }
                        res.send({inst , ta})
                        }
                        else {
                            res.status(401).json({msg:"can not find course!"});
                        }
                    }
                    else {
                        res.status(401).json({msg:"you are not autherized to view this course staff"});
                    }
                }  
            }
            catch (error){
                res.status(500).json({error:error.message});
            }  
        }
    }
    else {
        res.status(401).json({msg:"you are not autherized to view this course staff"});
    }
})

module.exports = Router