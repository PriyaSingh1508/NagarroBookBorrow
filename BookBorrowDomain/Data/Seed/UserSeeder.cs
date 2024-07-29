using BookBorrowDomain.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookBorrowDomain.Data.Seed
{
    public static class UserSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var newUser = new User()
            {
                Email = "testuser@gmail.com",
                UserName = "testuser",
                Name = "TestUser",
                NormalizedEmail = "testuser@gmail.com".Normalize().ToUpperInvariant(),
                NormalizedUserName = "testuser".Normalize().ToUpperInvariant()
            };

            var passwordHasher = new PasswordHasher<User>();
            newUser.PasswordHash = passwordHasher.HashPassword(newUser, "Test@123");

            var newUser1 = new User()
            {
                Email = "testuser1@gmail.com",
                UserName = "testuser1",
                Name = "TestUser1",
                NormalizedEmail = "testuser1@gmail.com".Normalize().ToUpperInvariant(),
                NormalizedUserName = "testuser1".Normalize().ToUpperInvariant()
            };

            var passwordHasher1 = new PasswordHasher<User>();
            newUser1.PasswordHash = passwordHasher1.HashPassword(newUser1, "Test@123");

            var newUser2 = new User()
            {
                Email = "testuser2@gmail.com",
                UserName = "testuser2",
                Name = "TestUser2",
                NormalizedEmail = "testuser2@gmail.com".Normalize().ToUpperInvariant(),
                NormalizedUserName = "testuser2".Normalize().ToUpperInvariant()
            };

            var passwordHasher2 = new PasswordHasher<User>();
            newUser2.PasswordHash = passwordHasher2.HashPassword(newUser2, "Test@123");

            var newUser3 = new User()
            {
                Email = "testuser3@gmail.com",
                UserName = "testuser3",
                Name = "TestUser3",
                NormalizedEmail = "testuser3@gmail.com".Normalize().ToUpperInvariant(),
                NormalizedUserName = "testuser3".Normalize().ToUpperInvariant()
            };

            var passwordHasher3 = new PasswordHasher<User>();
            newUser3.PasswordHash = passwordHasher3.HashPassword(newUser3, "Test@123");

            modelBuilder.Entity<User>().HasData(newUser);
            modelBuilder.Entity<User>().HasData(newUser1);
            modelBuilder.Entity<User>().HasData(newUser2);
            modelBuilder.Entity<User>().HasData(newUser3);
        }
    }
}
