

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
                if (response.status == 404)
                alert("Não há nenhum livro com esse nome.");
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

function buscarID(event){
        event.preventDefault();
        const name = document.getElementById('idName');
        const display = document.getElementById('resultadoId');

        if(name.value == "") {
            document.getElementById('idName').focus();
            return;
        }
        fetch(`/Livros/id/${name.value}`) 
            .then(response => {
                if (response.status == 404)
                alert("Não há nenhum livro com esse id.");
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                let conteudo = "";

                dados.forEach(livro => {
                    conteudo += `
                        <div style="border: 1px solid black; margin: 10px; padding: 10px; width: 50%">
                            <p><strong>ID:</strong> ${livro.Id}</p>
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
                if (response.status == 404)
                alert("Não há nenhum livro com esse autor.");
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

function cadastrar (event){

    const novoLivro = {
        Nome: document.getElementById('title').value,
        Descricao: document.getElementById('desc').value,
        Autor: document.getElementById('nomeAutor').value
    };


    event.preventDefault();

    fetch('/Livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(novoLivro)
    })
    .then(response =>{
        if (response.ok) 
            alert("Livro Cadastrado com sucesso!");
        
        if (response.status == 409)
            alert("Esse livro já foi Cadastrado!");
    })
    .then(dados => {
        console.log("Resposta do servidor:", dados);
        
        event.target.reset(); 
    })
    .catch(error => {
        console.log(error)
        return;
    })

}

function checkID(element){
    fetch(`/Livros/porId/${element.value}`) 
        .then(response => {
            if (response.status == 404)
            alert("Não há nenhum livro com esse id.");
            if (!response.ok) throw new Error("Erro na rede");
            return response.json();
        })
        .then(dados => {
            console.log("Resposta do servidor:", dados);
            document.getElementById('titleNew').value = dados.Nome;
            document.getElementById('descNew').value = dados.Descricao;
            document.getElementById('nomeAutorNew').value = dados.Autor;
        })          
}

function atualizar (event){

    const novoLivro = {
        Id: document.getElementById('idOld').value,
        Nome: document.getElementById('titleNew').value,
        Descricao: document.getElementById('descNew').value,
        Autor: document.getElementById('nomeAutorNew').value
    };


    event.preventDefault();

    fetch('/Livros', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(novoLivro)
    })
    .then(response =>{
        if (response.ok) 
            alert("Livro atualizado com sucesso!");
    })
    .then(dados => {
        console.log("Resposta do servidor:", dados);
        
        event.target.reset(); 
    })
    .catch(error => {
        console.log(error)
        return;
    })

}

function confirmID(element){
    const display = document.getElementById('demDel');

     fetch(`/Livros/porId/${element.value}`) 
        .then(response => {
            if (response.status == 404)
            alert("Não há nenhum livro com esse id.");
            if (!response.ok) throw new Error("Erro na rede");
            return response.json();
        })
        .then(livro => {
            display.innerHTML = `
                        <div style="border: 1px solid black; margin: 10px; padding: 10px; width: 50%">
                            <p><strong>Nome:</strong> ${livro.Nome}</p>
                            <p><strong>Descrição:</strong> ${livro.Descricao}</p>
                            <p><strong>Autor:</strong> ${livro.Autor}</p>
                        </div>
                    `;
        })
}

function deletar(event){
    event.preventDefault();
    const id = document.getElementById('idDel');

    if(window.confirm("Deseja realmente deletar esse livro da base de dados da biblioteca? (Essa ação é irreversível)")){
        fetch(`/Livros/${id.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(id.value)
        })
        .then(response =>{
            if (response.status == "NoContent") 
                alert("Livro excluído com sucesso!");
        })
    }

}