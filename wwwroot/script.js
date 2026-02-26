

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
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                let conteudo = "";

                dados.forEach(livro => {
                    conteudo += `
                        <div style="border: 1px solid black; margin: 10px; padding: 10px; width: 50%">
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
        const displayAutor = document.getElementById('resultadoAutor');
        const name = document.getElementById('autorName');
        event.preventDefault();

        if(name.value == "") 
            document.getElementById('autorName').focus();

        fetch(`/Livros/autor/${name.value}`) 
            .then(response => {
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                let conteudo = "";

                dados.forEach(livro => {
                
                    conteudo += `
                        <div style="border: 1px solid black; margin: 10px; padding: 10px; width: 50%">
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