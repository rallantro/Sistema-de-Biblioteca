function login (event){
    const aviso = document.getElementById('aviso');
    const loginRequest = {
        loginUser: document.getElementById('user').value,
        loginPass: document.getElementById('pass').value
    };
    event.preventDefault();

    fetch(`/User/login`, {
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
                    aviso.innerHTML =  '<p style="color: #31d174; animation-name: livroTran; animation-duration: 0.4s;"><strong>Login realizado com sucesso!</p>'
                    return response.json();
                }
            })
            .then(dados => {
                localStorage.setItem("token", dados.token);

                console.log("Fez login, oloko");
                setTimeout(() => {
                    window.location.href = "admin.html";
                }, 500);    
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
}