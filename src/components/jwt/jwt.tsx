

import {jwtDecode} from 'jwt-decode';


export const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return false;
      }
      return true;
    }
    return false;
  };

  export  const getUserRole = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  };

  export const isAdmin = () => {
    const role = getUserRole();
    return role === 'Admin';
  };

 export const isUser = () => {
    const role = getUserRole();
    return role === 'User';
  };

  export const signOut = () => {
    localStorage.removeItem('jwtToken');
};