const header = document.querySelector('header')
const ul = document.querySelector('ul')

function renderProfile() {
    fetch('http://localhost:3000/users/2')
    .then(response => response.json())
    .then(userHash => {
        if (userHash.netflix == true) {
            const netflixLogo = document.createElement('img')
            netflixLogo.dataset.id = 1
            netflixLogo.src = "https://cdn.iconscout.com/icon/free/png-256/netflix-282224.png"
            header.append(netflixLogo)
            netflixLogo.addEventListener('click', event => {
                event.preventDefault()
                userHash.user_movies.forEach(userMovie => {
                    if (userMovie.movie.netflix == true) {
                        const li = document.createElement('li')
                        li.textContent = userMovie.movie.title
                        ul.append(li)
                    }
                })

            })
        }
        // userHash.user_movies.forEach(userMovie => { 
        //     if (userMovie.movie.netflix == true ) {
        //     console.log(userMovie.movie.title)
        // }})
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

// function serviceClick(logo) {
//     logo.addEventListener('click', event => {
//         event.preventDefault()
//         userHash.user_movies.forEach(userMovie => { 
//             if (userMovie.movie.netflix == true ) {
//             console.log(userMovie.movie.title)
//     }})
// })}
renderProfile()
renderMovies()