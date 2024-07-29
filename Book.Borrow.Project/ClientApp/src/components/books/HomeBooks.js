import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, CardActions,  Grid, Button } from '@mui/material';
import BookRating from './BookRating';
import {toast } from 'react-toastify';


const HomeBooks = () => {
 
    const [books, setBooks] = useState([]);
    const notify = (str) =>{ 
        toast.info(str, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });   
      }

    useEffect(() => {
      const sendRequest = async () => {
        try {
          const response = await axios.get(`http://localhost:5212/Book/Index`).catch((error) => console.log(error));
          console.log(response);
          if (response.status === 200) {
            setBooks(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      sendRequest();
    }, []);
  
    // books.map((book) => {
    //   console.log(book);
    // });
  
    return (
      <Box margin="auto" width="90%" marginTop={3} textAlign="center">
        <Grid container spacing={3}>
          {books.map((book) =>
           book.isBookAvailable ? (
              <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3} marginTop={5}>
                <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia component="img" height="140" image={book.image} alt={book.bookName} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.bookName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lent By: {book.lentUserId.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      
                      <BookRating rating={book.rating} />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Genre: {book.genre}
                    </Typography>
                   
                    <Typography variant="body2" color="text.secondary">
                      Description: {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ alignSelf: 'center' }}>
                  {
                    book && book.isBookAvailable &&  <Button
                    variant="contained"   color="success" onClick={()=>{notify("Heyy, To Borrow u need to login first!")}}
                    LinkComponent={Link} to='/auth'      aria-label="details">
                    Borrow
                  </Button>
                  }
                        
                  
                  
                </CardActions>
                </Card>
              </Grid>
            ) :null
          )}
        </Grid>
  
        
      </Box>
    );
}

export default HomeBooks