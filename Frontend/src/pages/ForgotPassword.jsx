import React,{useState,useContext} from 'react';
import {AuthContext} from "../context/AuthContext"

const ForgotPassword = () => {
  const[email,Setemail] = useState("");
  const[message,Setmessage] = useState("");
 
  const {forgotPassword}=useContext(AuthContext)
  
  const handelSubmit = async(e)=>{
      e.preventDefault();

      try{
            const res = await forgotPassword(email)
              Setmessage(res.message);

    if (res.resetUrl) {
      window.location.href = res.resetUrl;
    }
      }
      catch(error)
      {
        Setmessage(error.message)
      }
  }

  return (
    <div className="auth-container">
    <div  className="auth-card">
      <h2>Forgot Passowrd</h2>
      <form onSubmit={handelSubmit}>
      <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>Setemail(e.target.value)}/>
      <button type="submit">Send Resent Link</button>      
      </form>
      <p>{message}</p>
    </div>
    </div>
  )
}

export default ForgotPassword;