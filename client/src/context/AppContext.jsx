import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
        getUserData(); // ✅ getUserData, not getAuthData
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      data.success 
        ? setUserData(data.userData)  // ✅ userData, not useState
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message); // ✅ error.message, not data.message
    }
  }

  useEffect(() => {
    getAuthData();
  }, [])

  const value = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setUserData,
    getUserData
  }

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  )
}