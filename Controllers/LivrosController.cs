using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sistema_de_Biblioteca___C_.Context;
using Sistema_de_Biblioteca___C_.Models;

namespace Sistema_de_Biblioteca___C_.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly BiblioContext _context;
        public LivrosController(BiblioContext context)
        {
            _context = context;
        }

        [HttpGet("id/{nome}")]
        public IActionResult ObterID(string nome)
        {
            var livro = _context.livros.Where(x => x.nome.Contains(nome));
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("porId/{id}")]
        public IActionResult ObterID(int id)
        {
            var livro = _context.livros.Find(id);
            
            if(livro == null)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("nome/{nome}")]
        public IActionResult ObterPorNome(string nome)
        {
            var livro = _context.livros.Where(x => x.nome.Contains(nome));
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        [HttpGet("autor/{nomeAutor}")]
        public IActionResult ObterPorAutor(string nomeAutor)
        {
            var livro = _context.livros.Where(x => x.nomeAutor.Contains(nomeAutor));
            
            if(livro.ToArray().Length == 0)
                return NotFound();

            return Ok(livro);
        }

        [HttpPost]
        public IActionResult cadastrarLivro([FromBody] Livro livroNovo)
        {

            if (_context.livros.Any(x => x.nome.Contains(livroNovo.nome)))
            {
                return Conflict("Esse livro já foi cadastrado!");
            }

            _context.Add(livroNovo);
            _context.SaveChanges();

            return Ok("Livro Cadastrado com sucesso!");
        }

        [HttpPut]
        public IActionResult atualizarlivro([FromBody] Livro livronovo)
        {
            var livro = _context.livros.Find(livronovo.id);

            if (livro == null)
            {
                return NotFound("Este Id não foi registrado.");
            }

            livro.nome = livronovo.nome;
            livro.desc = livronovo.desc;
            livro.nomeAutor = livronovo.nomeAutor;

            _context.Update(livro);
            _context.SaveChanges();

            return Ok("Livro Atualizado com Sucesso");
        }

    }
}