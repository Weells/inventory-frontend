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

async function getIngredientById(id) {
    let jsonString;
    return await fetch("http://localhost:8080/ingredients/" + id)
        .then(response => response.json());
}

async function getRecipeById(id) {
    return await fetch("http://localhost:8080/recipes/" + id)
        .then(response => response.json());
}

function createCard(data) {
    const cardsSection = document.querySelector('.cards-section');
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = data.id;
    newCard.classList.add('fade-in');
    
    let objectName, typeDiv;
    if("recipeName" in data) {
        objectName = data.recipeName;
        typeDiv = 'recipe';
    }
    if("ingredientName" in data) {
        objectName = data.ingredientName;
        typeDiv = 'ingredient';
    }
    newCard.classList.add(typeDiv);

    newCard.innerHTML = `
        <div class="menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <img src="./images/${data.icon}-icon.png">
        <h1>${objectName}</h1>
        <p class="card-description overflow">${data.description}</p>
        <p class="card-quantity">Qtd: ${data.quantity}</p>
        <a href="#">Ler mais</a>`;
    
    const cardConfig = newCard.querySelector('.menu');
    const readMoreButton = newCard.querySelector('a');
    readMoreButton.onclick = () => {
        getCardContent(newCard);
    }
    cardConfig.onclick = () => {
        cardConfig.classList.toggle('active');
    }
    cardsSection.appendChild(newCard);
}

async function getCardContent(card){
    let data, objectName;

    if(card.classList.contains('recipe')) {
        await getRecipeById(card.id)
        .then(json => {
            data = json;
        });
        objectName = data.recipeName;
    }
    if(card.classList.contains('ingredient')){
        await getIngredientById(card.id)
        .then(json => {
            data = json;
        });
        objectName = data.ingredientName;
    }
    
    const rightBar = document.getElementById('sidebar-right');
    const rightBarContent = document.createElement('div');

    rightBarContent.id = 'sidebar-right-content'
    rightBarContent.classList.add('fade-in');

    rightBar.innerHTML = '';
    rightBarContent.innerHTML = `
        <div class="card-info">
            <img src="./images/${data.icon}-icon.png" alt="">
            <h1>${objectName}</h1>
            <p class="card-info-description">${data.description}</p>
            <p class="card-info-quantity">Quantidade: ${data.quantity}</p>
        </div>

        <div class="card-info-ingredients">
            <h2 class="card-info-ingredients-label">Ingredientes:</h2>
            <li class="ingredients-list">
            </li>
        </div>`;

        rightBar.appendChild(rightBarContent);
        
        const ingredientsList = document.querySelector('.ingredients-list');
        const ingredientsListLabel = document.querySelector('.card-info-ingredients-label');
        if(!card.classList.contains('recipe')){
            ingredientsList.style.display = 'none';
            ingredientsListLabel.style.display = 'none';
        }

        if('ingredients' in data) {
            data.ingredients.forEach(ingredient => {
                ingredientsList.innerHTML += `
                    <ul>
                        <h3>${ingredient.ingredientName}</h3>
                        <p>Quantidade: ${ingredient.quantity}</p>
                    </ul>
                `;
            });
        }
    }