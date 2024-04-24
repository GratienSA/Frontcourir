// Deux fonctions utilisant l'API Fetch pour communiquer avec un serveur back-end et 
// effectuer des opérations d'authentification utilisateur, telles que la connexion et l'inscription, 
// en utilisant des requêtes HTTP.

async function handleLogin() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value

    let user = {
        email: email,
        password: password,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:5000/user/login', request)
    let response = await apiRequest
    if (response.status === 200) {
        const data = await response.json()
        window.localStorage.setItem('jwt', data.jwt)

        setTimeout(() => {
            window.location.href = './allAnnonces.html'
        }, 1000)
    }
}

async function handleRegister() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value
    let firstName = document.querySelector('.firstName').value
    let lastName = document.querySelector('.lastName').value

    let user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = fetch('http://localhost:5000/user/register', request)
    let response = await apiRequest
    console.log(response)
    if (response.status === 200) {
        window.location.href = './login.html'
    }
}
