using System.ComponentModel.DataAnnotations;

namespace Book.Borrow.Project.ViewModels
{
    public class UserSignUpViewModel
    {
        [Required(ErrorMessage = "Enter you email")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Enter your first name")]
        [Display(Name = "Name")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "{0} must contain from  {2} to {1} characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Enter your phone number")]
        [Display(Name = "PhoneNumber")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone no must be length {1}")]
        public string PhoneNumber { get; set; }


        [Required(ErrorMessage = "Enter you password")]
        [Compare("ConfirmPassword", ErrorMessage = "Password does not match")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
