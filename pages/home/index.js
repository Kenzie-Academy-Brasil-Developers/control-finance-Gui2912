/* Desenvolva sua lógica aqui */
let total = document.querySelector("#total")
let modal = document.querySelector(".modal");
let closeModal = document.querySelector("#close-modal-content");
let modalContent = document.querySelector(".modal-content")
closeModal.addEventListener("click", () => {
  modal.classList.add("none");
});

let newValor = document.querySelector(".new-valor");
console.log(newValor);
newValor.addEventListener("click", () => {
  modal.classList.remove("none");
  modal.classList.add("flex");
  modalContent.classList.add("appearr")
  modalContent.scroll(10)
});



function arrayMaker(idCategoria, valor, array) {
  const valuer = {
    id: array.length,
    value: Number(valor),
    categoryID: idCategoria
  };
  insertedValues.push(valuer)
  return valuer
}

let entrada = document.querySelector("#entrada")
let saida = document.querySelector("#saida")
let inserirValor = document.querySelector("#inserir-valor");
inserirValor.addEventListener("click", () => {
  listCards.innerHTML = ''
  let register = document.querySelector("#inp")

  let val = register.value;
  let type
  entrada.checked? type = 1: saida.checked? type = 2: false
  arrayMaker(type, val, insertedValues) 
  insertedValues.forEach(cardMaker)
});


let listCards = document.querySelector("#list-cards")

function emptySpace(){
    total.innerText = 0
    let emptySection = document.createElement("Section")
    emptySection.classList=("empty align-center flex column container-width")
    emptySection.addEventListener("click", () => {
    modal.classList.remove("none");
    modal.classList.add("flex");
  });

    let emptyh2 = document.createElement("h2")
    emptyh2.innerText = "Nenhum valor Registrado"

    let emptyhP = document.createElement("p")
    emptyhP.innerText = "Registre agora um novo valor"

    emptySection.append(emptyh2, emptyhP)
    listCards.appendChild(emptySection)
    return listCards
  }

if (insertedValues.length == 0) {
  emptySpace()
}


function cardMaker(element, index,array){
  let li = document.createElement("li")
  li.classList.add("list-style", "flex", "space-between", "align-center")

  let p = document.createElement("p")
  p.innerText = `R$ ${element.value.toFixed(1)}`

  let liContainer = document.createElement("div")
  liContainer.classList.add("flex")

  let dataType = document.createElement("button")
  if(element.categoryID == 1){
    dataType.innerText = "Entrada"
  }else{
    dataType.innerText = "Saída"
  }
  
  let removeButton = document.createElement("button")
  removeButton.id = "remove"
  removeButton.classList.add("flex", "justify-center", "align-center")


  removeButton.addEventListener("click", ()=>{
    listCards.innerHTML = ''
    array.splice(index,1)
    insertedValues.forEach(cardMaker)
    if (array.length == 0) {
      emptySpace()
    }
  })

  let trash = document.createElement("img")
  trash.src = "assets/trash.svg"

  removeButton.appendChild(trash)
  liContainer.append(dataType, removeButton)

  reduceTotal(array)

  li.append(p, liContainer)
  listCards.appendChild(li)
  

  return listCards
}

let saidas = document.querySelector("#saidas")
function categoryExit(value){
  return value.categoryID == 2
}

saidas.addEventListener("click", ()=>{
  listCards.innerHTML = ''
  const exitList = insertedValues.filter(categoryExit)
  if(exitList.length == 0){
    emptySpace()
  }
  exitList.forEach(cardMaker)
  reduceTotal(exitList)
})


let entradas = document.querySelector("#entradas")
function categoryEntrace(value){
  return value.categoryID == 1
}

entradas.addEventListener("click", ()=>{
  listCards.innerHTML = ''
  const entraceList = insertedValues.filter(categoryEntrace)
  if(entraceList.length == 0){
    emptySpace()
  }
  entraceList.forEach(cardMaker)
  reduceTotal(entraceList)
})

let todos = document.querySelector("#todos")
todos.addEventListener("click", ()=>{
  listCards.innerHTML = ''
  if(insertedValues.length == 0){
    emptySpace()
  }
  
  insertedValues.forEach(cardMaker)
})


function reduceTotal(arr){      
const somaTotal = arr.reduce((prevVal, element) => prevVal + element.value,0)
total.innerText = `R$ ${somaTotal}`
}
