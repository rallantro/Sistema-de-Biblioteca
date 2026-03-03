using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Sistema_de_Biblioteca___C_.Context;
using Sistema_de_Biblioteca___C_.Models;
using Sistema_de_Biblioteca___C_.Services;

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


        [HttpPost("login")]
        public IActionResult Login([FromBody] loginRequest _user)
        {
            var user1 = _context.users.FirstOrDefault(x => x.userName == _user.loginUser && x.password == _user.loginPass);

            if (user1 != null)
            {
                var token1 = TokenService.GerarToken(user1);
                return Ok(token1);   
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPost]
        public IActionResult verifyLogin()
        {
            return Ok();
        }
        
    }
}