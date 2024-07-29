import Header from "./components/header/Header.js";
import { Route, Routes, } from "react-router-dom";
import React, {useContext} from "react";
import { useSelector } from "react-redux";
import Auth from "./components/auth/Auth.js";
import LentBook from "./components/books/LentBook.js";
import MyBorrowings from "./components/books/MyBorrowings.js";
import AllBooks from "./components/books/AllBooks.js";
import HomeBooks from "./components/books/HomeBooks.js";
import UserLentBooks from "./components/books/UserLentBooks.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from "./components/context/UserContextProvider.jsx";


function App() {
  
 
  const isAuthenticated= useSelector(state=>state.isLoggedIn);
  return (
   
    <UserContextProvider>
    <React.Fragment>
 
    <header>
      <Header />
    </header>
    <main>
   
      <Routes>
       
          
          <Route path="/auth" element={<Auth />} />
         {!isAuthenticated && <><Route path="" element={<HomeBooks/>}/></>} 
          {isAuthenticated && <>
            <Route path="/books" element={<AllBooks />} />
            <Route path="/user/lentBooks" element={<UserLentBooks/>}/>

            
          <Route path="/user/add" element={<LentBook />} />
        
          <Route path="/user/borrowings" element={<MyBorrowings />} />
          </>}
          
             
         
       
      </Routes>
    
    </main>
    <ToastContainer />
   </React.Fragment>
   </UserContextProvider>
  
  );
}
 
export default App;