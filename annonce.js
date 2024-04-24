let cards = document.querySelector('.cards');

async function getAllAnnonces() {
    try {
        let apiCall = await fetch('http://localhost:5000/annonce/all');
        let response = await apiCall.json();
        console.log(response);

        response.forEach((annonce) => {
            let cardFooter = document.createElement('div');
            cardFooter.classList.add('card-footer', 'text-muted');

            let createdAt = new Date(annonce.createdAt);
            let formattedDate = createdAt.toLocaleDateString();
            cardFooter.textContent = formattedDate;

            cards.innerHTML += `
                <div class="mask d-flex align-items-center justify-content-center h-100 gradient-custom-3 p-4">
                    <div class="container">
                        <div class="row justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card">
                                    <img src="${annonce.image}" class="card-img-top" alt="${annonce.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${annonce.title}</h5>
                                        <p class="card-text">${annonce.description}</p>
                                        <div class="btn-group" role="group" aria-label="Card buttons">
                                            <button class="btn btn-primary edit-btn m-2" data-id="${annonce._id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button class="btn btn-danger delete-btn m-2" data-id="${annonce._id}"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <div class="card-footer text-muted">Publiée le ${formattedDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des annonces :', error);
    }
}

getAllAnnonces();

async function createAnnonce() {
    try {
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let image = document.getElementById('image').value;
        let category = document.getElementById('category').value;
        let userId = window.localStorage.getItem('jwt'); 

        let annonce = {
            title: title,
            description: description,
            image: image,
            category: category,
            userId: userId,
        };

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization:`Bearer ${userId}`,
            },
            body: JSON.stringify(annonce),
        };

        let apiRequest = await fetch('http://localhost:5000/annonce/create', request);
        let response = await apiRequest;
        console.log(response);
        if (response.status === 200) {
            console.log(response);
            window.location.href = './allAnnonces.html';
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce :', error);
    }
}
