const ingredientsButton = document.getElementById("ingredientsButton");
const inputContent = document.getElementById("search-input");

function getIngredients() {
    fetch("http://localhost:8080/ingredients")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

function getRecipes() {
    fetch("http://localhost:8080/recipes")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

function getIngredientById() {
    let id = inputContent.value;
    fetch("http://localhost:8080/ingredients/" + id)
        .then(response => response.json())
        .then(data => {
            createCard(data);
        })
}

function insertCardData(data) {
    const card = document.querySelector('.card:first-child');

    card.querySelector('h1').textContent = data.ingredientName;
    card.querySelector('p').textContent = data.descricao;
}

function createCard(data) {
    const cardsSection = document.querySelector('.cards-section');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.classList.add('fade-in');

    newCard.innerHTML = `
        <img src="./images/icons8-plastic-50.png">
        <h1>${data.ingredientName}</h1>
        <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis ut eros eget aliquet. Ut cursus ullamcorper nulla vitae interdum.</p>
        <p class="card-quantity">Qtd: ${data.quantity}</p>
        <a href="#">Ler mais</a>`;

    cardsSection.appendChild(newCard);
}