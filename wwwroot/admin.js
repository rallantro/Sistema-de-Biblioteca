function verifyLogin(){
    const token = localStorage.getItem("token");
    const display = document.getElementById('verify');
    fetch('/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok){
            display.innerHTML =`<div class="errorCard">
            <p style="text-align: center; color: #d1313d;"><b>Você não possui autorização para estar aqui.</b></p>
            <p style="text-align: center; color: #d1313cb0; font-size: xxx-large;"><b>:/</b></p>
            <p style="text-align: center; color: #d1313d;"><b>Faça login para entrar na área de administração.</b></p>
            <a href="login.html"><button class="button">Login</button></a>
        </div>
        <div class="ContentBlock"></div>`
        }
    })

}

function logout(){
    localStorage.clear();
}

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
                alert("Não há nenhum livro com esse nome na base de dados.");
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                let conteudo = "";

                dados.forEach(livro => {
                    conteudo += `
                        <div class="livroCard">
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

function checkID(element){
    const token = localStorage.getItem("token");
    fetch(`/Livros/porId/${element.value}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }) 
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
    const token = localStorage.getItem("token");

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
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
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

    const token = localStorage.getItem("token");
    fetch(`/Livros/porId/${element.value}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status == 404){
                alert("Não há nenhum livro com esse id.");
            } else if (!response.ok) throw new Error("Erro na rede");
            return response.json();
        })
        .then(livro => {
            display.innerHTML = `
                            <div class="livroCardDel">
                            <p style="text-align: center; color: #d1313d; font-weight: bold;">Livro selecionado para a exclusão:</p>
                            <p><strong>Nome:</strong> ${livro.Nome}</p>
                            <p><strong>Descrição:</strong> ${livro.Descricao}</p>
                            <p><strong>Autor:</strong> ${livro.Autor}</p>
                        </div>
                    `;
        })
}

function cadastrar (event){
    const token = localStorage.getItem("token");
    const novoLivro = {
        Nome: document.getElementById('title').value,
        Descricao: document.getElementById('desc').value,
        Autor: document.getElementById('nomeAutor').value
    };


    event.preventDefault();

    fetch('/Livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoLivro)
    })
    .then(response =>{
        if (response.ok) {
            alert("Livro Cadastrado com sucesso!");
            event.target.reset(); 
        } else if (response.status == 409){
            alert("Esse livro já foi Cadastrado!");
        } else{
            throw new Error("Erro na rede");
        }
    })   
    .catch(error => {
        console.log(error)
        return;
    })

}


function deletar(){
    const id = document.getElementById('idDel');

    if(window.confirm("Deseja realmente deletar esse livro da base de dados da biblioteca? (Essa ação é irreversível)")){
        fetch(`/Livros/${id.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        .then(response =>{
            if (response.status == 204) 
                alert("Livro excluído com sucesso!");
                window.location.reload();
        })
    }

}

function hide(){
    document.getElementById('mensagem').style.display = 'inline';
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.remove('active');
}

function showID(){
    document.getElementById('mensagem').style.display = 'none';
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'inline';

    document.getElementById("idButton").classList.add('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.remove('active');
}

function showCad(){
    document.getElementById('mensagem').style.display = 'none';
    document.getElementById("cadastrar").style.display = 'grid';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.add('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.remove('active');
}

function showAtt(){
    document.getElementById('mensagem').style.display = 'none';
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'grid';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.add('active');
    document.getElementById("delButton").classList.remove('active');
}

function showDel(){
    document.getElementById('mensagem').style.display = 'none';
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'grid';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.add('active');
}