function createCard(title, icon, qnty, desc){
    return `
    <img src="${icon}" alt="">
    <h1 class="card-title">${title}</h1>
    <p class="card-quantity">Qtd: ${qnty}</p>
    <p class="card-description">${desc}</p>
    <a href="">Ler mais</a>
    `
}