using API.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            //Check if there are any users in the users table
            if (await context.Users.AnyAsync()) return;

            //No users in DB. So fetch data from json file
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            //No need to user Newtonsoft JSON since .net core 3.1
            //Deserialize the JSON file content
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            //Add these users to DB
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();

                //Here we hardcode password for Seed data Users
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("inno3d7600gtX*"));

                //Add Password Salt key we used to encrypt password. Store it.
                user.PasswordSalt = hmac.Key;

                //Add to memory in EF
                context.Users.Add(user);
            }

            //Save To DB
            await context.SaveChangesAsync();
        }
    }
}
