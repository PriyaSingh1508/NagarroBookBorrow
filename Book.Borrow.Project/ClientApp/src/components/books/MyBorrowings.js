import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CardActions, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookRating from './BookRating';
import {toast } from 'react-toastify';
import NoBorrowing from './NoBorrowing';

const MyBorrowings = () => {
  const navigate = useNavigate();
  const borrowUserId = localStorage.getItem('userId');
  const [books, setBooks] = useState([]);

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


  const sendBookReturnRequest = async (id) => {
    const res = await axios.get(`http://localhost:5212/Book/Return/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:5212/Book/GetBooks/${borrowUserId}`).catch((error) =>
          console.log(error)
        );

        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendRequest();
  }, [borrowUserId]);

  console.log('Current Books State:', books);

  const handleReturn = async (bookId) => {
    try {
      await sendBookReturnRequest(bookId).then(()=>{notify("Book Returned Successfully")});
      navigate('/books');
    } catch (error) {
      console.error(error).then(()=>{notify("Book Return Failed")});;
    }
  };

  return (
    <Box margin="auto" width="90%" marginTop={3} textAlign="center">
      <Grid container spacing={3}>
        {books.length > 0 ? (
          books.map((book) => {
            console.log('Mapping over book:', book);
            return (
              <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3} marginTop={5}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia component="img" height="140" image={book.image} alt={book.bookName} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.bookName}
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
                    {book && !book.isBookAvailable && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          handleReturn(book.bookId);
                        }}
                        aria-label="details"
                      >
                        Return
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <NoBorrowing/>
        )}
      </Grid>
    </Box>
  );
};

export default MyBorrowings;
