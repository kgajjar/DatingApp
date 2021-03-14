using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //Get the user from the DB. Don't use FindAsync method as we are not searching by PK.
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            //Check if user exists and return message
            if (user == null)
                return Unauthorized("Invalid username");

            //Hash the inputted password by passing the SALT we have in DB
            using var hmac = new HMACSHA512(user.PasswordSalt);

            //Generate computed hash from inputted password
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            //Check if inputted password hash = password in DB's hash
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    //Return invalid password
                    return Unauthorized("Invalid password");
                }
            }

            //Passwords match
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        //Values could come from body or query. Web API will figure it out. Has to be an object not strings.
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
                //Error 400 HTTP status code
                return BadRequest("Username is taken");

            //Provides us with our Hashing algorithm. Using will dispose of resources correctly.
            using var hmac = new HMACSHA512();

            //Create new user
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                //Generate password Hash
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),

                //Generate password salt
                PasswordSalt = hmac.Key
            };

            //Adding this to EF
            _context.Users.Add(user);

            //Persist changes to DB
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Check if user already exists in DB
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(c => c.UserName == username.ToLower());
        }
    }
}
