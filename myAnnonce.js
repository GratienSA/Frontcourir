let cards = document.querySelector('.cards');
let jwt = window.localStorage.getItem('jwt');

async function getMyAnnonces() {
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    };

    try {
        let apiRequest = await fetch('http://localhost:5000/annonce/mine', request);
        let response = await apiRequest.json();

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

        
        addEditAndDeleteListeners();

    } catch (error) {
        console.error('Erreur lors de la récupération des annonces :', error);
    }
}

getMyAnnonces();

function addEditAndDeleteListeners() {
    let editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let annonceId = btn.dataset.id;
            editAnnonce(annonceId);
        });
    });

    let deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let annonceId = btn.dataset.id;
            deleteAnnonce(annonceId);
        });
    });
}

async function deleteAnnonce(annonceId) {
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    };

    try {
        let apiRequest = await fetch(`http://localhost:5000/annonce/mine/${annonceId}`, request);
        let response = await apiRequest.json();
        console.log('Annonce supprimée avec succès:', response);
        cards.innerHTML = '';
        getMyAnnonces();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
    }
}

let modal = document.querySelector('.modal');

async function editAnnonce(annonceId, annonce) {
    let title = document.querySelector('.title');
    let description = document.querySelector('.description');
    let image = document.querySelector('.image');
    let category = document.querySelector('.category');

    title.value = annonce.title;
    description.value = annonce.description;
    image.value = annonce.image;
    category.value = annonce.category;

    modal.classList.remove('hidden');
}

async function endEditAnnonce(annonceId) {
    modal.classList.add('hidden');

    let title = document.querySelector('.title').value;
    let description = document.querySelector('.description').value;
    let image = document.querySelector('.image').value;
    let category = document.querySelector('.category').value;

    let request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ title, description, image, category }),
    };

    try {
        let apiRequest = await fetch(`http://localhost:5000/annonce/mine/${annonceId}`, request);
        let response = await apiRequest.json();
        console.log('Annonce mise à jour avec succès :', response);
        cards.innerHTML = '';
        getMyAnnonces();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
    }
}
