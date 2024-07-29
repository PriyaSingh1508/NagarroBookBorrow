using BookBorrowDomain.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Repository
{
    public interface IUserRepository
    {

        public Task<IdentityResult> Create(User user, string password);
        //public Task<SignInResult> PasswordSignInAsync(string email, string password, bool remember);
        public Task<User> FindByEmail(string email);
        public Task<User> FindById(string id);

        public Task<IEnumerable<User>> FetchUsers();
        //public Task Logout();

    }
}
