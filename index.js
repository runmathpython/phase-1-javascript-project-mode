document.addEventListener("DOMContentLoaded", () => {

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
    
        
      } // renderOneMovie


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


})