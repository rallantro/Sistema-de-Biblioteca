using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Sistema_de_Biblioteca___C_.Models
{
    public class Livro
    {
       public int id { get; set; } 

       [JsonPropertyName("Nome")]
       public string nome { get; set; } 
       
       [JsonPropertyName("Descricao")]
       public string desc { get; set; }    
       [JsonPropertyName("Autor")]  
       public string nomeAutor {get; set;}
    }
}