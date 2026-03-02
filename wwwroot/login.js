function login (event){
    var userName = document.getElementById('user').value;
    var password = document.getElementById('pass').value;
    event.preventDefault();

    fetch(`/User/login/${userName.value}/${password.value}`) 
            .then(response => {
                if (response.status == 404)
                alert("Não há nenhum livro com esse nome na base de dados.");
                if (!response.ok) throw new Error("Erro na rede");
                return response.json();
            })
            .then(dados => {
                console.log("Fez login, oloko");
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
}