using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Domain
{
    public class BookModel
    {
        [Key]
        public int BookId { get; set; }


        [Required]
        [MaxLength(100)]
        [Display(Name = "Book Name")]
        public string? BookName { get; set; }

        [Required]
        [Range(1, 5)]
        public float Rating { get; set; }

        [Required]
        [StringLength(100)]
        public String? Author { get; set; }

        [Required]
        [StringLength(100)]
        public String? Genre { get; set; }

        [Required]
        [StringLength(100)]
        public String? Description { get; set; }

        [Required]
        public bool? IsBookAvailable { get; set; } = true;

        public User LentUserId { get; set; }  //Many books to one user
        [Required]
        [MaxLength(500)]
        public string? Image { get; set; }

    }
}
