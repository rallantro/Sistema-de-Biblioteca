using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Sistema_de_Biblioteca___C_.Models;

namespace Sistema_de_Biblioteca___C_.Services
{
    public class TokenService
    {
        public static object GerarToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(Key.keyToken);
            var tokenConfig = new SecurityTokenDescriptor
            {
              Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
              {
                  new Claim("userID", user.id.ToString())
              }), 
              Expires = DateTime.UtcNow.AddHours(9),
              SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenConfig);
            var tokenString = tokenHandler.WriteToken(token);
            return new
            {
                token = tokenString
            };
        }
    }
}