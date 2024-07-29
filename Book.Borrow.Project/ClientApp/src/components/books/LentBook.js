import React, { useState } from 'react';
import { Box, Button,  TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {toast } from 'react-toastify';




const LentBook = () => {

  const notify = (str) =>{ 
    toast.success(str, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
  }
    const navigate = useNavigate();
    const lentUserId= localStorage.getItem('userId');
    const [inputs, setInputs] = useState({
      bookName: "",
      rating: "",
      author: "",
      genre : "",
      description: "",
      image: ""
    });
    const [errors, setErrors] = useState({})
    
    const handleChange = (e) => {
      setErrors({});
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const validateForm = () => {
      const newErrors = {};
      if (inputs.bookName.trim() === "") {
        newErrors.bookName = "Book Name is required";
      }

      const rating = parseFloat(inputs.rating.trim());
    if (isNaN(rating) || (rating < 0) || (rating > 5)) {
    newErrors.rating = "Rating must be a number between 0-5";
    }


      if (inputs.author.trim() === "") {
        newErrors.author = "Author is required";
      }

      if (inputs.genre.trim() === "") {
        newErrors.genre = "Genre is required";
      }
      if (inputs.image.trim() === "") {
        newErrors.image= "Image url is required";
      }
      if (inputs.description.trim() === "") {
        newErrors.description = "Description is required";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    const sendRequest = async () => {
      try {
        console.log("LentUserId ",lentUserId);
        const response = await axios.post(`http://localhost:5212/Book/AddBook/${lentUserId}`, {
            bookName: inputs.bookName,
            rating: inputs.rating,
            author:inputs.author,
            genre:inputs.genre,
            description: inputs.description,
            image: inputs.image,
           
          
        });
        const data = response.data;
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        try {
          const data = await sendRequest().then(()=>{notify("Book Lent Successfully")}); ;
          console.log(data);
          navigate("/books");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Form has validation errors! Please correct them.");
      }
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            border={1}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}   boxShadow="5px 5px 10px #B660CD" padding={5}   margin={"auto"}  marginTop={1}  display="flex"  flexDirection={"column"}  width={"36%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={1}
              color="#B660CD"
              variant="h5"
              textAlign={"center"}
            >
              Lent A Book
            </Typography>
           
            <TextField
              name="bookName"
              type="text"
              placeholder="Book Name"
              value={inputs.bookName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.bookName}
              helperText={errors.bookName}
            />
          
            <TextField
              name="rating"
              type="number"
              placeholder="Rating"
              value={inputs.rating}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.rating}
              helperText={errors.rating}
            />
            
            <TextField
              name="author"
              type="text"
              placeholder="Author"
              value={inputs.author}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.author}
              helperText={errors.author}
            />
              
            <TextField
              name="genre"
              type="text"
              placeholder="Genre"
              value={inputs.genre}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.genre}
              helperText={errors.genre}
            />
           
            <TextField
              name="description"
              type="text"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description}
            />
           
            <TextField
              name="image"
              placeholder="Image url"
              value={inputs.image}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 2, width:"10px"}}
              variant="outlined"
              color="primary"
              type="submit"
              size="small"
            >
              Submit
            </Button>
          </Box>
        </form>
      </div>
    );
}

export default LentBook;