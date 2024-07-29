using Book.Borrow.Project.Models.Authentication;
using Book.Borrow.Project.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using BookBorrowDomain.Domain;
using BookBorrowDomain.Repository;
using System;

namespace Book.Borrow.Project.Controllers
{
    public class AccountController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;
        private readonly IUserRepository _userRepository;

        public AccountController(IConfiguration configuration, SignInManager<User> signInManager, IUserRepository userRepository)
        {
            _configuration = configuration;
            _signInManager = signInManager;
            _userRepository = userRepository;
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Register register)
        {
            try
            {
                var userExit = await _userRepository.FindByEmail(register.Email);
                if (userExit != null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden,
                        new Response { Status = "Error", Message = "User Already exists" });
                }

                var user = new User()
                {
                    Name = register.UserName,
                    Email = register.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = register.UserName
                };

                var result = await _userRepository.Create(user, register.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status403Forbidden,
                        new Response { Status = "Error", Message = "Failed to Create user in the Database" });
                }

                TempData["success"] = "Register Successful";
                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = "Created New User Successfully!" });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Exception during user registration: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "Internal Server Error" });
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            Login model = new Login();
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userRepository.FindByEmail(model.Email);

                    if (user != null)
                    {
                        var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, lockoutOnFailure: false);

                        if (result.Succeeded)
                        {
                            TempData["success"] = "Login Successful";
                            return Json(user);
                        }
                    }

                    return StatusCode(StatusCodes.Status403Forbidden,
                        new Response { Status = "Failed", Message = "Login Failed" });
                }

                return View(model);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during user login: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "Internal Server Error" });
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return RedirectToAction("Login", "Account");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during user logout: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "Internal Server Error" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> FetchUsers()
        {
            try
            {
                var users = await _userRepository.FetchUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during fetching users: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "Internal Server Error" });
            }
        }

        [HttpGet("FetchUserById/{userId}")]
        public async Task<IActionResult> FetchUserById(string userId)
        {
            try
            {
                var user = await _userRepository.FindById(userId);

                if (user == null)
                {
                    return NotFound($"User with ID {userId} not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during fetching user by ID: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "Internal Server Error" });
            }
        }
    }
}
