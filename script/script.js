document.addEventListener('DOMContentLoaded', this, getCollectionsList());

function getCookieValue(name){
    const cookies = document.cookie;
    if(!cookies.includes(name)) return null;
    if(cookies.includes(";")) {
        const cookiesList = cookies.split(";");
        return cookiesList.filter(cookie => cookie.includes(name))[0].replace(" ", "");
    }
    return cookies;
}

async function getCollectionsList() {
    let token = getCookieValue("token").replace("token=", "");
    const response1 = await fetch("http://localhost:8080/itemsfolders", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if(response1.ok) {
        response1.json()
        .then(data => {
        const collectionsList = document.getElementById('collection-ul');
        data.forEach(itemsFolder => {
            const collection = document.createElement('a');
            collection.id = itemsFolder.id;
            collection.classList.add('collection-content-read');
            collection.innerHTML = `
            <span></span>${itemsFolder.folder_name}
            `;
            // collection.onclick = () => getIngredientsByFolderId(collection.id);
            collection.onclick = () => collectionRead(collection);
            collectionsList.appendChild(collection);
            })
        });
    };
}

function getItemsByFolderId(id) {
    const label = document.querySelector('#collection-title');
    const cardsSection = document.querySelector('#collection-items');
    // const labelIcon = document.querySelector('#main-section-label img');
    // const rightBar = document.querySelector('.sidebar-right');

    if(!label.id.includes(id)) {
        let token = getCookieValue("token").replace("token=", "");
        fetch("http://localhost:8080/itemsfolders/" + id, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // rightBar.innerHTML = '';
                cardsSection.innerHTML = "";
                label.textContent = data.folder_name;
                label.id = data.id;
                data.ingredients.forEach(ingredient => {
                    cardsSection.appendChild(createCard(ingredient));
                });
            })
    }
}

// function getIngredients() {
//     const cardsSection = document.querySelector('.cards-section');
//     const label = document.querySelector('#main-section-label h1');
//     const labelIcon = document.querySelector('#main-section-label img');
//     const rightBar = document.querySelector('.sidebar-right');

//     fetch("http://localhost:8080/ingredients")
//     .then(response => response.json())
//     .then(data => {
//         rightBar.innerHTML = '';
//         cardsSection.innerHTML = "";
//         label.textContent = data.folder_name;
//         label.id = data.id;
//         labelIcon.src = `./images/${data.icon}-light-icon.png`
//         data.forEach(ingredient => {
//             createCard(ingredient);
//         });
//     })
// }

// async function getIngredientById(id) {
//     return fetch("http://localhost:8080/ingredients/" + id)
//         .then(response => response.json());
// }

// function getRecipesByFolderId(id) {
//     const cardsSection = document.querySelector('.cards-section');
//     const label = document.querySelector('#main-section-label h1');
//     const labelIcon = document.querySelector('#main-section-label img');
//     const rightBar = document.querySelector('.sidebar-right');

//     if(!label.id.includes(id)) {
//         let token = getCookieValue("token").replace("token=", "");
//         fetch("http://localhost:8080/recipesfolders/" + id, {
//             credentials: 'include',
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cookie': `token=${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 rightBar.innerHTML = '';
//                 cardsSection.innerHTML = "";
//                 label.textContent = data.folder_name;
//                 label.id = data.id;
//                 labelIcon.src = `./images/${data.icon}-light-icon.png`
//                 data.recipes.forEach(recipe => {
//                     createCard(recipe);
//                 });
//             });
//     }
// }

// function getRecipes() {
//     const cardsSection = document.querySelector('.cards-section');
//     const label = document.querySelector('#main-section-label h1');
//     const labelIcon = document.querySelector('#main-section-label img');
//     const rightBar = document.querySelector('.sidebar-right');

//     fetch("http://localhost:8080/recipes")
//     .then(response => response.json())
//     .then(data => {
//         rightBar.innerHTML = '';
//         cardsSection.innerHTML = "";
//         label.textContent = 'Receitas';
//         label.id = data.id;
//         labelIcon.src = `./images/book-light-icon.png`
//         data.forEach(recipe => {
//             createCard(recipe);
//         });
//     })
// }

// async function getRecipeById(id) {
//     return fetch("http://localhost:8080/recipes/" + id)
//         .then(response => response.json());
// }

function createCard(data) {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = data.id;
    // newCard.classList.add('fade-in');

    newCard.innerHTML = `
    <span class="material-symbols-outlined">${data.item_icon}</span>
    <h1 class="card-title">${data.item_name}</h1>
    <p class="card-quantity">Qtd: ${data.quantity}</p>
    <p class="card-description">${data.description}</p>
    <a>Ler mais</a>
    `;

    return newCard;
    
    // const cardConfig = newCard.querySelector('.menu');
    // const readMoreButton = newCard.querySelector('a');
    // const deleteButton = newCard.querySelector('.card-delete-button');
    // cardConfig.onclick = () => {
    //     cardConfig.classList.toggle('active');
    //     newCard.classList.toggle('dispose-content');
    // }
    // readMoreButton.onclick = () => {
    //     getCardContent(newCard);
    // }
    // deleteButton.onclick = () => {
    //     deleteCard(newCard);
    // }
}

// async function getCardContent(card){
//     const rightBar = document.querySelector('.sidebar-right');
//     const rightBarContent = document.createElement('div');
//     let data, objectName;

//     rightBarContent.className = 'sidebar-right-content'
//     rightBarContent.classList.add('fade-in');

//     if(card.classList.contains('recipe')) {
//         await getRecipeById(card.id)
//         .then(json => {
//             data = json;
//         });
//         objectName = data.recipeName;
//     }
//     else if(card.classList.contains('ingredient')){
//         await getIngredientById(card.id)
//         .then(json => {
//             data = json;
//         });
//         objectName = data.ingredientName;
//     }
    
//     rightBarContent.id = data.id;
//     const oldContent = document.querySelector('.sidebar-right-content');
//     if(!rightBar.contains(oldContent) || !data.id.includes(oldContent.id)) {
//         rightBar.innerHTML = '';
//         rightBarContent.innerHTML = `
//             <div class="card-info">
//                 <img src="./images/${data.icon}-icon.png" alt="">
//                 <h1>${objectName}</h1>
//                 <p class="card-info-description">${data.description}</p>
//                 <p class="card-info-quantity">Quantidade: ${data.quantity}</p>
//             </div>
    
//             <div class="card-info-ingredients">
//                 <h2 class="card-info-ingredients-label">Ingredientes:</h2>
//                 <li class="ingredients-list">
//                 </li>
//             </div>`;
    
//         rightBar.appendChild(rightBarContent);
        
//         const ingredientsList = document.querySelector('.ingredients-list');
//         const ingredientsListLabel = document.querySelector('.card-info-ingredients-label');
//         if(!card.classList.contains('recipe')) {
//             ingredientsList.style.display = 'none';
//             ingredientsListLabel.style.display = 'none';
//         }
//         else if(!data.ingredients[0]) {
//             ingredientsList.style.display = 'none';
//             ingredientsListLabel.style.display = 'none';
//         }
//         else if('ingredients' in data) {
//             data.ingredients.forEach(ingredient => {
//                 ingredientsList.innerHTML += `
//                     <ul>
//                         <h3>${ingredient.ingredientName}</h3>
//                         <p>Quantidade: ${ingredient.quantity}</p>
//                     </ul>
//                 `;
//             });
//         }
//     }
// }

// async function deleteCard(card) {
//     const url = (card.classList.contains('recipe')) ? "http://localhost:8080/recipes/" : "http://localhost:8080/ingredients/";
//     const rightBarContent = document.querySelector('.sidebar-right-content');

//     await fetch(url+ card.id, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }})
//     .then(response => {
//         if(response.ok){
//             card.remove();
//             if(rightBarContent.id.includes(card.id)) {
//                 rightBarContent.remove();
//             }
//         }
//     })
// }

// const createCollectionButton = document.getElementById('create-collection-button');
// createCollectionButton.addEventListener('click', () => {
    
//     const rightBarContent = document.createElement('div');
//     rightBarContent.id = 'sidebar-create-collection';
//     rightBarContent.className = 'sidebar-right-content';
//     rightBarContent.classList.add('fade-in');
    
//     rightBar.innerHTML = '';
//     rightBarContent.innerHTML = `
//         <h1 class="create-collection-label">Nova coleção</h1>
//         <select name="" id="select-list">
//             <option value="apple">apple</option>
//             <option value="apple">atom</option>
//         </select>
//         <input type="text" name="" id="input-object-name" maxlength="30">
//         <button type="submit" id="create-object-button">Criar</button>
//     `;
    
//     rightBar.appendChild(rightBarContent);

//     const createButton = document.getElementById('create-object-button');
//     const select = document.getElementById('select-list');
//     const inputObjectName = document.getElementById('input-object-name');
    
//     createButton.onclick = () => {
//         // console.log(`${select.options[select.selectedIndex].innerText}, ${inputObjectName}`);
//         const selectOption = select.options[select.selectedIndex].innerText;
//         const data = {
//             "ingredientsFolderName": `${inputObjectName.value}`,
//             "icon": `${selectOption}`,
//             "ingredients": [],
//         }
        
//         if(selectOption && inputObjectName){
//         }
//         fetch("http://localhost:8080/itemsfolders", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         })
//         .then(response => {
//             if(response.ok){
//                 console.log("Item criado!");
//                 const collectionsList = document.querySelector('.user-collections');
//                 collectionsList.innerHTML = '';
//                 getCollectionsList();
//                 rightBar.innerHTML = '';
//             }
//             else {
//                 console.log("Erro ao criar item...");
//             }
//         });
//     };

// });
