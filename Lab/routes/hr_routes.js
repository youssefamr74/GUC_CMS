const express= require('express')
const router= express.Router()
const members= require('../models/members').membersModel
const location = require('../models/location')
const facultyModel = require('../models/faculty').facultyModel
const teachingSlot = require('../models/teachingSlot').teachingSlotModel
const department = require('../models/department').departmentModel
const course = require('../models/course').courseModel
const log = require('../models/log')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const ids = require('../models/ids')

router.route('/location').get(async (req, res) => {
    await location.find()
      .then(locations => res.json(locations))
      .catch(err => res.status(400).send(err));
  });

router.route('/location').post(async (req, res)=>{  //add location
    try{
    let {n,t,c}=(req.body);

    if(!n || !t || !c)
        return res.send("Please enter all location data");

    if(c<0 || isNaN(c))
        return res.send("Please enter a valid capacity");

    const check = await location.find({room:n})
    if(check.length>0)
        return res.send("Location already exists");
    const loc = new location({
        room:n,
        type:t,
        capacity:c
    })

    const newLocation = await loc.save();

    res.send("Location added");

    }

    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/location').put(async (req, res)=>{   //update location
    try{
    let {n,t,c}=(req.body);
    if(!n || !t || !c)
        return res.send("Please enter all location data");

    if(c<0 || isNaN(c))
        return res.send("Please enter a valid capacity");
        
    const check = await location.findOne({room:n})
    if(!check)
            return res.send("Location does not exist");

    await location.findOneAndUpdate({room:n},{$set:{capacity:c,type:t}}, null, function (err, docs) { 
        if (err)
            return res.status(400).json({msg:"err"});            
        else
            res.send("Updated location: " + n); 
    });     
    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/location/:name').delete(async (req, res)=>{    //delete location
    try{
        
        const n = req.params.name

        if(!n)
            return res.send("Please enter a location name");

            const loc = await location.findOne({room:n});

            if(!loc)
                return res.status(404).send("Location does not exist")
                
            const mongoID=loc._id
            await location.findOneAndDelete({room:n}).then(async()=>{
                await members.updateMany(
                    { officeLocation:mongoID },
                    { $set: { officeLocation : null } })

                await teachingSlot.updateMany(
                    { location:mongoID },
                    { $set: { location : null } })

                res.send("Deleted location: " + n); 
            }).catch((err)=>{
                return res.status(400).json({msg:err});  
            })
                
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/faculty').get(async (req, res) => {
    await facultyModel.find()
      .then(faculties => res.json(faculties))
      .catch(err => res.status(400).send(err));
  });

router.route('/faculty').post(async (req, res)=>{   //add faculty
    try{
    let {f}=(req.body);

    if(!f)
        return res.send("Please enter faculty name");

    const fac = new facultyModel({
        name:f
    })

    await fac.save().then(()=>{
        res.send("Created Faculty: "+f)
    }).catch(()=>{
        return res.send("faculty already exists")
    })
    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/faculty').put(async (req, res)=>{    //update faculty
    try{
    let {f,updatedF}=(req.body);

    if(!f || !updatedF)
        return res.send("Please enter the current and the new faculty name");
    
        
    if(! await facultyModel.findOne({name:f}))
        return res.status(500).send("Faculty does not exist");
    await facultyModel.findOneAndUpdate({name:f},{$set:{name:updatedF}}).then(()=>{
        res.send("Faculty name changed from "+f+" to "+updatedF)
    }).catch(()=>{
        res.status(500).send("Faculty: ("+updatedF+") already exists");
    })
    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/faculty/:name').delete(async (req, res)=>{     //delete faculty
    try{
    
        const f = req.params.name;

    if(!f)
        return res.send("Please enter faculty name");
    
    const fac = await facultyModel.findOne({name:f});
    if(!fac)
            return res.status(404).send("Faculty does not exist")
    
    await facultyModel.findOneAndDelete({name:f}).then(async ()=>{
    await department.updateMany({faculty:fac._id},{$set: {faculty:null}}).then(()=>{}).catch((err)=>{})
    await members.updateMany({faculty:fac._id},{$set: {faculty:null}}).then(()=>{}).catch((err)=>{})
        res.send("Deleted Faculty: "+f)
    }).catch(()=>{
        return res.status(400).json({msg:"Faculty not found"});            
    }) 

    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/department').get(async (req, res) => {
    await department.find()
      .then(departments => res.json(departments))
      .catch(err => res.status(400).send(err));
  });

router.route('/department').post(async (req, res)=>{   //add department
    try{
    let {n,f,h}=(req.body);

    if(!n || !f || !h)
        return res.status(401).send("Please enter department name, faculty and head id");

    const staff = await members.findOne({id:h})
    if(!staff)
        return res.status(404).send("Staff member does not exist")
    if(staff.role=="hr")
        return res.status(401).send("Only an academic staff member can be assigned as the head of a department")

    const fac = await facultyModel.findOne({name:f})
    if(!fac)     
        return res.status(404).send("Faculty does not exist")
    
    const dep = new department({
        name:n,
        headOfDepartment:staff._id,
        faculty:fac._id,
        courses:[]
    })
    
    await dep.save().then(async ()=>{
        await members.findOneAndUpdate({id:h},{$set:{role:"HOD"}}).then(()=>{}).catch(()=>{})
        res.send("Created Department: "+n)
    }).catch(()=>{
        return res.send("department already exists")
    })
    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/department').put(async (req, res)=>{   //update department  //to assign a course to the department
    try{                                                                    //use update course and update its department
    let {n,f,h}=(req.body);

    if(!n || !f || !h)
        return res.status(401).send("Please enter department name, faculty and head");

    const staff = await members.findOne({id:h})
    if(!staff)
        return res.status(404).send("Staff member does not exist")
    if(staff.role=="hr")
        return res.status(401).send("Only an academic staff member can be assigned as the head of a department")

    const oldDep = await department.findOne({name:n})
    if(!oldDep)
        return res.status(404).send("Department does not exist")

    if(! staff.department==oldDep._id)
        return res.status(401).send("Only an academic staff member from this department can be assigned as its head")

    const fac = await facultyModel.findOne({name:f})
    if(!fac)
        return res.status(404).send("Faculty does not exist")
    
    await department.findOneAndUpdate({name:n},{$set:{faculty:fac._id,headOfDepartment:staff._id}}).then(async ()=>{

        await members.findOneAndUpdate({id:h},{$set:{role:"HOD"}}).then(()=>{}).catch(()=>{})
        res.send("Updated department: " + n); 
    }).catch((err)=>{
        return res.status(400).send(err.message);        
    }) }

    catch(error){
          res.status(500).send(error.message);
  } })


router.route('/department/:name').delete(async (req, res)=>{    //delete department
    try{
        
        const n = req.params.name

        if(!n)
            return res.send("Please enter a department name");
            
        const dep = await department.findOne({name:n});

        if(!dep)
            return res.status(404).send("Department does not exist")

            await department.findOneAndDelete({name:n}).then(async ()=>{
                await course.updateMany({department:dep._id},{$set:{department:null}})
                await members.updateMany({department:dep._id},{$set:{department:null}})
                res.send("Deleted department: " + n); 
            }).catch(()=>{
                return res.status(400).json({msg:"Department not found"});            
            })
             
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/course').get(async (req, res) => {
    await course.find()
      .then(courses => res.json(courses))
      .catch(err => res.status(400).send(err));
  });

router.route('/course').post(async (req, res)=>{   //add course
    try{
    let {c,d}=(req.body);

    if(!c || !d)
        return res.status(401).send("Please enter course code and department");

    const dep = await department.findOne({name:d})
    if(!dep)
        return res.status(404).send("Department does not exist")
    
    const newCourse = new course({
        name:c,
        department:dep.id,
    })

    await newCourse.save().then(async()=>{
        const mongoCourse = await course.findOne({name:c})
        await department.findOneAndUpdate({name:d},{$push:{courses:mongoCourse._id}})
        res.send("Created Course: "+c)
    }).catch((err)=>{
        return res.send("course already exists")
    })

    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

router.route('/course').put(async (req, res)=>{   //update course
    try{
    let {cOld,cNew,d}=(req.body);

    if(!cOld)
        return res.status(401).send("Please enter course code");
    
    if(!cNew && !d)
        return res.status(401).send("Please enter the new course data");

    const courseCode = await course.findOne({name:cOld})
    if(!courseCode)
        return res.status(401).send("Course does not exist");    
    var updateDepartment=1
    if(!d)
        updateDepartment=0
    var updateCode=1
    if (!cNew)
        updateCode=0
    
    if(updateDepartment==1){
        const dep = await department.findOne({name:d})

        if(!dep)
            return res.status(404).send("Department does not exist")

        await course.findOneAndUpdate({name:cOld},{$set:{department:dep._id}}).then(()=> {})
        .catch(()=>{
            return res.status(400).send(err);
        })
    }

    if(updateCode==1){
        await course.findOneAndUpdate({name:cOld},{$set:{name:cNew}}).then(()=>{
            return res.send("Updated course: "+cOld+" (previously)   "+cNew+" (now)")
        }).catch(()=>{
            return res.status(400).send("Another course already has that code");
        })
    }

    return res.send("Updated course: "+cOld)
    }
    catch(error){
        res.status(500).json({error:error.message});
        console.log(error)
  }
})

router.route('/course/:name').delete(async (req, res)=>{    //delete course
    try{  
        const c = req.params.name
        if(!c)
            return res.send("Please enter a course name");
            
        const deleteCourse = await course.findOne({name:c});
        if(!deleteCourse)
            return res.status(404).send("Course does not exist")
        
        await course.findOneAndDelete({name:c}).then(async()=>{
            await department.findByIdAndUpdate(deleteCourse.department,{$pull:{courses:deleteCourse._id}})
            res.send("Deleted course: "+c)
        })
        .catch((err)=>{
            console.log(err.message);
            return res.status(400).send(err);
        })
           
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.route('/member').get(async (req,res)=>{
    await members.find()
      .then(mem => res.json(mem))
      .catch(err => res.status(400).send(err));
});

router.route('/member').post(async (req, res)=>{        //add member
    try{
        let {email,displayName,salary,faculty,Department,officeLocation,role}=(req.body); //Department with a capital D
        if(!email){
            return res.status(400).json({msg:"please enter a valid email"});
        }
        
        const existingUser = await members.findOne({email:email});     
        console.log(existingUser)
        if(existingUser){
            return res.status(400).json({msg:"this user already exist"});
        }                                                               

        if(!displayName){
            displayName = email;
        }

        var flag=0;
        var generatedID;                                            //generate ID (hr-x or ac-x)
        const membersHR = await members.find({role:"hr"})  
        const i = await ids.findById('60006cc69c5ebe7c39cbd68a')   
        if(role=="hr"){
            flag=1;
            generatedID="hr-"+i.hr;
            await ids.findOneAndUpdate({$inc:{hr:1}})
        }
        else{
            flag=1;
            generatedID="ac-"+i.ac;
            await ids.findOneAndUpdate({$inc:{ac:1}})

        }
        if(flag==0)
            return res.status(400).json({msg:"enter a valid job description"}); // 

         const fac = await facultyModel.findOne({name:faculty})    //check faculty
        var facID;
        if(fac)
            facID=fac._id                                     // 

        const dep = await department.findOne({name:Department})    //check department
        var depID;
        if(dep)
            depID=dep._id                                     //

        const office = await location.findOne({room:officeLocation})    //check office capacity
        if(!office)
            return res.status(400).json({msg:"please enter a valid office location"});
        if(office.capacity==0)
            return res.status(400).json({msg:"office already full"});
        if(office.type!="office")
            return res.status(400).json({msg:"this is not an office"});  
        else{
            await location.findOneAndUpdate({room:officeLocation},{$inc:{capacity:-0.5}}, null, function (err, docs) { //why is it doubling the value
                if (err)
                    return res.status(400).json({msg:err});            
                });   
        }                                                                   //
        
        const password ="123456"; //default password
        const salt = await bcrypt.genSalt(10);
        const PaswordHashed = await bcrypt.hash(password,salt);

        const newUser = new members({
            id:generatedID,
            email:email,
            password:PaswordHashed,
            displayName:displayName,
            salary: salary,
            faculty: facID,   
            department: depID,
            officeLocation: office._id,
            role: role,
            status:"logged out",
            firstLogin:1
        });
        await newUser.save().then(()=>{
            res.send("Added member: "+email);
        })
        .catch((err)=>{
            res.send(err.message)
        })
    }
    
    catch(error){
          res.status(500).json({error:error.message});
    }
})

router.route('/member').put(async (req,res)=>{      //update member
    let {id,email,faculty,Department,officeLocation}=(req.body);
    if(!id)
        return res.send("enter id")
    const mem = await members.findOne({id:id})
    if(!mem)
        return res.send("user not found")
   
    if(email)
        await members.findOneAndUpdate({id:id},{$set:{email:email}})
    
    if(faculty){
        const fac = await facultyModel.findOne({name:faculty})
        if(!fac)
            return res.send("faculty not found")
        await members.findOneAndUpdate({id:id},{$set:{faculty:fac._id}})
    }

    if(Department){
        const dep = await department.findOne({name:Department})
        if(!dep)
            return res.send("department not found")
        await members.findOneAndUpdate({id:id},{$set:{department:dep._id}})
    }

    if(officeLocation){
        const office = await location.findOne({room:officeLocation})
        if(!office)
            return res.send("location not found")
        if(office.capacity==0)
            return res.send("office full")

        const oldMem = await members.findOne({id:id})
        await location.findByIdAndUpdate(oldMem.officeLocation,{$inc:{capacity:1}})
        await members.findOneAndUpdate({id:id},{$set:{officeLocation:office._id}})
        await location.findByIdAndUpdate(office._id,{$inc:{capacity:-1}})
        
    }
    res.send("updated member: "+id)

})

router.route('/member/:id').delete(async (req,res)=>{      //delete member
    const memberID = await members.findOne({id:req.params.id})
    if(!memberID)
        return res.status(400).send("Member does not exist")
    await members.findOneAndDelete({id:req.params.id}).then(async()=>{
        await log.deleteMany({staffMember:memberID._id})
        //await teachingSlot.findByIdAndUpdate({})
        await location.findByIdAndUpdate(memberID.officeLocation,{$inc:{capacity:1}})
        res.send("Deleted member: "+memberID.email +"  (id: "+memberID.id+")")})
    .catch(()=>{
        return res.status(400).send(err);
    })
    })

router.route('/log').post(async (req,res)=>{        // manually add a log  (enter date as YYYY-MM-DDTHH:MM:SS+02:00) 
    let {t,d,m} = (req.body)                         //note: it shows the time in UTC in mongoose so expect it to be 2 hours earlier
    if(!t || !d || !m){
        return res.status(400).send("Please enter all record data (sign in/out), date, member id")
    }
    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    if(verified.id==m)
        return res.status(400).send("You can't edit your own attendance log")
    const mem = await members.findOne({id:m})
    if(!mem)
        return res.status(400).send("Member does not exist")
    if(! Date.parse(d))
        return res.status(400).send("Please enter a valid date")
    if(t!="sign in" && t!="sign out")
        return res.status(400).send("Please enter (sign in/sign out)")
    
        var msec = Date.parse(d);

    const newLog = new log({
        type:t,
        date:new Date(msec),
        staffMember:mem._id
    })

    await newLog.save().then(()=>{
        res.send("log added")
    }).catch((err)=>{
        res.status(400).send(err)
    })

})

router.route('/attendance').post(async (req,res)=>{
    let {i}= (req.body)
    if(!i)
        return res.status(400).send("Please enter a member id")

    const mem = await members.findOne({id:i})

    if(!mem)
        return res.status(400).send("Member does not exist")
   
    const c = await log.find({staffMember:mem._id}).select({ "type": 1, "_id": 0,"date":1});
    res.json(c)
        


})

router.route('/missing').get(async (req,res)=>{
    const mems = await members.find()
      .then()
      .catch(err => res.status(400).send(err));
      if(mems){
          const f = mems.filter(el => el.missingDays>0 || el.missingHours>0)
          res.json(f)
      }
});

router.route('/salary').put(async (req, res)=>{     //update salary
    try{
    let {m,s}=(req.body);

    if(!m || !s)
        return res.send("Please enter a staff member's id and their new salary");

    if(isNaN(s))
        return res.send("Please enter a valid salary");

    const mem = await members.findOne({id:m})
    if(!mem)
        return res.status(400).json({msg:"User not found"});     

    await members.findOneAndUpdate({id:m},{$set:{salary:s}}, null, function (err, docs) { 
        if (err)
            console.log(err)            
        else
            res.send("Salary updated"); 
    });     
    }
    catch(error){
        res.status(500).json({error:error.message});
  }
})

module.exports = router
