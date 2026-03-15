import {useState,useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {useNavigate,Link} from 'react-router-dom'

const Login =()=>{
   const {login} = useContext(AuthContext);
   const navigate = useNavigate();

   const [email,Setemail] = useState("");
   const [password,Setpassword] = useState("")

   const handelSubmit = async(e)=>{
     e.preventDefault();
        try{
                  await login(email,password)
                  navigate('/dashboard')
        }
        catch(error)
        {
            alert("Invalid Credentials")
        }
   }
   return (
    <div className="auth-container">
        <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handelSubmit}>
           <input type="email" placeholder="Email" value={email} onChange={(e)=>Setemail(e.target.value)} required/>
           <input type="password" placeholder="Password" value={password} onChange={(e)=>Setpassword(e.target.value) }required/>
           <button type="submit">Login</button>
        </form>
        <p>
            No Account?<Link to="/register">Register</Link>
        </p>
        <p><Link to="forgot-password">Forgot Password</Link></p>
        </div>
    </div>
   )
}

export default Login;