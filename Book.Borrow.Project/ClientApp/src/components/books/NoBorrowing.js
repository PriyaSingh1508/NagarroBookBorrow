import React from 'react';
import {  Card, CardContent, CardMedia, CardActionArea,Typography,  Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NoBorrowing = () => {
  return (
    <Card sx={{ maxWidth: 500 ,margin:"auto", boxShadow:"10px 10px 20px #B660CD"}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6xr0WUvke6RWGi1SRBQnjhD440VQa-Q6tnA&usqp=CAU"
          alt="No Books Borrowed"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            No Book Borrowed
          </Typography>
          <Button variant="contained" color="success" LinkComponent={Link} to='/books'>
                 Want to Borrow?
          </Button>
         
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NoBorrowing