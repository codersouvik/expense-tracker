import { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, Setuser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            Setuser(storedUser);
        }
          setLoading(false);
    }, []);


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
        <AuthContext.Provider value={{user,login,register,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

