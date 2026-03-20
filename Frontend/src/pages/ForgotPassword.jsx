import React,{useState,useContext} from 'react';
import {AuthContext} from "../context/AuthContext"

const ForgotPassword = () => {
  const[email,Setemail] = useState("");
  const[message,Setmessage] = useState("");
 
  const {forgotPassowrd}=useContext(AuthContext)
  
  const handelSubmit = async(e)=>{
      e.preventDefault();

      try{
            const res = await forgotPassword(email)
            Setmessage(res.message)
      }
      catch(error)
      {
        Setmessage(err.message)
      }
  }

  return (
    <div>
      <h2>Forgot Passowrd</h2>
      <form onSubmit={handelSubmit}>
      <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>Setemail(e.target.value)}/>
      <button type="submit">Send Resent Link</button>      
      </form>
      <p>{message}</p>
    </div>
  )
}

export default ForgotPassword;