import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface InactivityContextType {
  resetInactivityTimer: () => void;

}

const InactivityContext = createContext<InactivityContextType | null>(null);

export const useInactivity = (): InactivityContextType | null => useContext(InactivityContext);

interface AutoLogoutProps {
  children: ReactNode;
}

const AutoLogout: React.FC<AutoLogoutProps> = ({ children }) => {
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  const inactivityLimit = 3000; 
  const logoutUser = () => {
    localStorage.removeItem('user');
    Cookies.remove('authToken')
    navigate('/login');
    toast.success('Your session has ended due to inactivity. Please sign in again to continue.')
  };

  const resetInactivityTimer = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    const newTimeout = setTimeout(logoutUser, inactivityLimit * 1000);
    setTimeoutState(newTimeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });
    
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  return (
    <InactivityContext.Provider value={{ resetInactivityTimer}}>
      {children}
    </InactivityContext.Provider>
  );
};

export default AutoLogout;
