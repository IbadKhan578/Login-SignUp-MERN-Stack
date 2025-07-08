const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email}); // check if user already exist by email in db

        if(user){  // if existed return this
            return res.status(409)
            .json({
                message:"User already exist, you can login", success : false              
            })

        }

        const newUser  = new userModel({name,email,password})     
        newUser.password = await bcrypt.hash(password,10);
        console.log("saving user ...")
        await newUser.save();

        res.status(201)
        .json({message:"sign up success", success:true})

    } catch (error) {
        res.status(500)
        .json({message:"internal server error", success:false})
        
    }


}



const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email}); // check if user already exist by email in db

        if(!user){  
            return res.status(403)
            .json({
                message:"authentication failed, Email or password is wrong", success : false              
            })

        }
     

        const isEqual = await bcrypt.compare(password,user.password); // compare encrypte password
        if(!isEqual){
               return res.status(403)
            .json({
                message:"authentication failed, wrong password", success : false              
            })


        }
           const jwtToken = jwt.sign(
            {emai:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}

        )


        res.status(201)
        .json({message:"login success", 
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    } catch (error) {
        res.status(500)
        .json({message:"internal server error", success:false})
        
    }


}


module.exports={
    signup,
    login
}