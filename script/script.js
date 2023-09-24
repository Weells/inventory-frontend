const ingredientsButton = document.getElementById("ingredientsButton");
const inputContent = document.getElementById("search-input");
const cardConfig = document.querySelector('.menu');

function getIngredients() {
    fetch("http://localhost:8080/ingredients")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cardsSection = document.querySelector('.cards-section');
            const label = document.querySelector('#main-section-label h1');
            const labelIcon = document.querySelector('#main-section-label img');
            cardsSection.innerHTML = "";
            label.textContent = "Ingredientes";
            labelIcon.src = "./images/icons8-atom-50.png"
            data.forEach(element => {
                createCard(element);
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
                createCard(element);
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

// function createCard(data) {
//     const cardsSection = document.querySelector('.cards-section');

//     const newCard = document.createElement('div');
//     newCard.className = 'card';
//     newCard.id = data.id;
//     newCard.classList.add('fade-in');

//     newCard.innerHTML = `
//         <div class="menu">
//             <span class="bar"></span>
//             <span class="bar"></span>
//             <span class="bar"></span>
//         </div>
//         <img src="./images/${data.icon}-icon.png">
//         <h1>${data.ingredientName}</h1>
//         <p class="card-description">${data.description}</p>
//         <p class="card-quantity">Qtd: ${data.quantity}</p>
//         <a href="#">Ler mais</a>`;

//     cardsSection.appendChild(newCard);
// }

function createCard(data) {
    const cardsSection = document.querySelector('.cards-section');
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = data.id;
    newCard.classList.add('fade-in');
    
    let objectName;
    if("recipeName" in data) {
        objectName = data.recipeName;
    }
    if("ingredientName" in data) {
        objectName = data.ingredientName;
    }

    newCard.innerHTML = `
        <div class="menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <img src="./images/${data.icon}-icon.png">
        <h1>${objectName}</h1>
        <p class="card-description">${data.description}</p>
        <p class="card-quantity">Qtd: ${data.quantity}</p>
        <a href="#">Ler mais</a>`;
    
    const cardConfig = newCard.querySelector('.menu');
    cardConfig.onclick = () => {
        cardConfig.classList.toggle('active');
    }
    cardsSection.appendChild(newCard);
}