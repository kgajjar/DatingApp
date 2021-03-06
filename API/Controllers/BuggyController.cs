using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuggyController : BaseApiController////Since Controller class derives from ControllerBase. We use Controller base as this isnt using views like a MVC app does.
    {
        private readonly DataContext _context;

        //Inject DataContext into this constructor
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        #region Methods to generate responses that are unsuccessful

        //URI: api/buggy/auth
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            //Look for something that doesn't exist to [Throw Error]
            var thing = _context.Users.Find(-1);

            if (thing == null)
            {
                return NotFound();
            }
            else
            {
                //Return 201 OK with thing
                return Ok(thing);
            }
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            //Finding something that we know doesn't exist to throw error
            var thing = _context.Users.Find(-1);

            //We try to Parse a NUll to String to throw Null Ref Exception0
            var thingToReturn = thing.ToString();

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request.");
        }

        #endregion
    }
}
