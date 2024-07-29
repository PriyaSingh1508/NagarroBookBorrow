import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BookRating from './BookRating';
import {toast } from 'react-toastify';
import UserContext from '../context/UserContext';
import { Box, Card, CardContent, CardMedia, Typography, CardActions,  Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';




const AllBooks = () => {
  const loggedUserId=localStorage.getItem('userId');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const {setTokens}=useContext(UserContext);
  
  const notify = (str) =>{ 
    toast.success(str, {
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
  const sendBorrowRequest = async (id) => {
    const res = await axios
      .get(`http://localhost:5212/Book/BookBorrow/${loggedUserId}/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
 
  const getUserTokens = async () => {
    const res = await axios
      .get(`http://localhost:5212/FetchUserById/${loggedUserId}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = async () => {
    try {
      if (selectedBook) {
        let tokenInfo= await getUserTokens();
       if(tokenInfo.tokens<=0){
        notify("No more tokens!");
        //alert("");
        return;
      }
        await sendBorrowRequest(selectedBook.bookId).then(()=>{notify("Book Borrowed Successfully")}); 
        let t = await getUserTokens();
        setTokens(t);
        navigate('/render');
        setTimeout(()=>navigate(`/user/borrowings`),100);
    
      }
    } catch (error) {
      notify("Book Borrowing Failed!");
      console.error(error);
    } finally {
      setSelectedBook(null);
      setOpenModal(false);
    };
  }

  const handleCloseButtonClick = () => {
    setOpenModal(false);
  };
  
  return (
   

    <Box margin="auto" width="90%" marginTop={3} textAlign="center" id="box">
      
      <Grid container spacing={3}>
        {books.map((book) =>
          book.lentUserId && loggedUserId !== book.lentUserId.id  ? (
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
                    book && book.isBookAvailable?  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal(book)}
                    
                    aria-label="details"
                  >
                    Borrow
                  </Button>:
                  <Button
                  variant="contained"
                  color="success"
                  disabled={true}
                  aria-label="details"
                >
                  Borrow
                </Button>

                  }
                        
                  
                  
                </CardActions>
              </Card>
            
            </Grid>
          ) : null
        )}
      </Grid>
    


      <Dialog open={openModal} onClose={handleCloseModal} height="140" maxWidth="sm" fullWidth>
        <DialogTitle>Book Information</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <Box>
              <Card sx={{ display: 'flex', flexDirection: 'column' , textAlign:'center'}}>
                <CardMedia component="img" height="140" image={selectedBook.image} alt={selectedBook.bookName} />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {selectedBook.bookName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {selectedBook.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                    <BookRating rating={selectedBook.rating} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {selectedBook.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {selectedBook.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal(selectedBook.bookId)} color="primary" textAlign="center">
            Sure to Borrow
          </Button>
          <Button onClick={handleCloseButtonClick} color="primary" textAlign="center">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
  );
};

export default AllBooks;
