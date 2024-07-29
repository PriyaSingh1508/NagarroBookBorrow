using BookBorrowDomain.Data;
using BookBorrowDomain.Domain;
using BookBorrowDomain.Domain.Helper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public BookRepository(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
           
        }
        public async Task<IEnumerable<BookModel>> GetAll() => await _context.Books.Include(bb => bb.LentUserId).ToListAsync();

        public async Task<BookModel> AddBook(BookModel newBook)
        {
            await _context.Books.AddAsync(newBook);
            await _context.SaveChangesAsync();
            return newBook;
        }

        public async Task<BookModel> Borrow(int bookId) => await _context.Books.Include(b => b.LentUserId)
        .FirstOrDefaultAsync(item => item.BookId == bookId);

        public async Task<BookBorrow> SingleBookBorrow(BookBorrow bookBorrowed)
        {
            _context.BooksBorrowed.Add(bookBorrowed);
            await _context.SaveChangesAsync();
            return bookBorrowed;
        }
        public async Task<BookModel> UpdateBookAvailability(BookModel book)
        {
            _context.Books.UpdateRange(book);
            await _context.SaveChangesAsync();
            return book;
        }

        //public async Task<IEnumerable<BookBorrowView>> GetAllBooksBorrowedByUser(string userId)
        //{
        //    var booksBorrowed = _context.BooksBorrowed
        //        .Include(bb => bb.BookModel)  // Include the related BookModel
        //        .Include(bb => bb.User)       // Include the related User
        //        .Where(bb => bb.User.Id == userId)
        //        .Select(bb => new
        //        {
        //            BookId = bb.BookModel.BookId,
        //            BookName = bb.BookModel.BookName,
        //            Rating = bb.BookModel.Rating,
        //            Author = bb.BookModel.Author,
        //            Genre = bb.BookModel.Genre,
        //            Description = bb.BookModel.Description,
        //            IsBookAvailable = bb.BookModel.IsBookAvailable,
        //            Image = bb.BookModel.Image,
        //            UserName = bb.User.Name,  // Include user properties as needed
        //            UserTokens = bb.User.Tokens
        //        })
        //        .ToList();

        //    return booksBorrowed;
        //}

    }
}
