import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {
   

  return (
  
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="*" element={<Navigate to="/" />} />
   </Routes>  
   
  )
}

export default App
