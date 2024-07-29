using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Domain.Helper
{
    public class BookBorrowView
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public bool IsBookAvailable { get; set; }
        public string Image { get; set; }
        public string UserName { get; set; }
        public int UserTokens { get; set; }
    }
}
