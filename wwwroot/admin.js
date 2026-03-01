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
                        <div class="livroCard">
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
            if (response.status == 204) 
                alert("Livro excluído com sucesso!");
            event.target.reset();
        })
    }

}

function showID(){
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'flex';

    document.getElementById("idButton").classList.add('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.remove('active');
}

function showCad(){
    document.getElementById("cadastrar").style.display = 'flex';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.add('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.remove('active');
}

function showAtt(){
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'flex';
    document.getElementById("deletar").style.display = 'none';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.add('active');
    document.getElementById("delButton").classList.remove('active');
}

function showDel(){
    document.getElementById("cadastrar").style.display = 'none';
    document.getElementById("atualizar").style.display = 'none';
    document.getElementById("deletar").style.display = 'flex';
    document.getElementById("pesquisarID").style.display = 'none';

    document.getElementById("idButton").classList.remove('active');
    document.getElementById("cadButton").classList.remove('active');
    document.getElementById("attButton").classList.remove('active');
    document.getElementById("delButton").classList.add('active');
}