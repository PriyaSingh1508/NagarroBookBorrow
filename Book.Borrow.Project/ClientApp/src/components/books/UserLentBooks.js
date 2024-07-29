import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookRating from './BookRating';
import { Box, Card, CardContent, CardMedia, Typography, CardActions,  Grid} from '@mui/material';


const UserLentBooks = () => {
    const loggedUserId=localStorage.getItem('userId');
    const [books, setBooks] = useState([]);
  
  
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
            book.lentUserId && loggedUserId === book.lentUserId.id  ? (
              <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3} marginTop={5}>
                <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    {
                
                    }
                          
                    
                    
                  </CardActions>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
  
       
      </Box>
    );
}

export default UserLentBooks