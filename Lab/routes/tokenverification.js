const jwt= require('jsonwebtoken');
const members= require('../models/members').membersModel

module.exports.tokenVerification= async (req, res, next)=>{
    const token= req.headers.token
    if(!token)  
    {
        return res.status(401).send('Access deined')
    }
    try{
        const verified= await jwt.verify(token, "aa")
        req.user= verified
        next()
    }
    catch(err){
        res.status(400).send('Invalid Request')
    }
}

module.exports.hrVerification = async (req, res, next)=>{
    const token= req.headers.token
    if(!token)  
        res.status(401).send('Access deined')
    try{
        const verified= await jwt.verify(token,"aa")
        const user = await members.findOne({id:verified.id})
        if(user.role!="hr")
            res.status(400).send('Only an HR staff member can access this functionality')
        req.user= verified
        next()
    }
    catch(err){
        res.status(400).send('Invalid Request')
    }
}

module.exports.instructorVerification = async (req, res, next)=>{
    const token= req.headers.token
    if(!token)  
        res.status(401).send('Access deined')
    try{
        const verified= await jwt.verify(token,"aa")
        const user = await members.findOne({id:verified.id})
        if(user.role!="instructor")
            res.status(400).send('Only an instructor member can access this functionality')
        req.user= verified
        next()
    }
    catch(err){
        res.status(400).send('Invalid Request')
    }
}