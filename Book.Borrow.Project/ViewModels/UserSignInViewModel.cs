﻿using System.ComponentModel.DataAnnotations;

namespace Book.Borrow.Project.ViewModels
{
    public class UserSignInViewModel
    {
        [Required(ErrorMessage = "Enter you email")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Enter you password")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }


        [Display(Name = "Remember me")]
        public bool Remember { get; set; }
    }
}
