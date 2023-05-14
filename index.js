let addMovie = false, commentMovie = false;

document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector("#new-movie-btn");
    const movieFormContainer = document.querySelector(".add-container");

    function renderOneMovie(movie) {
        // Get the parent node whose child is a movie card
        const movieCollection = document.querySelector('div#movie-collection')
    
        // Make a movie card
        const card = document.createElement('div')
        card.id = movie.id
        card.classList.add("card")
        movieCollection.appendChild(card)
    
        // Name the movie
        const h2 = document.createElement('h2')
        h2.innerHTML = movie.name
        card.appendChild(h2)
    
        // Put the image of the movie
        const image = document.createElement('img')
        image.src = movie.image
        image.className = "movie-avatar"
        card.appendChild(image)
    
        // Put the likes
        const p = document.createElement('p')
        p.innerHTML = `${movie.likes} likes`
        card.appendChild(p)
    
        // Put the button to update the likes, along with the id
        const likeBtn = document.createElement('button')
        likeBtn.classList.add("like-btn")
        likeBtn.id = movie.id
        likeBtn.innerHTML = "Like ❤️"
        card.appendChild(likeBtn)
    
        // Put the button to delete the movie, along with the id
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add("delete-btn")
        deleteBtn.id = movie.id
        deleteBtn.innerHTML = "Delete"
        card.appendChild(deleteBtn)
    
        // put the comment
        const h3 = document.createElement('h3')
        h3.innerHTML = `${movie.comment}`
        card.appendChild(h3)
    
        // If the user clicks the like button, update the likes
        card.querySelector('.like-btn').addEventListener('click', () => {
            movie.likes += 1
            updateLikes(movie)
        })
  
        // if the user clicks the delete button, delete the movie
        card.querySelector('.delete-btn').addEventListener('click', () => {
            card.remove()
            deleteMovie(movie.id)
        })
    } // renderOneMovie

    function updateLikes(movieObj){
        fetch(`http://localhost:3000/movies/${movieObj.id}`, {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
          body: JSON.stringify(movieObj)
        })
        .then(response => response.json())
        .then(movie => {
          // Get the movie card
          //const toyCard = document.querySelector(`div#${toy.id}`) why this doesn't work?
          const movieCard = document.getElementById(`${movie.id}`)
          // Update the likes for the movie with the id
          const theLikes = movieCard.querySelector("p")
          theLikes.innerHTML = `${movie.likes} likes`
        })
    } // updateLikes

    function deleteMovie(id){
      fetch(`http://localhost:3000/movies/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(movie => console.log(movie))
    }

    // Get all the movie data and render them to the DOM
    function renderAllMovies() {
        fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => movies.forEach(movie => renderOneMovie(movie)))
        .catch(function (error) {
        alert("401!");
        const movieCollection = document.querySelector('div#movie-collection')
        const h2 = document.createElement('h2');
        h2.innerHTML = "Unauthorized Access";
        movieCollection.appendChild(h2);
        });
    } // renderALlMovies
    renderAllMovies()

    function addNewMovie(nameInput, imageInput) {
        const formData = {
            "name": nameInput,
            "image": imageInput,
            "likes": 0,
            "comment": "no comment"
          };
          
        const configurationObject = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(formData),
          };
        
        fetch('http://localhost:3000/movies', configurationObject)
          .then((response) => response.json())
          .then((data) => renderOneMovie(data))
          .catch(function (error) {
            alert("401!!!");
            const errorMsg = document.querySelector('.container')
            const h2 = document.createElement('h2');
            h2.innerHTML = "Unauthorized Access";
            errorMsg.appendChild(h2);
          });
    } // addNewMovie
    
    movieFormContainer.addEventListener('submit', function(event) {
        event.preventDefault();
        let nameInput = document.querySelectorAll("input.input-text")[0];
        let imageInput = document.querySelectorAll("input.input-text")[1];
        addNewMovie(nameInput.value, imageInput.value);
    }); // movieFormContainer.addEventListener
    
    addBtn.addEventListener("click", () => {
        // hide or show the form
        addMovie = !addMovie;
        if (addMovie) {
            movieFormContainer.style.display = "block";
        } else {
            movieFormContainer.style.display = "none";
        }
    });


})