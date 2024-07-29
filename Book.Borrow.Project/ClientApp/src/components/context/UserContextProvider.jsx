import React,{useState, useEffect} from 'react'
import UserContext from './UserContext';
import axios from 'axios';

const UserContextProvider = ({children}) => {
    const [tokens, setTokens]=useState(false);
    const [mode, setMode]=useState('light');
    const loggedUser= localStorage.getItem('userId');

    useEffect(() => {
        const getUser = async () => {
          const res = await axios
            .get(`http://localhost:5212/FetchUserById/${loggedUser}`)
            .catch((err) => console.log(err));
          const data = await res.data;
          if(data){
            setTokens(data);
          }
          return data;
        };  
        getUser();
      }, [loggedUser]);
  return (
    <UserContext.Provider value={{tokens, setTokens,mode, setMode}}>
     {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;