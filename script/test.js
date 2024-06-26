const collectionClasses = document.getElementById("collection-classes");
const collectionsItems = document.getElementById("collection-items");
const quantityInput = document.getElementById('create-item-input-qty');
const quantityIncrement = document.getElementById('quantity-input-increment');
const quantityDecrement = document.getElementById('quantity-input-decrement');
let selectedUserCollection;
let userCollections = [];
let selectedIconForm;
let formIcons = [];
let formItemComponents = [];

document.querySelectorAll("#item-icon-form li").forEach(li => {
    formIcons.push(li);
    li.onclick = (e) => {
        const target = e.target;
        formIcons.forEach(icon => icon.classList.remove('selected'));
        target.classList.add('selected');
        selectedIconForm = target.innerText;
    }
})

document.querySelectorAll(".collection-read-content").forEach(a => {
    userCollections.push(a);
    a.onclick = (e) => {
        const target = e.target;
        userCollections.forEach(collection => collection.classList.remove('selected'));
        target.classList.add('selected');
        selectedIconForm = target.innerText;
    }
})

document.querySelectorAll("#item-form-components li").forEach(li => {
    li.onclick = (e) => {
        const target = e.target;
        if(formItemComponents.includes(target)) {
            const index = formItemComponents.indexOf(target);
            target.classList.remove('selected');
            delete formItemComponents[index];
        } else {
            formItemComponents.push(target);
            target.classList.add('selected');
        }
    }
})

quantityIncrement.onclick = () => quantityInput.stepUp();
quantityDecrement.onclick = () => quantityInput.stepDown();

function getCardContent() {
    collectionClasses.style.display = 'none';
    collectionsItems.innerHTML = '';
}

function setCollectionItem(){
    const title = 'Maçã';
    const icon = 'atom';
    const qnty = 25;
    const desc = 'Descrição teste, olha só que legal!'
    const newCard = document.createElement('div');
    newCard.innerHTML = createCard(title, icon, qnty, desc)
    newCard.classList.add('card');
    collectionsItems.appendChild(newCard);
}

function createCard(title, icon, qnty, desc){
    return `
    <img src="${icon}" alt="">
    <h1 class="card-title">${title}</h1>
    <p class="card-quantity">Qtd: ${qnty}</p>
    <p class="card-description">${desc}</p>
    <a href="">Ler mais</a>
    `
}

// function collectionRead(element) {
//     element.classList.toggle("selected");
//     getCardContent();
//     collectionsItems.innerHTML = readItem();
// }

function readItem() {
    return `
    <label for="input-icon1"><span class="material-symbols-outlined">coffee</span></label>
<input type="radio" name="icon-list" id="input-icon1">
<label for="input-icon2"><span class="material-symbols-outlined">laptop_chromebook</span></label>
<input type="radio" name="icon-list" id="input-icon2">`
}

