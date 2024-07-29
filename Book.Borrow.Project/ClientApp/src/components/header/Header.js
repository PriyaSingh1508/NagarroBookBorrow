import React,{useContext} from 'react';
import {AppBar, Box, Toolbar, Typography, Button, Tab, Tabs,styled} from '@mui/material';
import {useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

import { authActions } from '../../redux-store/storage.js';
import UserContext from '../context/UserContext.js';

const StyledButton = styled(Button)({
    '&:hover': {
      backgroundColor: 'blue',
      color:'white' 
    },
  });
  const StyledTab = styled(Tab)({
    '&:hover': {
      backgroundColor: 'blue',
      color:'white' 
    },
  });
const Header = () => {
 

  const isLoggedIn= useSelector(state=>state.isLoggedIn);
  const loggedUser= localStorage.getItem('userId');
  const [value,setValue] =useState();
  const {tokens}=useContext(UserContext);
  //const [userTokens,setUserTokens] =useState(false);
  const dispatch = useDispatch();

  
  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await axios
  //       .get(`http://localhost:5212/FetchUserById/${loggedUser}`)
  //       .catch((err) => console.log(err));
  //     const data = await res.data;
  //     if(data){
  //       setUserTokens(data);
  //     }
  //     return data;
  //   };  
  //   getUser();
  // }, [loggedUser]);

  console.log("Current ",tokens);
  return (
    <AppBar  position="sticky" sx={{backgroundColor:"#B660CD",boxShadow:"10px 10px 20px #B660CD",  fontFamily: 'Nova Square'}}>
     
         <Toolbar>
            <Typography variant="h6" component="div">
               LIBRARY MANAGEMENT SYSTEM
            </Typography>
           

             {
                        isLoggedIn && tokens && <Typography variant="body2" component="div" margin="auto">
               Tokens Left: {tokens.tokens} <MonetizationOnRoundedIcon/>
          </Typography>
            } 
            { isLoggedIn && 
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
                <StyledTab LinkComponent={Link} to='/books' label="Books Ready to Borrow" ></StyledTab>
                <StyledTab LinkComponent={Link} to='/user/add' label="Lent A Book"  ></StyledTab>
                <StyledTab LinkComponent={Link} to='/user/borrowings' label="My Borrowed Books"></StyledTab>
                <StyledTab LinkComponent={Link} to="/user/lentBooks" label="User Lent Books"></StyledTab>
              </Tabs>
            </Box>
            }
            
            {
                        isLoggedIn && tokens.name
                        && <Typography variant="body2" component="div" marginLeft="auto">
              Heyy! {tokens.name }
          </Typography>
            } 

            <Box display="flex" marginLeft="auto">
              {!isLoggedIn && 
               <StyledButton LinkComponent={Link} to='/auth' variant="outlined" sx={{borderRadius:10, backgroundColor:'white', margin:1}}>SignIn</StyledButton>
              }
                        
               {isLoggedIn &&
               <StyledButton onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to='/auth' variant="outlined" sx={{borderRadius:10, backgroundColor:'white', margin:1}}>Logout</StyledButton>
                } 
            </Box>
         
        </Toolbar>
    </AppBar>
  )
}

export default Header;