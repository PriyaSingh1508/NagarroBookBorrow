using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;
using BookBorrowDomain.Data;
using BookBorrowDomain.Domain;
using BookBorrowDomain.Repository;
using Microsoft.Extensions.Options;

namespace Book.Borrow.Project.Controllers
{
    public class BookController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IBookRepository _bookRepository;
        private readonly ApplicationDbContext _context;

        private readonly IWebHostEnvironment _webHostEnvironment;



        public BookController(ApplicationDbContext context, IBookRepository bookRepository, IUserRepository userRepository, IWebHostEnvironment webHostEnvironment)
        {
            _userRepository = userRepository;
            _bookRepository = bookRepository;
            _context = context;

            _webHostEnvironment = webHostEnvironment;
        }
        //public async Task<JsonResult> Index()
        //{
        //    IEnumerable<BookModel> bookList = await _context.Books;
        //    return Json(bookList);

        //}
      
        public async Task<JsonResult> Index()
        {
            try
            {
                // Fetch the list of books
                IEnumerable<BookModel> bookList = await _bookRepository.GetAll();
                return Json(bookList);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error adding book: {ex}");

                // Return a 500 Internal Server Error status code with an error message
                var errorResponse = new Response { Status = "Error", Message = "An error occurred while adding the book." };

                return Json(errorResponse);
            }

        }

        [HttpGet("Book/GetBooks/{userId}")]
        public JsonResult GetBooksBorrowedByUser(string userId)
        {
            try
            {
                var booksBorrowed = _context.BooksBorrowed
                    .Include(bb => bb.BookModel)
                    .Include(bb => bb.User)
                    .Where(bb => bb.User.Id == userId)
                    .Select(bb => new
                    {
                        BookId = bb.BookModel.BookId,
                        BookName = bb.BookModel.BookName,
                        Rating = bb.BookModel.Rating,
                        Author = bb.BookModel.Author,
                        Genre = bb.BookModel.Genre,
                        Description = bb.BookModel.Description,
                        IsBookAvailable = bb.BookModel.IsBookAvailable,
                        Image = bb.BookModel.Image,
                        UserName = bb.User.Name,
                        UserTokens = bb.User.Tokens
                    })
                    .GroupBy(book => book.BookId)
                    .Select(group => group.First()) // Take the first item of each group
                    .ToList();

                return Json(booksBorrowed);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching books: {ex}");

                // Return a 500 Internal Server Error status code with an error message
                var errorResponse = new Response { Status = "Error", Message = "An error occurred while fetching books." };

                return Json(errorResponse);
            }
        }



        //[HttpGet("Book/GetBooks/{userId}")]
        //public JsonResult GetBooksBorrowedByUser(string userId)
        //{
        //    // Assuming _context is your database context
        //    var booksBorrowed = _context.BooksBorrowed
        //        .Include(bb => bb.BookModel)  // Include the related BookModel
        //        .Include(bb => bb.User)      // Include the related User
        //        .Where(bb => bb.User.Id == userId).ToList();

        //    return Json(booksBorrowed);

        //}
        //[HttpGet("Book/GetBooks/{userId}")]
        //public JsonResult GetBooksBorrowedByUser(string userId)
        //{
        //    try
        //    {
        //        var booksBorrowed = _context.BooksBorrowed
        //            .Include(bb => bb.BookModel)
        //            .Include(bb => bb.User)
        //            .Where(bb => bb.User.Id == userId)
        //            .Select(bb => new
        //            {
        //                BookId = bb.BookModel.BookId,
        //                BookName = bb.BookModel.BookName,
        //                Rating = bb.BookModel.Rating,
        //                Author = bb.BookModel.Author,
        //                Genre = bb.BookModel.Genre,
        //                Description = bb.BookModel.Description,
        //                IsBookAvailable = bb.BookModel.IsBookAvailable,
        //                Image = bb.BookModel.Image,
        //                UserName = bb.User.Name,
        //                UserTokens = bb.User.Tokens
        //            })
        //            .ToList();

        //        return Json(booksBorrowed);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.Error.WriteLine($"Error fetching books: {ex}");

        //        // Return a 500 Internal Server Error status code with an error message
        //        var errorResponse = new Response { Status = "Error", Message = "An error occurred while fetching books." };

        //        return Json(errorResponse);
        //    }
        //}



        [HttpPost("Book/AddBook/{userId}")]
        public async Task<IActionResult> AddBook([FromBody] BookModel book, string userId)
        {
            try
            {
                var user = await _userRepository.FindById(userId);

                if (user == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden,
                        new Response { Status = "Failed", Message = "Kindly Login to Add Book" });
                }

                // Perform any necessary business logic for updating Tokens
                // For example, decrementing Tokens by 1
                // user.Tokens -= 1;
                // await _userManager.UpdateAsync(user);

                var newBook = new BookModel
                {
                    BookName = book.BookName,
                    Rating = book.Rating,
                    Author = book.Author,
                    Genre = book.Genre,
                    Description = book.Description,
                    IsBookAvailable = true,  // Assuming a new book is available by default
                    Image = book.Image,
                    LentUserId = user  // Assign the user to the LentUserId property
                };

                var res = await _bookRepository.AddBook(newBook);

                if (res.BookId > 0)
                {
                    return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = "Added book successfully!" });
                }
                // Return a 201 Created status code with the created book
                //return CreatedAtAction(nameof(GetBookById), new { id = newBook.BookId }, newBook);
                return StatusCode(StatusCodes.Status500InternalServerError,
                   new Response { Status = "Error", Message = "An error occurred while adding the book to Database." });

            }
            catch (Exception ex)
            {

                // Log the exception
                Console.Error.WriteLine($"Error adding book: {ex}");

                // Return a 500 Internal Server Error status code with an error message
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "An error occurred while adding the book." });
            }
        }

        [HttpGet("Book/Return/{bookId}")]
        public async Task<JsonResult> BookReturn(int bookId)
        {
            try
            {
                BookModel book = await _bookRepository.Borrow(bookId);
                if (!ModelState.IsValid || book == null)
                {
                    Response.StatusCode = 404;
                    return Json(new { Message = "Resource Not found" });
                }
                book.IsBookAvailable = true;
                await _bookRepository.UpdateBookAvailability(book);
                return Json(new { Message = "Returned Successfully!" });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error returning borrowing book: {ex}");

                // Return a 500 Internal Server Error status code with an error message
                var errorResponse = new Response { Status = "500", Message = "An error occurred while returning the book." };

                return Json(errorResponse);
            }
        }

        
        [HttpGet("Book/BookBorrow/{userId}/{bookId}")]
        public async Task<JsonResult> BookBorrow(int bookId, string userId)
        {
            try
            {
                User user = await _userRepository.FindById(userId);
                BookModel book = await _bookRepository.Borrow(bookId);

                if (!ModelState.IsValid || user == null || book == null)
                {
                    Response.StatusCode = 404;
                    return Json(new { Message = "Resource Not found" });
                }

                // Check if the user has enough tokens to borrow the book
                if (user.Tokens <= 0)
                {
                    var successResponse = new Response
                    {
                        Status = "Failed",
                        Message = "Not Enough Tokens"
                    };

                    return new JsonResult(successResponse)
                    {
                        StatusCode = StatusCodes.Status200OK
                    };
                }

                User myLender = book.LentUserId;
                // Update user tokens (assuming you decrement tokens upon borrowing)
                user.Tokens--;
                myLender.Tokens++;

                // Mark the book as not available
                book.IsBookAvailable = false;

                var bookBorrowed = new BookBorrow
                {
                    User = user,
                    BookModel = book,
                };

                await _bookRepository.SingleBookBorrow(bookBorrowed);

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                };

                return Json(bookBorrowed, options);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error borrowing book: {ex}");

                // Return a 500 Internal Server Error status code with an error message
                var errorResponse = new Response { Status = "500", Message = "An error occurred while borrowing the book." };

                return Json(errorResponse);
            }
        }



    }
}
