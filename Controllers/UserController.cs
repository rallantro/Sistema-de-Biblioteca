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

        [HttpPost]
        public IActionResult Login([FromBody] loginRequest _user)
        {

            if (_context.users.Any(x => x.userName == _user.loginUser && x.password == _user.loginPass))
            {
                return Ok();   
            }
            return Unauthorized();
        }
        
    }
}