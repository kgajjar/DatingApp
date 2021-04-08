using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        //Get all Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //Below we have to use async version of ToList
            var users = await _userRepository.GetUsersAsync();

            //Map to DTO
            //Source: users
            //Output: <IEnumerable<MemberDto>>

            var UsersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            //Wrap result in an OK response
            return Ok(UsersToReturn);
        }

        //Get specific User
        //api/users/3
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            //FindAsync method rather than Find. Map
            return _mapper.Map<MemberDto>(user);
        }
    }
}
