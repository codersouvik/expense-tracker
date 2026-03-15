import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Navbar = ({ darkmode, Setdarkmode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handellogout = () => {
    logout();
    navigate('/');
  }
  return (
    <div className="navbartop">
      <div className="logo">
        <h3>Expense Tracker</h3>

      </div>
      <div className="nav-actions">
        <button className="theme-btn" onClick={() => Setdarkmode(!darkmode)}>{darkmode ? "Light" : "Dark"}</button>
           <span className="username">{user?.name}</span>
          <button className="logout-btn" onClick={handellogout}>Logout</button>
        
      </div>
    </div>
  )
}

export default Navbar;  