import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/routes/profile', { withCredentials: true });
        if(res.status ===201){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  return isLoggedIn;
};

export default useAuth;
