const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const members= require('../models/members').membersModel
const location = require('../models/location')
const log = require('../models/log')


const express= require('express')
const router= express.Router()


router.route('/register').post(async (req, res)=>{     
    try{
        let {email,displayName,salary,faculty,department,officeLocation,role}=(req.body);
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

        const office = await location.findOne({name:officeLocation})    //check office capacity
        if(!office)
            return res.status(400).json({msg:"please enter a valid office location"});
        if(office.capacity==0)
            return res.status(400).json({msg:"office already full"});       //

        var flag=0;
        var generatedID;                                            //generate ID (hr-x or ac-x)
        const membersHR = await members.findMany({jobDescription:"hr"})     
        if(jobDescription.localeCompare("hr")){
            flag=1;
            generatedID="hr-"+(membersHR.length +1)

        }
        else{
            flag=1;
            const membersALL = await members.findMany()
            generatedID="ac-"+(membersALL.length - membersHR.length + 1)
        }
        if(flag==0)
            return res.status(400).json({msg:"enter a valid job description"}); // 

        const password =123456; //default password
        const salt = await bcrypt.genSalt(10);
        const PaswordHashed = await bcrypt.hash(password,salt);

        const newUser = new members({
            id:generatedID,
            email:email,
            password:PaswordHashed,
            displayName:displayName,
            salary: salary,
            faculty: faculty,
            department: department,
            officeLocation: officeLocation,
            role: role,
            status:"logged out",
            firstLogin:1
        });
        const saveUser =  await newUser.save();
        res.json(saveUser);
    }
    
    catch(error){
          res.status(500).json({error:error.message});
    }
})

router.route('/getType').post(async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser = await members.findOne({email:email})
        if(!existingUser)
            return res.status(400).json({msg:"User not found"});
        else
            return res.send(existingUser.role)
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.route('/login').post(async (req, res)=>{
    try{
        const {email,password}=req.body;
        if(!email|| !password){
          return res.status(400).json({msg:"please enter valid email or password"});
        }
        const existingUser = await members.findOne({email:email})
        if(!existingUser){
        return res.status(400).json({msg:"User not found"});
      }
  
      const isMatched = await bcrypt.compare(password,existingUser.password);
      if(!isMatched)
      {
          return res.status(400).json({msg:"Invalid Password"});
      }
      members.findOneAndUpdate({email:email},{$set:{status:"logged in"}}, null, function (err, docs) { 
          if (err){ 
              console.log(err) 
          } 
          else{ 
              console.log(existingUser.id +" logged in"); 
          } 
        }); 
    
  const payload = {
      id:existingUser.id,
      role:existingUser.role,
      department:existingUser.department
  }
  const token = await jwt.sign(payload,"aa");
  res.cookie('token',token)
  res.header('token', token).send(token)

  
  }
  catch(err){
      console.log(err)
      
  }
})

router.route('/resetPassword').put(async (req,res)=>{
    let {o,n}=(req.body)

    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    
    const mem = await members.findOne({id:verified.id})
    if(!mem)
        return res.status(400).send("Member does not exists")

    if(!o || !n)
        return res.status(400).send("Please enter your old password and the new password")
       
    if(n.length<5)
        return res.status(400).send("Password length must be greater than 5")

    const isMatched = await bcrypt.compare(o,mem.password);
    if(!isMatched)
          return res.status(400).json({msg:"Invalid Password"});

    const salt = await bcrypt.genSalt(10);
    const PaswordHashed = await bcrypt.hash(n,salt);

    await members.findOneAndUpdate({id:verified.id},{$set: {password:PaswordHashed}}).then(()=>{
        res.send("Password updated")
    }).catch((err)=>{
        res.send(err)
    })
})

router.route('/signin').post(async (req,res)=>{
    try{
    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    
    const mem = await members.findOne({id:verified.id})
    if(!mem)
        return res.status(400).send("Member does not exist")
    
    const lastRecord = await log.findOne({staffMember:mem._id}, {}, { sort: { 'date' : -1 }})        
    if(!lastRecord){}
        
    else{
        if(lastRecord.type=="sign in")
            return res.status(400).send("You must sign out before signing in again. Contact hr for help.")
    }
    
    const newLog = new log({
        type:"sign in",
        date:new Date(Date.now()),
        staffMember:mem._id
    })

    await newLog.save()
    res.send(verified.id + " signed in")
}
catch(err){
    res.status(400).send("err")
}
        
})

router.route('/signout').post(async (req,res)=>{
    try{
    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    
    const mem = await members.findOne({id:verified.id})
    if(!mem)
        return res.status(400).send("Member does not exist")
  
    const lastRecord = await log.findOne({staffMember:mem._id}, {}, { sort: { 'date' : -1 }})
    if(!lastRecord || lastRecord.type=="sign out")
        return res.status(400).send("You must sign in before signing out. Contact hr for help.")
    
    const newLog = new log({
        type:"sign out",
        date:new Date(Date.now()),
        staffMember:mem._id
    })
    await newLog.save()
    res.send(verified.id + " signed out")
}
catch(err){
    res.status(400).send("err")
}
        
})

router.route('/attendance').get(async (req,res)=>{
    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    
    const mem = await members.findOne({id:verified.id})
    if(!mem)
        return res.status(400).send("Member does not exists")
    
    const c = await log.find({staffMember:mem._id}).select({ "type": 1, "_id": 0,"date":1});
    res.json(c)       
})

router.route('/attendanceMonth').get(async (req,res)=>{      //specific month
    let {m}=(req.body)
    const token= req.headers.token
    const verified= jwt.verify(token,"aa")
    
    const mem = await members.findOne({id:verified.id})
    if(!mem)
        return res.status(400).send("Member does not exists")
    
    const c = await log.find({staffMember:mem._id,date:{}}).select({ "type": 1, "_id": 0,"date":1});
    res.json(c)       
})

module.exports= router