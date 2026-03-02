using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Sistema_de_Biblioteca___C_.Models
{
    public class User
    {
         public User() { }
        [JsonPropertyName("UserId")]
        public int id { get; set; }
         
        [JsonPropertyName("userName")]
        public string userName {get; set;}
        [JsonPropertyName("password")]
        public string password {get; set;}

        public User(string _userName, string _password)
        {
            this.userName = _userName;
            this.password = _password;
        }
    }
}