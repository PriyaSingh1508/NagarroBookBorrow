import React from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import axios from "axios";
import {useDispatch} from 'react-redux';
import { authActions } from '../../redux-store/storage';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Authentication = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [errors, setErrors] = useState({})
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
    });
    const notify = (str) =>{ 
      toast.success(str, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });   
    }

    const handleChange = (e) => {
     
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const sendRequest = async (type="Login") => {
      const res = await axios
      .post(`http://localhost:5212/Account/${type}`, {
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        })
        .catch((err) => {console.log("inside ",err); notify("Please try again with valid crendentials")});
  
      const data = await res.data;
      console.log("Hii Deepu ",data.id);
      return data;
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (validateForm()) {
        try {
          if(isSignup){
            await sendRequest("Register")
            .then((data) => {localStorage.setItem("userId", data.id); console.log(data);
            notify("Register Successful");
            navigate('/auth');
            setIsSignup(false);
           }).catch((error)=>{
             console.log(error);
           })
          
         }
         else{
          await sendRequest()
          .then((data) => localStorage.setItem("userId", data.id))
           .then(() => dispatch(authActions.login()))
           .then(() => {navigate('/books'); notify("SignIn Successfully");})        
           .catch((error)=>{console.log(error)});
         }
         
        } 
        catch (error) {
          console.log(error);
         
          throw error;
        }
      }
       else {
        console.log("Form has validation errors. Please correct them.");
        
      }     
     
    };
  
    const validateForm = () => {
      const newErrors = {};
    
      if (isSignup) {
        
        if (inputs.username.trim() === "") {
          newErrors.username = "Username is required";
        }
      }
    
      if (inputs.email.trim() === "") {
        newErrors.email = "Email is required";
      }
    
      if (inputs.password.trim() === "") {
        newErrors.password = "Password is required";
      }
    
      setErrors(newErrors);
    
      if (isSignup) {
        return Object.keys(newErrors).length === 0;
      }
   
      return !newErrors.email && !newErrors.password;
    };
    
  
    return (
      <div >
          <form onSubmit={handleSubmit}>
          <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          <Box 
            maxWidth={400}  display="flex" flexDirection={"column"} alignItems="center" justifyContent={"center"} boxShadow="10px 10px 20px #B660CD"
            padding={5}
            margin="auto"
            marginTop={4}
            borderRadius={5}>
              <Typography variant="h4" padding={2} textAlign="center">{isSignup ? "SignUp": "SignIn"}</Typography>
                  { isSignup &&  <TextField name="username" value={inputs.username} type={"text"}  placeholder="username" margin="normal" error={!!errors.username}  helperText={errors.username}
                     onChange={handleChange}/> }  
                    
                <TextField name="email" value={inputs.email} type={"email"} placeholder="email" margin="normal" 
                 error={!!errors.email}  helperText={errors.email} onChange={handleChange}/>

                <TextField name="password" value={inputs.password} type={"password"} placeholder="password" margin="normal" error={!!errors.password}  helperText={errors.password} onChange={handleChange}/>

                <Button  variant="contained"
                  sx={{ borderRadius: 3, marginTop: 3 }}
                  color="primary" type="submit">Submit</Button>
                <Button onClick={()=>setIsSignup(!isSignup)}  sx={{ borderRadius: 3, marginTop: 3 }}>
                  {isSignup ? "Ohh! Have an account?" : "New here? "}
                </Button>
          </Box>
          </ThemeProvider>
        </form>
        
      </div>
    )
}

export default Authentication