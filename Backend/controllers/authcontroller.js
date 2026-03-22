const User = require('../models/User');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require("nodemailer");


exports.registerUser = async(req,res)=>{
    try{
          const {name,email,password} = req.body;

          const existingUser = await User.findOne({email});
          if(existingUser){
            res.status(400).json({message:"User already exists"});
          }

          const hashedpassword = await bcrypt.hash(password,10);

        const user = await User.create({
             name,
             email,
             password:hashedpassword
        })

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(201).json(
          {
            token,
            user:{
              _id:user.id,
              name:user.name,
              email:user.email
            }
          }
        )

    }
    catch(error){
        
        res.status(500).json({message:"Server Error"});
    }
}

// Login//

exports.Loginuser = async(req,res)=>{
    try{
          const {email,password} = req.body;
          
          const user = await User.findOne({email});
          if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
          }

          const ismatch = await bcrypt.compare(password,user.password);
          if(!ismatch){
            return res.status(400).json({message: "Invalid Credentials"})
          }

          const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
          )
          res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
          })
    }
    catch(error)
    {
       res.status(500).json({message:"Server Error"})
    }
}

exports.ForgotPassword = async(req,res)=>{
  try{
     console.log("ForgotPassword hit:", req.body.email);
     const user = await User.findOne({email:req.body.email});
     if(!user){
       console.log("User not found");
      return res.status(404).json({message:"User not found"})
     }
     const resetToken =  crypto.randomBytes(20).toString("hex");
     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
     user.resetPasswordToken = hashedToken;
     user.resetPasswordExpire =  Date.now() + 15*60*1000
     await user.save();

     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
     console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

     const transporter  = nodemailer.createTransport({
       host: "smtp.gmail.com",
  port: 587,
  secure: false,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      }
     })
     console.log("Transporter created");

     await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:user.email,
      subjet:"Password Reset Request",
      html:`
      <p>You Requested a Password Reset</p>
      <p>Click the Link below to Reset a Password</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This Link will Expire in 15 mins</p>
      `
     })

        console.log("Mail sent successfully");


   res.json({
      message: "Password reset link has been sent to your email",
    });

  }
   catch (error) {
  console.log("ForgotPassword error:", error);
  res.status(500).json({ message: "Server Error" });
}
}

exports.ResetPassword = async(req,res)=>{
  try{ 
       const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
       const user  = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
       })

       if(!user)
       {
        return res.status(400).json({message: "Invalid or Expired Token   "})
       }

       user.password = await bcrypt.hash(req.body.password,10);
    
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined;
       await user.save();

       res.json({message :" Password Reset Successfully"})
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({message:"Server Error"})
  }
}
exports.updateBudget = async(req,res)=>{

  try{

     const {monthlyBudget} = req.body;
   
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {monthlyBudget},
    {new:true}
  );

  res.json(user);
  }
  catch(error)
  {
    res.status(500).json({message:"Server Error"})
  }
 

}

exports.Getme = async(req,res)=>{
  try{
      const user = await User.findById(req.user._id);
      res.json(user);
  } 
  catch(error)
  {
      res.stauts(500).json({message:"Server Error"})
  }
}