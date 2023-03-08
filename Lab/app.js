const AuthenticationRoutes= require('./routes/auth')
const hrRoutes= require('./routes/hr_routes')
const jwt= require('jsonwebtoken')
const verify= require('./routes/tokenverification').tokenVerification
const verifyHR= require('./routes/tokenverification').hrVerification
const members= require('./models/members')
const teachingSlots = require('./models/teachingSlot').teachingSlotModel
const departments = require('./models/department').departmentModel
const courses = require('./models/course').courseModel
const leaveReqs = require('./models/leaveReq').leaveReqModel
const dayOffReqs = require('./models/dayOffReq').dayOffReqModel
const replacmentrequests = require('./models/replacmentrequest').replacmentrequestModel
const slotlinkingrequests = require('./models/slotlinkingrequest').slotlinkingrequestModel
const Notifieds = require('./models/Notified').NotifiedModel
const locations = require('./models/location')
const verifyInstructor= require('./routes/tokenverification').instructorVerification
const instructorRoutes= require('./routes/instructor_routes')

const express= require('express')
const app= express()
app.use(express.json())
app.use('', AuthenticationRoutes)

app.use(verify) //general verification

//hod
app.get('/hod/viewStaff',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role !=="HOD"){
        return res.status(401).json({msg:"not allowed"});
    }
    else{
        try{
         const dep = payload.department
         if(dep == null){
            res.status(401).json({msg:"department not found!"});
         }
         else{
            const member = await members.find({department: payload.department}).select('email displayName role DayOff officeLocation');
            res.send(member)
         }
        }
        catch (error){
            res.status(500).json({error:error.message});
        }
    }
})
app.get('/hod/viewStaffperCourse',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
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
            const HODdep = payload.department
            const coursedep =await departments.findById(HODdep)
            if(coursedep !== null){
                if(coursedep.courses.includes(match[0]._id)){
                    let ta = [];
                    let inst = [];
                for(let i = 0 ; i<match[0].teaching_assistants.length;i++){
                const tas = await match[0].teaching_assistants[i]
                ta.push(await members.findById(tas))
                    }
                for(let i = 0 ; i<match[0].instructors.length;i++){
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
app.get('/hod/viewCoverage',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            let s = [];
         const HODdep = payload.department
         const coursedep =await departments.findById(HODdep).select('courses')
         if(coursedep === null){
            res.status(401).json({msg:"no courses found"});
         }
         else{
             let coverage = 0;
              for(let i = 0 ; i < coursedep.courses.length;i++){
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
    else {
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})

app.get('/hod/viewDayOffReq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role == "HOD"){
        try{
            let x = []
            const dep = payload.department
            const staff = await members.find({department:dep })
           for (let i = 0 ; i < staff.length;i++){
            const Reqs = await dayOffReqs.find({sender:staff[i]._id})

            if(Reqs !== null){
                x.push(Reqs)
            }
            }
            if(x[0] == null) {
                res.status(401).json({msg:"no requests found!"});
            }
            else{
                res.send(x)
            }
            
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.get('/hod/viewleaveReqs',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role == "HOD"){
        try{
            let x = []
            const dep = payload.department
            const staff = await members.find({department:dep})
           for (let i = 0 ; i < staff.length;i++){
            const Reqs = await leaveReqs.find({sender:staff[i]._id})
            if(Reqs !== ""){
                x.push(Reqs)
            }
            }
            if(x[0].length == 0) {
                res.status(401).json({msg:"no requests found!"});
            }
            else{
                res.send(x)
            }
            
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})

app.get('/hod/viewStaffDayOff',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            const dep = payload.department
            const staff = await members.find({department:dep , role:{$ne: "HOD"}}).select('displayName email DayOff')
            if(staff == ""){
                res.status(401).json({msg:"SORRY! there is no staff in your department yet"});  
            }
            else{
                res.send(staff)
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.get('/hod/instsDayOff',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            const dep = payload.department
            const staff = await members.find({department:dep , role:"instructor"}).select('displayName email DayOff')
            if(staff == ""){
                res.status(401).json({msg:"SORRY! there is no instructors in your department yet"});  
            }
            else{
                res.send(staff)
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.get('/hod/tasDayOff',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            const dep = payload.department
            const staff = await members.find({department:dep , role:"teaching assistant"}).select('displayName email DayOff')
            if(staff == ""){
                res.status(401).json({msg:"SORRY! there is no teaching assistants in your department yet"});  
            }
            else{
                res.send(staff)
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.get('/hod/cordinatorsDayOff',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            const dep = payload.department
            const staff = await members.find({department:dep , role:"coordinator"}).select('displayName email DayOff')
            if(staff == ""){
                res.status(401).json({msg:"SORRY! there is no cordinators in your department yet"});  
            }
            else{
                res.send(staff)
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/hod/assignInstructor',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    let{course,instructor} = (req.body)
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role == "HOD"){
        try{
            if(!course|| !instructor){
                res.status(401).json({msg:"please enter the required values"});
            }
            else{
                const c = await courses.find({name:course})
                const dep = await departments.findById(payload.department)
                const inst = await members.find({email:instructor})
                const depcourses = dep.courses
                if(inst == "" ){
                    res.status(401).json({msg:"instructor is not found "}); 
                }
                else if(c == ""){
                    res.status(401).json({msg:"course is not found "}); 
                }
                else if(inst[0].role !== "instructor"){
                    res.status(401).json({msg:"this user is not an instructor "}); 
                }
                else{
                    const instID = inst[0]._id
                    if(depcourses.includes(c[0]._id)){
                        if(c[0].instructors.includes(instID)){
                            res.status(401).json({msg:" this instructor already assigned to this course "}); 
                        }
                        else{
                            courses.findByIdAndUpdate(c[0]._id,{$push:{instructors:instID}},function(err, docs) {  
                                if (err){ 
                                    console.log(err) 
                                } 
                                else{ 
                                    console.log("Original Doc : ",docs); 
                                } 
                             });
                             res.status(401).json({msg:"instructor is added successfuly "}); 
                        } 
                    }
                    else{
                        res.status(401).json({msg:"SORRY! you are not autherized "}); 
                    }
                }
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    } 
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
      } 
})
app.delete('/hod/deleteInstructor',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    let{course,instructor} = (req.body)
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
            if(!course||!instructor){
                res.status(401).json({msg:"please enter the required values"});
            }
            else{
                const c = await courses.find({name:course})
                const dep = await departments.findById(payload.department)
                const inst = await members.find({email:instructor})
                const depcourses = dep.courses
                if(inst == "" ){
                    res.status(401).json({msg:"instructor is not found "}); 
                }
                else if(c == ""){
                    res.status(401).json({msg:"course is not found "}); 
                }
                else if(inst[0].role !== "instructor"){
                    res.status(401).json({msg:"this user is not an instructor "}); 
                }
                else{
                    if(depcourses.includes(c[0]._id)){
                        const instID = inst[0]._id
                        if(!c[0].instructors.includes(instID)){
                            res.status(401).json({msg:" this instructor is not assigned to this course "}); 
                        }
                        else{
                            await teachingSlots.updateMany({course:c[0]._id , staffMember : instID},
                            {$pull:{staffMember:instID}});
                           await courses.findByIdAndUpdate(c[0]._id,{$pull:{instructors:instID}})
                             res.status(401).json({msg:"instructor is deleted successfuly "}); 
                        }
                    }
                    else{
                        res.status(401).json({msg:"SORRY! you are not autherized "}); 
                    } 
                }
            }
        }
       catch(error){
        res.status(500).json({error:error.message});  
       }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "}); 
    }
})
app.post('/hod/UpdateInstructor',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    let{course,Oldinstructor,Newinstructor} = (req.body)
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role==="HOD"){
        try{
            if(!course||!Oldinstructor||!Newinstructor){
                res.status(401).json({msg:"please enter the required values"});
            }
            else{
                const c = await courses.find({name:course})
                const dep = await departments.findById(payload.department)
                const newinst = await members.find({email:Newinstructor})
                const Oldinst = await members.find({email:Oldinstructor})
                const depcourses = dep.courses
                if(newinst == "" ){
                    res.status(401).json({msg:"instructor is not found "}); 
                }
               else if(Oldinst == "" ){
                    res.status(401).json({msg:"instructor is not found "}); 
                }
                else if(c == ""){
                    res.status(401).json({msg:"course is not found "}); 
                }
                else if(newinst[0].role !== "instructor"){
                    res.status(401).json({msg:"this user is not an instructor "}); 
                }
                else if(Oldinst[0].role !== "instructor"){
                    res.status(401).json({msg:"this user is not an instructor "}); 
                }
                else{
                    if(depcourses.includes(c[0]._id)){
                        const OldinstID = Oldinst[0]._id
                        const newinstID = newinst[0]._id
                        if(!c[0].instructors.includes(OldinstID)){
                            res.status(401).json({msg:" this instructor is not assigned to this course "}); 
                        }
                        else if(c[0].instructors.includes(newinstID)){
                            res.status(401).json({msg:" this instructor is already assigned to this course "});
                        }
                        else{
                            await teachingSlots.updateMany( {course:c[0]._id , staffMember : OldinstID},
                            {$push:{staffMember:newinstID}});
                            await teachingSlots.updateMany( {course:c[0]._id , staffMember : OldinstID},
                            {$pull:{staffMember:OldinstID}});
                            await courses.findByIdAndUpdate(c[0]._id,{$pull:{instructors:OldinstID}})
                            await courses.findByIdAndUpdate(c[0]._id,{$push:{instructors:newinstID}})
                             res.status(401).json({msg:"instructor is updated successfuly "});  
                        }
                    }
                }
            }
        }
        catch(error){
            res.status(500).json({error:error.message});  
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "}); 
    }
})
app.get('/hod/viewTeachingAssignments',async(req,res)=>{
    let {course} = req.body
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    if(payload.role === "HOD"){
        try{
         if(!course){
            res.status(401).json({msg:"please enter name of the course!"}); 
         }
         else{
             const c = await courses.find({name:course})
             const dep = await departments.findById(payload.department)
             if (c == ""){
                res.status(401).json({msg:"course not found!"}); 
            }
            else if(dep.courses.includes(c[0]._id)){
                const teachingAss = await teachingSlots.find({course:c[0]._id})
                if(teachingAss == ""){
                    res.status(401).json({msg:"no teaching assignments found for this course!"});
                }
                else{
                    res.send(teachingAss) 
                }
            }
             else{
                res.status(401).json({msg:"SORRY! you are not autherized "}); 
                }
            }
        }
        catch(error){
            res.status(500).json({error:error.message}); 
        }
    }
    else {
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})

// end hod

//academic
app.post('/addCourse',async(req,res)=>{
    try{
  
        let{name,instructor}=(req.body);
        if(!name){
            return res.status(400).json({msg:"please enter name of the course"});
        }
  
        const existingCourse = await courses.findOne({name:name});
        if(existingCourse){
            return res.status(400).json({msg:"this course already exist"});
        }

        const mem = await members.findOne({displayName:instructor});
    
        


        const newCourse = new courses({
            name:name,
            instructors: mem._id,
        
        });
        // newCourse.instructors.push(mem);
        const saveCourse = await newCourse.save();
        res.json(saveCourse);
    }

    catch(error){
        res.status(500).json({error:error.message});
    }

});

app.post('/addTeachingSlot',async(req,res)=>{
    try{
  
        let{lecOrtut,staffMember,course,location,timing}=(req.body);
        const mem = await members.findOne({email:staffMember[0]});
        const cr = await courses.findOne({code:course[0]});
        const loc = await locations.findOne({name:location[0]});
        const newteachingSlot = new teachingSlots({
            LecOrtut:lecOrtut,
            staffMember: mem._id,
            course : cr._id,
           location : loc._id,
            timing : timing
        });
        // newCourse.instructors.push(mem);
        const saveteachingSlot = await newteachingSlot.save();
        res.json(saveteachingSlot);
    }

    catch(error){
        res.status(500).json({error:error.message});
    }

});

const auth = (req,res,next)=>{
    try {
        const token = req.header('token');
        
        if(!token){
            return res.status(401).json({msg:"this user already exist"});
        }
        
        const JWT_PASSWORD = "aa";
        const verified = jwt.verify(token,JWT_PASSWORD);
        
        if(!verified){
            return res.status(401).json({msg:"unautherized"});
        }
        req.user = verified.id;
        next();

    }
    catch (error){
        res.status(500).json({error:error.message});
    }
}

app.use(auth);

app.get('/view',auth,async (req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    const mem = await members.findOne({displayName: payload.name});
    res.send(mem);
})

app.get('/logout',auth,(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    members.findOneAndUpdate({displayName:payload.name},{$set:{status:"logged out"}}, null, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{
            console.log("LOGGED OUT"); 
        } 
    });
    res.send("logged out")
})

app.put('/updateProfile',auth, async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
    let{email,password}=(req.body);
    if(!email && !password)
        return res.status(400).json({msg:"please enter a valid email or password"});
    
    if(!password){
        members.findOneAndUpdate({displayName:payload.name},{$set:{email:email}}, null, function (err, docs) { 
            if (err){
                console.log(err) 
            } 
            else{
                console.log("email updated"); 
            } 
        });
        res.send('email updated');
    }
    
    const salt = await bcryptjs.genSalt();
    const passwordhashed = await bcryptjs.hash(password,salt);


    const mem = await members.findOne({displayName:payload.name});
    if(bcryptjs.compareSync(password,mem.password)){
        return res.status(400).json({msg:"same password! please enter a new one"});
    }

    if(!email){
        members.findOneAndUpdate({displayName:payload.name},{$set:{password:passwordhashed}}, null, function (err, docs) { 
            if (err){
                console.log(err) 
            } 
            else{
                console.log("password updated"); 
            } 
        });  
        res.send('password updated');
    }
    
    else {
        members.findOneAndUpdate({displayName:payload.name},{$set:{email:email,password:passwordhashed}}, null, function (err, docs) { 
            if (err){
                console.log(err) 
            } 
            else{
                console.log("profile updated");
            } 
        });
        res.send('profile updated');
    }

})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/viewschedule', auth, async (req,res)=>{

    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
 
        try{
            const mem = await members.findOne({id:payload.id});
            const teachslot = await teachingSlots.findOne({staffMember:mem});
            res.send(teachslot)
            const c = await teachslot.find({});
            if(c.length == 0){
                return res.status(400).json({msg:" this user does not have an assigned slots"});
            }
            else{
            var i;
            let v = [];
            let index = 0;
            let r =0;

            for(i = 0; i < c.length ; i++){
                if(c[i].staffMember[0].equals(mem._id)){
                   v[index] = c[i];
                   index++;
                }   
                index++;
        }
        res.send(v);
    }
                            
        }   catch(error){
            res.status(500).json({error:error.message});
        }
})
app.post('/sendreplacmentrequest',auth,async(req,res)=>{

    try{
            const JWT_PASSWORD = "aa";
            const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
            
            let{idreceiver,course,location,timing}=(req.body); 
            if(!idreceiver||!course ||!location ||!timing ){
                return res.status(400).json({msg:"please enter staffMember or course or location or timing."});
            } 
            const receiver = await members.findOne({id:idreceiver});
            const sender = await members.findOne({id:payload.id});
            const namecourse = await courses.findOne({name:course});
            const room = await locations.findOne({room:location}) ; 

            if(sender.role == "teaching assistant" && receiver.role != "teaching assistant"){
                return res.status(400).json({msg:"you are not allowed to send to this member"});
            }
            if(sender.role == "instructor" && receiver.role !="instructor"){
                return res.status(400).json({msg:"you are not allowed to send to this member"});
            }

            try{
            const d = new Date(Date.parse(timing));} 
            catch(error){
                res.status(500).json({error:error.message});
            }
            const time = await teachingSlots.findOne({location:room,timing:d});

                if(!receiver){
                return res.status(400).json({msg:"there is no receiver of this name"});
            }
            
            if (!namecourse){
                return res.status(400).json({msg:"please enter the correct course"});
            }
            if (!time){
                return res.status(400).json({msg:"please enter the correct room or time"});
            }
           else{    
            const reqst = new replacmentrequests({
                sender: senders._id,
                receiver: receivers._id,
                course : namecourse._id,
                slot: time._id,
                dateofreq : Date.now()

            });
            await reqst.save();
           
         }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    
    });
app.get('/viewreplacementrequest',auth,async (req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    const mem = await members.findOne({displayName: payload.name});

   try{
        let c = [];
        c = await replacmentrequests.find({});
        if(c.length == 0){
            return res.status(400).json({msg:" this user does not have an assigned slots"});
        }
        else{
        res.send(c);
}
                        
    }   catch(error){
        res.status(500).json({error:error.message});
    }

});
app.post('/sendslotlinkingrequest',auth,async(req,res)=>{
try{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
 
    let{course,location,timing}=(req.body); 
    if(!course ||!location ||!timing ){
        return res.status(400).json({msg:"please enter course or location or timing."});
    }
    const receivers = await courses.find({name:course});
    const coor = receivers[0].coordinator[0];
    const namecourse = await courses.findOne({name:course});
    const time = await teachingSlots.findOne({location:room,timing:d});
    if (!namecourse){
        return res.status(400).json({msg:"please enter the correct course"});
    }
    if (!time){
        return res.status(400).json({msg:"please enter the correct room or time"});
    }
    if(namecourse.teaching_assistants.includes(payload.id)){
        const reqst = new slotlinkingrequests({
            sender: payload.id,
            receiver: coor,
            slot : time._id,
            dateofreq : Date.now()

        });
        const saveCourse = await reqst.save();
        res.json(saveCourse);     
     }
    else{  
     return res.status(400).json({msg:"you are not allowed to send such request"});
    }
}
catch(error){
    res.status(500).json({error:error.message});
}
});
app.post('/addDayOffRequest',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
    try {
        let {desiredDay,Reason} = (req.body);
        if(!desiredDay){
            return res.status(400).json({msg:"please enter type of the desiredDay or the head of the departement"});
        }
        const hod = await departments.find({});
        const rec = await hod[0].headOfDepartment[0];
        if(hod == null){
            return res.status(400).json({msg:"please enter the correct name of HOD"});
        }
        else{
        const dayOff = new dayOffReqs({
            desiredDay:desiredDay,
            Reason:Reason,
            receiver : rec,
            sender : payload.id

        })
        const saveReq = await dayOff.save();
        res.json(saveReq);
    }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
});
app.post('/sendLeaverequest',auth,async(req,res)=>{

    try{
       
        const JWT_PASSWORD = "aa";
        const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
      //  const mem = await members.findOne({displayName: payload.name});
        let{typeOfleaveReq,Reasonforleave}=(req.body); 
        
        if(!typeOfleaveReq ){
            return res.status(400).json({msg:"please enter the type of leave request"});
        }
        if(typeOfleaveReq == "Compensation Leave"){
            if(!Reasonforleave){
            return res.status(400).json({msg:"please enter a reason for the Compensation Leave request"});
        }
    }
        
    const hod = await departments.find({});
    const rec = await hod[0].headOfDepartment[0];
    if(hod == null){
        return res.status(400).json({msg:"please enter the correct name of HOD"});
    }
    else{
    const dayOff = new leaveReqs({
        typeOfReq : typeOfleaveReq,
        Reason : Reasonforleave,
        receiver : rec,
        sender : payload.id

    })
            const saveCourse = await dayOff.save();
            res.json(saveCourse);     
         }
        
        }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
app.get('/Notifyrequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    const mem = await members.findOne({email: payload.name});
    if(mem.status === "logged in"){
        
        const slotlinkingreq = await slotlinkingrequests.find({});
        if(!(slotlinkingreq == null)){
        if(slotlinkingreq[0].status === "accepted"){
            return res.status(400).json({msg:"your replacement request is accepted"});
        }  
        if(slotlinkingreq[0].status === "rejected"){
            return res.status(400).json({msg:"your replacement request is rejected"});
        } 
    }
        const replacementreq = await replacmentrequests.find({});
        if(!(replacementreq == null)){
        if(replacementreq[0].status === "accepted"){
            return res.status(400).json({msg:"your replacement request is accepted"});
        }  
        if(replacementreq[0].status === "rejected"){
            return res.status(400).json({msg:"your replacement request is rejected"});
        } 
    }
        const dayoffreq = await dayOffReqs.find({});
        if(!(dayoffreq == null)){
        if(dayoffreq[0].status === "accepted"){
            return res.status(400).json({msg:"your DayyOff request is accepted"});
        }  
        if(dayoffreq[0].status === "rejected"){
            return res.status(400).json({msg:"your DayOff request is rejected"});
        } 
    }
        const leaveReq = await leaveReqs.find({});
        if(!(leaveReq == null)){
        if(leaveReq[0].status === "accepted"){
            return res.status(400).json({msg:"your leave request is accepted"});
        }  
        if(leaveReq[0].status === "rejected"){
            return res.status(400).json({msg:"your leave request is rejected"});
        } 
      }
    return res.status(400).json({msg:"your requests still pending"});
    }
   // setTimeout(checkreq, 10000);
});
app.get('/viewAllstatusRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    let c = [];

    const LeaveRequest = await leaveReqs.find({sender:payload.id});
    const dayOFFRequest = await dayOffReqs.find({sender:payload.id});
    const slRequest = await slotlinkingrequests.find({sender:payload.id});
    const repRequest = await replacmentrequests.find({sender:payload.id});

    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests",dayOFFRequest);
    c.push("slRequest:",slRequest);
    c.push("repRequest:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no requests!"});  
    }
    else{
        res.send(c);
    }
    
});
app.get('/viewAllstatusAcceptedRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    const LeaveRequest = await leaveReqs.find({sender:payload.id , status : "accepted"});
    const dayOFFRequest = await dayOffReqs.find({sender:payload.id , status : "accepted"});
    const slRequest = await slotlinkingrequests.find({sender:payload.id , status : "accepted"});
    const repRequest = await replacmentrequests.find({sender:payload.id , status : "accepted"});

    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests:",dayOFFRequest);
    c.push("slRequests:",slRequest);
    c.push("repRequests:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no Accepted requests!"});  
    }
    else{
        res.send(c);
    }
});
app.get('/viewAllstatusPendingRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    const LeaveRequest = await leaveReqs.find({sender:payload.id,status : "pending"});
    const dayOFFRequest = await dayOffReqs.find({sender:payload.id,status : "pending"});
    const slRequest = await slotlinkingrequests.find({sender:payload.id,status : "pending"});
    const repRequest = await replacmentrequests.find({sender:payload.id,status : "pending"});

    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests:",dayOFFRequest);
    c.push("slRequests:",slRequest);
    c.push("repRequests:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no Pending requests!"});  
    }
    else{
        res.send(c);
    }
    
});
app.get('/viewAllstatusRejectedLeaveReq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);


    const LeaveRequest = await leaveReqs.find({sender:payload.id, status : "rejected"});
    const dayOFFRequest = await dayOffReqs.find({sender:payload.id, status : "rejected"});
    const slRequest = await slotlinkingrequests.find({sender:payload.id, status : "rejected"});
    const repRequest = await replacmentrequests.find({sender:payload.id, status : "rejected"});


    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests",dayOFFRequest);
    c.push("slRequest:",slRequest);
    c.push("repRequest:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no rejected requests!"});  
    }
    else{
        res.send(c);
    }
    
});
app.post('/cancelleaveRequest',async(req,res)=>{
   
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }

    const LeaveRequest = await leaveReqs.findById(IDforrequest);
    
    if(LeaveRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        if(leaveReqs.status == "pending" || Date.parse(leaveReqs.dateofreq) < Date.parse(Date.now())){
        leaveReqs.findByIdAndDelete(IDforrequest);
    }
});
app.post('/canceldayOffRequest',async(req,res)=>{
    
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }

    const dayOFFRequest = await dayOffReqs.findById(IDforrequest);
    
    if(dayOFFRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        if(dayOffReqs.status == "pending" || Date.parse(dayOffReqs.dateofreq) < Date.parse(Date.now())){
        dayOffReqs.findByIdAndDelete(IDforrequest);
    }
});
app.post('/cancelSlotlinkingRequest',async(req,res)=>{
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }

    const slRequest = await slotlinkingrequests.findById(IDforrequest);
    
    if(slRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        if(slotlinkingrequests.status == "pending" || Date.parse(slotlinkingrequests.dateofreq) < Date.parse(Date.now())){
        slotlinkingrequests.findByIdAndDelete(IDforrequest);
    }
});
app.post('/cancelreplacmentRequest',async(req,res)=>{
    
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }
    const repRequest = await replacmentrequests.findById(IDforrequest);
    if(repRequest == null){
        res.status(401).json({msg:"you have no Pending requests!"});  
    }
        if(replacmentrequests.status == "pending" || Date.parse(replacmentrequests.dateofreq) < Date.parse(Date.now())){
        replacmentrequests.findByIdAndDelete(IDforrequest);
        }
    
});
app.post('/hod/acceptDayOffreq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)

    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{

           
            const request = await dayOffReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }

            else{
                const senderid = await dayOffReqs.findById(id).sender;
                const Updatereq = await dayOffReqs.findByIdAndUpdate(id,{$set:{status:"accepted"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "accepted",
                            idofsender: senderid,
                            idofdayoffrequest : id
                        });
                    await notify.save();
                        res.status(401).json({msg:"Request accepted successfuly "}); 
                    } 
                  }); 
            }
        }

        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/hod/rejectDayOffreq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await dayOffReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await dayOffReqs.findById(id).sender;
                const Updatereq = await dayOffReqs.findByIdAndUpdate(id,{$set:{status:"rejected"}}, null,async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "rejected",
                            idofsender: senderid,
                            idofdayoffrequest : id
                        });
                    await notify.save();
                        res.status(401).json({msg:"Request is rejected "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
}) 
app.post('/hod/acceptLeavereq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await leaveReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await leaveReqs.findById(id).sender;
                const Updatereq = await leaveReqs.findByIdAndUpdate(id,{$set:{status:"accepted"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "accepted",
                            idofsender: senderid,
                            idofleaverequest : id
                        });
                        await notify.save();
                        res.status(401).json({msg:"Request accepted successfuly "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/hod/rejectLeavereq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await leaveReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await leaveReqs.findById(id).sender;
                const Updatereq = await leaveReqs.findByIdAndUpdate(id,{$set:{status:"rejected"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "rejected",
                            idofsender: senderid,
                            idofleaverequest : id
                        });
                        await notify.save();
                        res.status(401).json({msg:"Request is rejected "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/changeslotlinkingRequestStatus/:id', async (req,res) => {
    if(!req.body.status || !["reject","accept"].includes(req.body.status)) {
        return res.status(400).json("you forgot to choose the Request status !!!!")
    }

    const id = req.params.id;
    const senderid = await dayOffReqs.findById(id).sender;
    const requests = await slotlinkingrequests.findByIdAndUpdate(id, $set = {status: req.body.status})
    const notify = new Notifieds({
        notification: "rejected",
        idofsender: senderid,
        idofleaverequest : id
    });
    await notify.save();
        res.status(200).json({message: "You updated the request successfully",result})
    
});

//end academic

//coordinator

app.get('/create', (req,res) => {
    const requestData = {
        member: mongoose.Types.ObjectId(),
        slot: 2,
        course: mongoose.Types.ObjectId()
    }
    const requestObj = new request(requestData)
    requestObj.save().then(() => res.json({slotLinking: requestData}));
    
});





app.get('/removeAll',async (req,res) => {
    const requests = await request.remove();
    res.json("Clear slot linking successfully")
});

// end testing

//Add Course slot
app.post('/AddCourseSlot', (req,res) => {

    if(!(req.body.member)) {
        return res.status(400).json("You didn't choose a member")
    }
    if(!(req.body.slot)) {
        return res.status(400).json("You didn't choose a slot timing")
    }
    if(!(req.body.course)) {
        return res.status(400).json("You didn't choose a course")
    }

    const requestData = {
        member: req.body.member(),
        slot: req.body.slot(),
        course: req.body.course()
    }
    const requestObj = new request(requestData)
    requestObj.save().then(() => res.json({AddedCourseSlot: requestData}));
    
});
 
// TO delete and update the slots.  the course schema model must be updated

//delete course slot(s) in his/her course.
// router.delete('/deleteCourseSlot',async (req,res) => {
//     if((req.body.slot)) {
//     const requests = await request.slot.remove();
//     res.json("Clear slot successfully")
//     }
// });


//â€¢ View â€œslot linkingâ€ request(s) from academic members linked to his/her course.
app.get('/co/readAll',async (req,res) => {
    const payload = await jwt.verify(req.header('token'),"aa")
    const mem = await members.findOne({id:payload.id})
    const requests = await slotlinkingrequests.find({receiver:mem._id});
    // console.log(requests);
    res.json({requests})
});


//Accept/reject â€œslot linkingâ€ requests from academic members linked to his/her course.
//Note that once a â€œslot linkingâ€ request is accepted, it should be automatically added to
//the senderâ€™s schedule.


//Add/update/delete course slot(s) in his/her course.

app.post('/co/addCourseSlot',async (req,res) => {
    if(!req.body.status || !(course.req.slot.Types == timing) ) {
        return res.status(400).json("Course is already added")
    }
    const id = req.params.id;
    //return mongoose.model('course').find({ type: slots.type }, cb);
    const Add = Add.findByIdAndUpdate(id, $set = {timing : req.body.timing}, {new: true}).then(
        result => res.status(200).json({message: "You Added the course successfully",result})
    );
});

app.put('/co/updateCourseSlot',async (req,res) => {
    if(!req.body.status || !(course.req.slot.Types = timing) || !(course.req.slot.Types = location) )
        return res.status(400).json("please enter the required info")
    
    const id = req.params.id;
    //return mongoose.model('course').find({ type: slots.type }, cb);
    const Add = Add.findByIdAndUpdate(id, $set = {timing : req.body.timing , location : req.body.location}, {new: true}).then(
        result => res.status(200).json({message: "You updated the course successfully",result})
    );
});
app.delete('/co/deleteCourseSlot',async (req,res) => {
    if(!req.body.status || !(course.req.slot.Types = timing)) {
        return res.status(400).json("Course is already added")
    }
    const id = req.params.id;
    //return mongoose.model('course').find({ type: slots.type }, cb);
    const Add = Add.findByIdAndDelete(id, {new: true}).then(
        result => res.status(200).json({message: "You Added the course successfully",result})
    );
});     ///// end coordinator


app.post('/aaa',(req,res)=>{
    res.send("aaa");
})

app.get('/viewschedule', auth, async (req,res)=>{

    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
 
        try{
            const mem = await members.findOne({email:payload.id});
            const teachslot = await teachingSlots.find({mem}).select({ "course": 1, "_id": 0,"location":1,"timing":1});
            if(teachslot == null){
                return res.status(400).json({msg:" this user does not have an assigned slots"});
            }
            else {
                res.json(teachslot);
            }
                 
        }   catch(error){
            res.status(500).json({error:error.message});
        }
})//
app.post('/sendreplacmentrequest',auth,async(req,res)=>{

    try{
            const JWT_PASSWORD = "aa";
            const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
            
            let{idreceiver,course,location,date}=(req.body); 
            if(!idreceiver||!course ||!location ||!date ){
                return res.status(400).json({msg:"please enter idreceiver or course or location or timing."});
            } 
            const receiver = await members.findById(idreceiver);
            if(!receiver){
                return res.status(400).json({msg:"there is no receiver of this name"});
            }
            const sender = await members.findOne({id:payload.id});
            
            const namecourse = await courses.findOne({name:course});
           
            if (!namecourse){
                return res.status(400).json({msg:"please enter the correct course"});
            }
            const roomm = await locations.findById(location) ; 
        
            if(sender.role == "teaching assistant" && receiver.role != "teaching assistant"){
                return res.status(400).json({msg:"you are not allowed to send to this member"});
            }
            if(sender.role == "instructor" && receiver.role !="instructor"){
               return res.status(400).json({msg:"you are not allowed to send to this member"});
            }
            
             const recievedDate = new Date(date);
            const time = await teachingSlots.find({location:location});

            
            if (time[0].timing.getTime() != recievedDate.getTime()){
                return res.status(400).json({msg:"please enter the correct time"});
            }
           else{    
            const reqst = new replacmentrequests({
                sender: sender,
                receiver: receiver,
                slot: time[0]._id,
                dateofreq : time[0].timing

            });
            res.send("Request sent successfuly")
            await reqst.save();
           
         }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    
});//
app.get('/viewreplacementrequest',auth,async (req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
   try{
        const mem = await members.findOne({email: payload.name});
        let c = [];
        c = await replacmentrequests.find({});
        if(c.length == 0){
            return res.status(400).json({msg:" you don'y have any replacement requests "});
        }
        else{
        res.send(c);
}
                        
    }   catch(error){
        res.status(500).json({error:error.message});
    }

});//
app.post('/sendslotlinkingrequest',auth,async(req,res)=>{
try{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
 
    let{course,location,timing}=(req.body); 
    if(!course ||!location ||!timing ){
        return res.status(400).json({msg:"please enter course or location or timing."});
    }
    const receivers = await courses.find({name:course});
    const coor = receivers[0].coordinator[0];
    const namecourse = await courses.findOne({name:course});
    const time = await teachingSlots.findOne({location:location , timing:timing});
    if (!namecourse){
        return res.status(400).json({msg:"please enter the correct course"});
    }
    if (!time){
        return res.status(400).json({msg:"please enter the correct room or time"});
    }
    const mem = await members.find({id:payload.id})
    if(namecourse.teaching_assistants.includes(mem[0]._id)){
        const reqst = new slotlinkingrequests({
            sender: mem[0]._id,
            receiver: coor,
            slot : time._id,
            dateofreq : Date.now()

        });
        const saveCourse = await reqst.save();
        res.json(saveCourse);     
     }
    else{  
     return res.status(400).json({msg:"you are not allowed to send such request"});
    }
}
catch(error){
    res.status(500).json({error:error.message});
}
});//
app.post('/sendDayOffRequest',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
    try {
        let {desiredDay,Reason} = (req.body);
        if(!desiredDay){
            return res.status(400).json({msg:"please enter type of the desiredDay or the head of the departement"});
        }
        const hod = await departments.find({});
        const rec = await hod[0].headOfDepartment;
        const mem = await members.find({id:payload.id})
        if(hod == null){
            return res.status(400).json({msg:"please enter the correct name of HOD"});
        }
        else{
        const dayOff = new dayOffReqs({
            desiredDay:desiredDay,
            Reason:Reason,
            receiver : rec,
            sender : mem[0]._id,
            dateofreq : Date.now()

        })
        const saveReq = await dayOff.save();
        res.json(saveReq);
    }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
});//
app.post('/sendLeaverequest',auth,async(req,res)=>{

    try{
       
        const JWT_PASSWORD = "aa";
        const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
        let{typeOfleaveReq,Reasonforleave}=(req.body); 
        
        if(!typeOfleaveReq ){
            return res.status(400).json({msg:"please enter the type of leave request"});
        }
        if(typeOfleaveReq == "Compensation Leave"){
            if(!Reasonforleave){
            return res.status(400).json({msg:"please enter a reason for the Compensation Leave request"});
        }
    }
        
    const hod = await departments.find({});
    const rec = await hod[0].headOfDepartment;
    const mem = await members.findOne({id:payload.id})
    if(hod == null){
        return res.status(400).json({msg:"please enter the correct name of HOD"});
    }
    else{
    const dayOff = new leaveReqs({
        typeOfReq : typeOfleaveReq,
        Reason : Reasonforleave,
        receiver : rec,
        sender : mem._id,
        dateofreq : Date.now()

    })
            const saveCourse = await dayOff.save();
            res.json(saveCourse);     
         }
        
        }
    catch(error){
        res.status(500).json({error:error.message});
    }
});//

app.get('/viewAllstatusRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    let c = [];
    const mem = await members.findOne({id:payload.id})
    const LeaveRequest = await leaveReqs.find({sender:mem._id});
    const dayOFFRequest = await dayOffReqs.find({sender:mem._id});
    const slRequest = await slotlinkingrequests.find({sender:mem._id});
    const repRequest = await replacmentrequests.find({sender:mem._id});

    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests",dayOFFRequest);
    c.push("slotlinkingRequest:",slRequest);
    c.push("replacementRequest:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no requests!"});  
    }
    else{
        res.send(c);
    }
    
});//
app.get('/viewAllstatusAcceptedRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
let c = [];
    const mem = await members.findOne({id:payload.id});
    const LeaveRequest = await leaveReqs.find({sender:mem._id , status : "accepted"});
    const dayOFFRequest = await dayOffReqs.find({sender:mem._id , status : "accepted"});
    const slRequest = await slotlinkingrequests.find({sender:mem._id , status : "accepted"});
    const repRequest = await replacmentrequests.find({sender:mem._id , status : "accepted"});
    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests:",dayOFFRequest);
    c.push("slotLinkingRequests:",slRequest);
    c.push("replacementRequests:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no Accepted requests!"});  
    }
    else{
        res.send(c);
    }
});//
app.get('/viewAllstatusPendingRequests',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);

    const mem = await members.findOne({id:payload.id});
    const LeaveRequest = await leaveReqs.find({sender:mem._id,status : "pending"});
    const dayOFFRequest = await dayOffReqs.find({sender:mem._id,status : "pending"});
    const slRequest = await slotlinkingrequests.find({sender:mem._id,status : "pending"});
    const repRequest = await replacmentrequests.find({sender:mem._id,status : "pending"});
    let c = [];
    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests:",dayOFFRequest);
    c.push("slRequests:",slRequest);
    c.push("repRequests:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no Pending requests!"});  
    }
    else{
        res.send(c);
    }
    
});//
app.get('/viewAllstatusRejectedLeaveReq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD);
    let c = [];
    const mem = await members.findOne({id:payload.id});
    const LeaveRequest = await leaveReqs.find({sender:mem._id, status : "rejected"});
    const dayOFFRequest = await dayOffReqs.find({sender:mem._id, status : "rejected"});
    const slRequest = await slotlinkingrequests.find({sender:mem._id, status : "rejected"});
    const repRequest = await replacmentrequests.find({sender:mem._id, status : "rejected"});


    c.push("leaverequests:",LeaveRequest);
    c.push("dayOFFRequests",dayOFFRequest);
    c.push("slRequest:",slRequest);
    c.push("repRequest:",repRequest);
    
    if(c == null){
        res.status(401).json({msg:"you have no rejected requests!"});  
    }
    else{
        res.send(c);
    }
    
});//

app.post('/cancelleaveRequest',async(req,res)=>{
   try{
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }

    const LeaveRequest = await leaveReqs.findById(IDforrequest);
    res.send(LeaveRequest)
    if(LeaveRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        const d = Date.now();
        if(leaveReqs.status == "pending" || Date.parse(leaveReqs.dateofreq) < d){
        await leaveReqs.findByIdAndDelete(IDforrequest);
        res.send("leave request is deleted successfully")
    }
    else{
        res.send("you can not delete this request")
    }
}
    catch(error){
        res.status(500).json({error:error.message});
    }
});
app.post('/canceldayOffRequest',async(req,res)=>{
    try{
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }

    const dayOFFRequest = await dayOffReqs.findById(IDforrequest);
    
    if(dayOFFRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        const d = Date.now();
        if(dayOffReqs.status == "pending" || Date.parse(dayOffReqs.dateofreq) < d){
        await dayOffReqs.findByIdAndDelete(IDforrequest);
        res.send("DayOFF request is deleted successfully")
    }
    else{
        res.send("you can not delete this request")
    }}
    catch(error){
        res.status(500).json({error:error.message});
    }
});
app.post('/cancelSlotlinkingRequest',async(req,res)=>{
    let {IDforrequest} = (req.body);
try{
    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }
    const slRequest = await slotlinkingrequests.findById(IDforrequest);

    if(slRequest == null){
        res.status(400).json({msg:"you have no Pending requests!"});  
    }
        const d = Date.now();
        if(slotlinkingrequests.status == "pending" || Date.parse(slRequest.dateofreq[0]) < d){
        await slotlinkingrequests.findByIdAndDelete(IDforrequest);
        res.send("slotlinknig request deleted successfully");
    }
    else{
        res.send("you can not delete this request")
    }
}
catch(error){
    res.status(500).json({error:error.message});
}
    
});
app.post('/cancelreplacmentRequest',async(req,res)=>{
    try{
    let {IDforrequest} = (req.body);

    if(!IDforrequest){
        return res.status(400).json({msg:"please enter the ID of the request"});
    }
    const repRequest = await replacmentrequests.findById(IDforrequest);
    if(repRequest == null){
        res.status(401).json({msg:"you have no Pending requests!"});  
    }
        const d = Date.now();
        if(replacmentrequests.status == "pending" || Date.parse(repRequest.dateofreq[0]) > d){
            await replacmentrequests.findByIdAndDelete(IDforrequest);
            res.send("replacement request deleted successfully");
    }
    else{
        res.send("you can not delete this request")
    }}
        catch(error){
            res.status(500).json({error:error.message});
        }
    
});
app.post('/hod/acceptDayOffreq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)

    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{

           
            const request = await dayOffReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }

            else{
                const senderid = await dayOffReqs.findById(id).sender;
                const Updatereq = await dayOffReqs.findByIdAndUpdate(id,{$set:{status:"accepted"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "accepted",
                            idofsender: senderid,
                            idofdayoffrequest : id
                        });
                    await notify.save();
                        res.status(401).json({msg:"Request accepted successfuly "}); 
                    } 
                  }); 
            }
        }

        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/hod/rejectDayOffreq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await dayOffReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await dayOffReqs.findById(id).sender;
                const Updatereq = await dayOffReqs.findByIdAndUpdate(id,{$set:{status:"rejected"}}, null,async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "rejected",
                            idofsender: senderid,
                            idofdayoffrequest : id
                        });
                    await notify.save();
                        res.status(401).json({msg:"Request is rejected "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
}) 
app.post('/hod/acceptLeavereq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await leaveReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await leaveReqs.findById(id).sender;
                const Updatereq = await leaveReqs.findByIdAndUpdate(id,{$set:{status:"accepted"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "accepted",
                            idofsender: senderid,
                            idofleaverequest : id
                        });
                        await notify.save();
                        res.status(401).json({msg:"Request accepted successfuly "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/hod/rejectLeavereq',async(req,res)=>{
    const JWT_PASSWORD = "aa";
    const payload = jwt.verify(req.header('token'),JWT_PASSWORD)
    let {id} = (req.body)
    if(!id){
        res.status(401).json({msg:" missing Request ID "}); 
    }

    if(payload.role == "HOD"){
        try{
            const request = await leaveReqs.findById(id)
            if(request== null){
                res.status(401).json({msg:"Request is not found "}); 
            }
            else{
                const senderid = await leaveReqs.findById(id).sender;
                const Updatereq = await leaveReqs.findByIdAndUpdate(id,{$set:{status:"rejected"}}, null, async function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        const notify = new Notifieds({
                            notification: "rejected",
                            idofsender: senderid,
                            idofleaverequest : id
                        });
                        await notify.save();
                        res.status(401).json({msg:"Request is rejected "}); 
                    } 
                  }); 
            }
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }
    else{
        res.status(401).json({msg:"SORRY! you are not autherized "});  
    }
})
app.post('/changeslotlinkingRequestStatus/:id', async (req,res) => {
    if(!req.body.status || !["rejected","accepted"].includes(req.body.status)) {
        return res.status(400).json("you forgot to choose the Request status !!!!")
    }

    const id = req.params.id;
    const senderid = await dayOffReqs.findById(id).sender;
    const requests = await slotlinkingrequests.findByIdAndUpdate(id, $set = {status: req.body.status})
    const notify = new Notifieds({
        notification: req.body.status,
        idofsender: senderid,
        idofleaverequest : id
    });
    await notify.save();
        res.status(200).json({message: "You updated the request successfully",result})
    
});

app.use(verifyInstructor);
app.use('/instructor',instructorRoutes);

app.use(verifyHR)  //hr verification
app.use('/hr' ,hrRoutes)

module.exports.app = app