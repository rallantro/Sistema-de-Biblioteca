using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Sistema_de_Biblioteca___C_.Context;
using Sistema_de_Biblioteca___C_.Models;

namespace Sistema_de_Biblioteca___C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly BiblioContext _context;
        public UserController(BiblioContext context)
        {
            _context = context;
        }

        [HttpGet("login/{userName}")]
        public IActionResult Login(string userName)
        {
            var _user = new User(userName, "123456");

            if (_context.users.Contains(_user))
            {
                return Ok(_user);   
            }
            return Unauthorized();
        }
        
    }
}