using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Domain
{
    public class User:IdentityUser
    {
        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required]
        [Range(1, int.MaxValue - 1)]
        public int Tokens { get; set; } = 5;
    }
}
