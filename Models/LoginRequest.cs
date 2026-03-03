using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Sistema_de_Biblioteca___C_.Models
{
    public class loginRequest
    {
        public loginRequest () {}
         
        [JsonPropertyName("loginUser")]
        public string loginUser {get; set;}
        [JsonPropertyName("loginPass")]
        public string loginPass {get; set;}

        public loginRequest(string _userName, string _password)
        {
            this.loginUser = _userName;
            this.loginPass = _password;
        }
    }
}