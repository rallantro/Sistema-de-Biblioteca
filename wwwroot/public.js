

function porNome(event){
        event.preventDefault();
        const name = document.getElementById('name');
        const display = document.getElementById('resultado');

        if(name.value == "") {
            document.getElementById('name').focus();
            return;
        }
        fetch(`/Livros/nome/${name.value}`) 
            .then(response => {
                if (response.status == 404){
                    alert("Não há nenhum livro com esse nome.");
                    throw new Error("Erro na rede");
                }
                
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
                
            })
            .then(dados => {
                let conteudo = "";
                
                dados.forEach(livro => {
                    conteudo += `
                        <div class="livroCard">
                            <p><strong>Nome:</strong> ${livro.Nome}</p>
                            <p><strong>Descrição:</strong> ${livro.Descricao}</p>
                            <p><strong>Autor:</strong> ${livro.Autor}</p>
                        </div>
                    `;
                }); 

                display.innerHTML = conteudo;
                console.log("Dados recebidos:", dados);
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
};

function porAutor(event){
        const displayAutor = document.getElementById('resultado');
        const name = document.getElementById('name');
        event.preventDefault();

        if(name.value == "") 
            document.getElementById('name').focus();

        fetch(`/Livros/autor/${name.value}`) 
            .then(response => {
                if (response.status == 404){
                    alert("Não há nenhum livro com esse autor."); 
                    throw new Error("Erro na rede");
                }
                
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                let conteudo = "";

                dados.forEach(livro => {
                
                    conteudo += `
                        <div class="livroCard">
                            <p><strong>Nome:</strong> ${livro.Nome}</p>
                            <p><strong>Descrição:</strong> ${livro.Descricao}</p>
                            <p><strong>Autor:</strong> ${livro.Autor}</p>
                        </div>
                    `;
                });
                
                displayAutor.innerHTML = conteudo;
                console.log("Dados recebidos:", dados);
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
};

function trocarSearch(element){
    const form = document.getElementById("formSearch");
    const name = document.getElementById("name");
       if (element.value == "Autor"){
            name.placeholder = "Digite o nome do autor";
        }else {
            name.placeholder = "Digite o nome do livro";
        } 

    form.onsubmit = function(event){
        if (element.value == "Autor"){
            porAutor(event);
        }else {
            porNome(event);
        }
    }
        
}