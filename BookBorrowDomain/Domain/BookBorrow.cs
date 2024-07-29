using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Domain
{
    public class BookBorrow
    {
        public int BookBorrowId { get; set; }
        [Required]
        public User User { get; set; }

        [Required]
        public BookModel BookModel { get; set; }
    }
}
