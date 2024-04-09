let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

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
});



fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => renderToys(data))

function renderToys(toyArray) {

  const toyCollection = document.getElementById('toy-collection')

// called this toy instead of toyObj like teacher did

  toyArray.forEach((toy) => {

    console.log(toy)

// called this toyCard instead of card like in solution

    const toyCard = document.createElement('div')
    toyCard.classList = 'card'

    const h2 = document.createElement('h2')
    h2.textContent = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.textContent = toy.likes + ' likes'

    const btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.id = toy.id
    btn.textContent = 'Like ❤️'

    // innerHTML BAD
    // toyCard.innerHTML = `
    //     <h2>${toy.name}</h2>
    //     <img src ='${toy.image}' class='toy-avatar' />
    //     <p>${toy.likes}</p>
    //     <button class ='like=btn' id=${toy.id}'>❤️</button>
    //     `

    let currLikes = toy.likes

    btn.addEventListener('click', handleIncrementLikes)

    function handleIncrementLikes() {
      currLikes ++ // currLikes = Currlikes + 1
      p.textContent = `${currLikes} likes`
    }

    // card.append (h2, img, p, btn)

    toyCard.appendChild(h2)
    toyCard.appendChild(img)
    toyCard.appendChild(p)
    toyCard.appendChild(btn)
    
    toyCollection.appendChild(toyCard)

  })
}

// solution has this as just "form"

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

  .then(resp => resp.json())
  .then(data => renderToys[(data)])
  .catch(error => console.error(error))
}
