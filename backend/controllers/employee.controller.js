const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();


const registerNewUser = async(req,res)=>{
    try{
        let userExist = await allEmployeeLogics.getEmployeeByUsername(req.body.username);
        if(userExist){
            return res.status(409).send({message:"user exit"})
        }
        let newUser = await allEmployeeLogics.registerUser(req.body);
        console.log(newUser);
        // let token = await allEmployeeLogics.createToken(newUser.id);
        //  console.log(token)
        return res.status(201).send({message:"User registered successfully"});
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        let user = await allEmployeeLogics.getEmployeeByUsername(req.body.username);
        let token = await allEmployeeLogics.createToken(user.id);
        // console.log(token)
        res.status(200).send({token})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const newUserResign = async(req,res)=>{
    // console.log(req.user.id,req.body)
    try{
        let hasResign = await allEmployeeLogics.findResignData(req.user.id);
        if(hasResign){
            return res.status(409).send({message:'Already exist'})
        }
        // console.log(req.user.id)
        let data = await allEmployeeLogics.addResignOfEmployee({employeeId:req.user.id,lwd:req.body.lwd});
        // console.log(req.user,data)
        return res.status(200).send({
            data:{
                resignation:{
                    "_id":data.id
                }
            }
        })
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

const deleteResign = async(req,res)=>{
    try{
        let hasResign = await allEmployeeLogics.findResignData(req.user.id);
        if(!hasResign){
           return res.status(404).send({message:'not found'})
        }
        res.status(200).send(await allEmployeeLogics.deleteResignData(hasResign.employeeId))

    }
    catch(err){
        res.status(500).send({message:err.message})

    }
}

const getUserResignation = async(req,res)=>{
    try{
        
        console.log(req.user.id)
        let userResign = await allEmployeeLogics.findResignData(req.user.id);
        console.log(userResign)
        if(!userResign){
            return res.status(404).send({message:'Resignation not found'})
        }
        return res.send(userResign)

    }
    catch(err){
        res.status(500).send({message:err.message})
    }

}

const postUserResponse = async(req,res)=>{
    console.log(req.body)
    try{
        // console.log('user',req.user.id)
        let data = await allEmployeeLogics.addUserResponse(req.body,req.user.id);
        return res.status(200).send('')

    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal server error"})
    }
}

const getUserResponse = async(req,res)=>{
    try{
        let data = await allEmployeeLogics.findUserResponse(req.user._id);
        if(!data){
            return res.status(404).send({message:'Response not found,Please add respones'})
        }
        return res.send(data)

    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

module.exports = {registerNewUser,loginUser,newUserResign,deleteResign,getUserResignation,postUserResponse,getUserResponse}