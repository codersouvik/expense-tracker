import { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, Setuser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            Setuser(JSON.parse(storedUser));
        }
          setLoading(false);
    }, []);

    const forgotPassword =  async(email)=>{
       
        const {res} = await API.post("/auth/forgot-password",{email})
       return res.data;
    }

     const resetPassword =  async(token,password)=>{
       
        const {res} = await API.post(`/auth/reset-password/${token}`,{password})
       return res.data;
    }

    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", { email, password });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Setuser(data.user);
    };

    const register = async (name, email, password) => {
        const {data} = await API.post("/auth/register", { name, email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Setuser(data.user);
    }

    const logout = ()=>{
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         Setuser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout,loading,forgotPassword,resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

