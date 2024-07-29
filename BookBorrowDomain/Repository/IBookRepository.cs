using BookBorrowDomain.Domain;
using BookBorrowDomain.Domain.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Repository
{
    public interface IBookRepository
    {
        Task<IEnumerable<BookModel>> GetAll();
        public Task<BookModel> AddBook(BookModel newBook);

        public Task<BookModel> Borrow(int bookId);

        public Task<BookBorrow> SingleBookBorrow(BookBorrow bookBorrowed);

        public Task<BookModel> UpdateBookAvailability(BookModel book);

       // public Task<IEnumerable<BookBorrowView>> GetAllBooksBorrowedByUser(string userId);
    }
}
