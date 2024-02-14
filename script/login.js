const url = "http://localhost:8080/";
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const submitUser = document.getElementById('submit-user');

submitUser.onclick = async function login() {
    const data = {
        "login": `${inputEmail.value}`,
        "password": `${inputPassword.value}`
    }

    const response = await fetch("http://localhost:8080/auth/login", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.status != 200){
        console.log("Erro ao logar");
    } else if(response.ok) {
        const object = await response.json();
        document.cookie = `token=${object.token}`;
        document.location.assign('/');
    }
}

async function pastasDeReceitas() {
    const token = document.cookie.token;
    const response = await fetch("http://localhost:8080/recipesfolders", {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if(response.ok){
        const json = response.json();
        console.log(json);
    }
}