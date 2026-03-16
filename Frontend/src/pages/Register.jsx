import {useState,useContext} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'

const Register = () => {
  const {register} = useContext(AuthContext);
  const navigate =useNavigate();

  const [name,Setname] = useState("");
  const [email,Setemail] = useState("");
  const [password,Setpassword] = useState("")

  const handelSubmit =async (e)=>{
    e.preventDefault();
    try{
       await register(name,email,password);
       navigate("/dashboard")
    } 
    catch(error){
      alert('Registration failed')
    }
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handelSubmit}>
        <input type='text' placeholder='Name' value={name} onChange ={(e)=>Setname(e.target.value)}required />
        <input type='email' placeholder='Email' value={email} onChange ={(e)=>Setemail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange ={(e)=>Setpassword(e.target.value)} required/>
        <button type="submit"> Register</button>
      </form>
      <p>Already have an account?<Link to='/'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register