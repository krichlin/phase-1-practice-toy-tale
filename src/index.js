let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => renderImages(data))
  .catch(error => console.error(error))

const target = document.getElementById('toy-collection')

function renderImages(toyArray) {
    toyArray.forEach((toy) => {
    const toyCard = document.createElement('div')
    toyCard.classList = ('card')
    // console.log(toy)
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src ='${toy.image}' class='toy-avatar' />
    <p>${toy.likes}</p>
    <button class ='like=btn' id='[toy_id]'>❤️</button>`
    target.appendChild(toyCard)
    // console.log(target)
    
  })
}

const newToyForm = document.querySelector('.add-toy-form')
// console.log(newToyForm)

newToyForm.addEventListener('submit', (e) => renderNewToy(e)) 

function renderNewToy(e) {

    e.preventDefault()
    fetch('http://localhost:3000/toys', {

    method : 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({

    "name": e.target.name.value,  
    "image": e.target.image.value,
    "likes": 0

    })
})

  .then(response => response.json())
  .then(data => renderImages(data))
  .catch(error => console.error(error))

}

// });
