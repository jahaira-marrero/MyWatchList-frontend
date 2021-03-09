const header = document.querySelector('header')

function renderProfile() {
    fetch('http://localhost:3000/users/1')
    .then(response => response.json())
    .then(user => {
        header.innerHTML = `<h1> ${user.username} </h1>
        <h3> ${user.movies.forEach(movie => {
            renderMovie(movie)
        })
        })} </h3>`

        })
    }

function renderMovies() {
    fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(movieArray => {
        movieArray.forEach(movie => {
            renderMovie(movie)
        })
    })
}

function renderMovie(movie) {
    const div = document.createElement('div')
    div.classList.add('moviecard')
    div.dataset.id = movie.id
    div.innerHTML = `<h2>${movie.title}</h2> 
    <img src= "${movie.image}">`

    const moviediv = document.querySelector('div#movie-card-collection')
    moviediv.append(div)
}

renderProfile()
renderMovies()