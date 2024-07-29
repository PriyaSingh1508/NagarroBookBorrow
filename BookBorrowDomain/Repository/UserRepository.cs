using BookBorrowDomain.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Repository
{
    public class UserRepository:IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        
        public UserRepository(UserManager<User> userManager, IConfiguration configuration  )
        {
            _userManager = userManager;
            _configuration = configuration;
          
        }
        public async Task<IdentityResult> Create(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);


            return result;
        }

       // public async Task<SignInResult> PasswordSignInAsync(string email, string password, bool remember) => await _signInManager.PasswordSignInAsync(email, password, true);


        public async Task<User> FindByEmail(string email) => await _userManager.FindByEmailAsync(email);
        public async Task<User> FindById(string id) => await _userManager.FindByIdAsync(id);

        public async Task<IEnumerable<User>> FetchUsers()=> await _userManager.Users.ToListAsync();

    }
}
