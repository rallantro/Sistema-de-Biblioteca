function login (event){
    const aviso = document.getElementById('aviso');
    const loginRequest = {
        loginUser: document.getElementById('user').value,
        loginPass: document.getElementById('pass').value
    };
    event.preventDefault();

    fetch(`/User`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginRequest)
    })
            .then(response => {
                if (!response.ok) {
                    aviso.innerHTML =  '<p style="color: #d1313d; animation-name: shake; animation-duration: 0.4s;"><strong>Usuário ou Senha incorreto(a).</p>'
                }
                if (response.ok) {
                    aviso.innerHTML =  '<p style="color: #31d174;"><strong>Login realizado com sucesso!</p>'
                    window.location.href = "admin.html"
                }
            })
            .then(dados => {
                console.log("Fez login, oloko");
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
}