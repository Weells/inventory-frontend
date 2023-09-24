const ingredientsButton = document.getElementById("ingredientsButton");
const inputContent = document.getElementById("search-input");

function getIngredients() {
    fetch("http://localhost:8080/ingredients")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cardsSection = document.querySelector('.cards-section');
            cardsSection.innerHTML = "";
            data.forEach(element => {
                createCard(element);
                // const div = document.createElement('div');
                // div.className = 'card';
                // div.classList.add('fade-in');

                // div.innerHTML = `
                // <img src="./images/${element.icon}-icon.png">
                // <h1>${element.ingredientName}</h1>
                // <p class="card-description">Lorem ipsum dolor sit amet</p>
                // <p class="card-quantity">Qtd: ${element.quantity}</p>
                // <a href="#">Ler mais</a>`;

                // cardsSection.appendChild(div);
            });
        })
}

function getRecipes() {
    fetch("http://localhost:8080/recipes")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cardsSection = document.querySelector('.cards-section');
            const label = document.querySelector('#main-section-label h1');
            const labelIcon = document.querySelector('#main-section-label img');
            cardsSection.innerHTML = "";
            label.textContent = "Receitas";
            labelIcon.src = './images/book-icon (1).png';
            data.forEach(element => {
                createRecipeCard(element);
                // div.className = 'card';
                // div.classList.add('fade-in');

                // div.innerHTML = `
                // <img src="./images/${element.icon}-icon.png">
                // <h1>${element.recipeName}</h1>
                // <p class="card-description">Uma chávena ou xícara (escrito chícara em português de Portugal) é um recipiente ou utensílio doméstico, usado para bebidas quentes ou frias. O termo xícara, usado no Brasil na atualidade, caiu em desuso em Portugal, surgindo apenas na literatura e em romances do século XIX.</p>
                // <p class="card-quantity">Qtd: ${element.quantity}</p>
                // <a href="#">Ler mais</a>`;

                //cardsSection.appendChild(div);
            });
        })
}

function getIngredientById() {
    let id = inputContent.value;
    fetch("http://localhost:8080/ingredients/" + id)
        .then(response => response.json())
        .then(json => {
            createCard(json);
        })
}

function createCard(data) {
    const cardsSection = document.querySelector('.cards-section');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.classList.add('fade-in');

    newCard.innerHTML = `
        <img class="card-config" src="./images/ellipsis-vertical-solid.svg" width="15" height="15" alt="">
        <img src="./images/${data.icon}-icon.png">
        <h1>${data.ingredientName}</h1>
        <p class="card-description">Lorem ipsum dolor sit amet</p>
        <p class="card-quantity">Qtd: ${data.quantity}</p>
        <a href="#">Ler mais</a>`;

    cardsSection.appendChild(newCard);
}
function createRecipeCard(data) {
    const cardsSection = document.querySelector('.cards-section');

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.classList.add('fade-in');

    newCard.innerHTML = `
        <img class="card-config" src="./images/ellipsis-vertical-solid.svg" width="15" height="15" alt="">
        <img src="./images/${data.icon}-icon.png">
        <h1>${data.recipeName}</h1>
        <p class="card-description">Lorem ipsum dolor sit amet</p>
        <p class="card-quantity">Qtd: ${data.quantity}</p>
        <a href="#">Ler mais</a>`;

    cardsSection.appendChild(newCard);
}