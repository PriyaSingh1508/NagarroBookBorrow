namespace Book.Borrow.Project.ViewModels
{
    public class BookBorrowViewModel
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
