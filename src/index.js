/********** Global Variables **********/

const header = document.querySelector('header')
const headerName = header.querySelector('h1')
const myMovieDiv = document.querySelector('div#movie-card-collection')
const searchForm = document.querySelector('form#movie-search-form')
const loginForm = document.querySelector('form#login')
let profileId = 2
let movies = []
let myMovies = []

/********** Functions **********/

// Puts movies from out database into movies(GV)
function getAllMovies() {
    fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(movieArray => {
        movies = movieArray
    })
}

// Renders all movies from searched Movies
function renderMovies(movieArray) {
    myMovieDiv.innerHTML = ""
        movieArray.forEach(movie => {
            renderMovie(movie)
        })
}

// Creates movie div card for searched movies
function renderMovie(movie) {
    const div = document.createElement('div')
    div.classList.add('moviecard')
    div.dataset.id = movie.id
    div.innerHTML = `<h2>${movie.title}</h2> 
    <img src= "${movie.image}">
    <button class= "addBtn"> Add to list</button>`

    myMovieDiv.append(div)
}

// Loads user profile with logos
function renderMyProfile() {
    fetch(`http://localhost:3000/users/${profileId}`)
    .then(response => response.json())
    .then(userHash => {
        headerName.innerText = `Profile: ${userHash.username}`
        renderUserLogos()
        // getAllMovies()
        // accessMyMovies()
        // renderMyMovies(myMovies)
    })
}

// Logos to header(GV)
function renderUserLogos() {
    fetch(`http://localhost:3000/users/${profileId}`)
    .then(response => response.json())
    .then(userHash => {

    if (userHash.netflix === true) {
        const netflixLogo = document.createElement('img')
        netflixLogo.dataset.id = 1
        netflixLogo.src = "https://cdn.iconscout.com/icon/free/png-256/netflix-282224.png"
        header.append(netflixLogo)
        // logoClick(netflixLogo)
    }
        
    if (userHash.hulu === true) {
        const huluLogo = document.createElement('img')
        huluLogo.dataset.id = 2
        huluLogo.src ="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/bk8cux6dapq8qjzylfaj"
        header.append(huluLogo)
        // logoClick(huluLogo)
       
    }
    if (userHash.hbo === true) {
        const hboLogo = document.createElement('img')
        hboLogo.dataset.id = 3
        hboLogo.src ="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/lr6ntovb8hu36yqscb2c"
        header.append(hboLogo)
        // logoClick(hboLogo)
    }

    if (userHash.disney === true) {
        const disneyLogo = document.createElement('img')
        disneyLogo.dataset.id = 4
        disneyLogo.src ="https://developer.asustor.com/uploadIcons/0020_999_1591957052_app_icon_Disney_plus_256.png"
        header.append(disneyLogo)
        // logoClick(disneyLogo)
      
    }
    if (userHash.amazon === true) {
        const amazonLogo = document.createElement('img')
        amazonLogo.dataset.id = 5
        amazonLogo.src ="https://apprecs.org/ios/images/app-icons/256/e5/545519333.jpg"
        header.append(amazonLogo)
        // logoClick(amazonLogo)   
    }
    })
}

// Pushes UserMovies into myMovies(GV)
function accessMyMovies(){
    fetch('http://localhost:3000/user_movies')
    .then(response => response.json())
    .then(userMovies => {
        userMovies.forEach(userMovie => {
            if(userMovie.user_id === profileId){
              myMovies.push(userMovie)
            }
        })
    })
}

// Creates a div for each film
function renderMyMovies(movieArray){
    myMovieDiv.innerHTML = ""
    movieArray.forEach(film =>{
        const filmDiv = document.createElement('div')
        filmDiv.dataset.id = film.movie.id
        filmDiv.classList.add('filmcard')
        filmDiv.innerHTML =`<h2> ${film.movie.title} </h2>
        <h3> Year Released: ${film.movie.year} </h3>
        <img src ="${film.movie.image}">
        <p class= "likes"> ${film.movie.likes}</p>
        <button class="like-btn">❤️</button>
        <p class= "dislikes"> ${film.movie.dislikes}</p>
        <button class= "dislike-btn">👎🏾</button>
        <button data-id= "${film.id}" class= "delete-btn">✖️</button>`
        myMovieDiv.append(filmDiv)  
    })
}

// Updates myMovies(GV) to show new likes
function changeMyMoviesLikes(movie, value) {
    for (const i in myMovies) {
        if (myMovies[i].movie.title == movie.title) {
            myMovies[i].movie.likes = value
            break;
        }
    }
}

// Updates myMovies(GV) to show new dislikes
function changeMyMoviesDislikes(movie, value) {
    for (const i in myMovies) {
        if (myMovies[i].movie.title == movie.title) {
            myMovies[i].movie.dislikes = value
            break;
        }
    }
}

// Updates myMovies(GV) to remove UserMovie object
function changeMyMoviesDelete(movie) {
    for (const i in myMovies) {
        if (myMovies[i].id == movie.id) {
            myMovies.splice(i, 1)
            break;
        }
    }
}

/********** Event Listeners **********/

// click to load my stream movies
header.addEventListener('click', event => {
    myMovieDiv.innerHTML = ""
    if(event.target.dataset.id == 1) {
        const netflixMovies = myMovies.filter(userMovie => userMovie.movie.netflix)
        renderMyMovies(netflixMovies)
        }
    else if(event.target.dataset.id == 2) {
        const huluMovies = myMovies.filter(userMovie => userMovie.movie.hulu)
        renderMyMovies(huluMovies) 
        }
    else if(event.target.dataset.id == 3) {
        const hboMovies = myMovies.filter(userMovie => userMovie.movie.hbo)
        renderMyMovies(hboMovies) 
        }
    else if(event.target.dataset.id == 4) {
        const disneyMovies = myMovies.filter(userMovie => userMovie.movie.disney)
        renderMyMovies(disneyMovies) 
        }
    else if(event.target.dataset.id == 5) {
        const amazonMovies = myMovies.filter(userMovie => userMovie.movie.amazon)
        renderMyMovies(amazonMovies) 
        }
})

// search more from our database
searchForm.addEventListener('input', event => {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(event.target.value.toLowerCase()))
    renderMovies(filteredMovies)
})

// click to add move to watch list, like, dislike, and delete the movie from list
myMovieDiv.addEventListener('click', event => {
    event.preventDefault()
    const currentMovie = event.target.closest('div')
    if(event.target.className === "addBtn") {
        const addMovieObject = {
            user_id: profileId,
            movie_id: currentMovie.dataset.id
        }
        fetch('http://localhost:3000/user_movies', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(addMovieObject),
        })
        .then(response => response.json())
        .then(movieObject => {myMovies.push(movieObject)
            alert("Your movie has been added.")
            currentMovie.remove()
        })
    }
    else if(event.target.className === "like-btn") {
        const currentLikes = currentMovie.querySelector('p.likes')
        const updateLikes = parseInt(currentLikes.innerText) + 1
        fetch(`http://localhost:3000/movies/${currentMovie.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({likes: updateLikes}),
        })
        .then(response => response.json())
        .then(updateMovieLikes => {
            currentLikes.textContent = updateMovieLikes.likes
            changeMyMoviesLikes(updateMovieLikes, updateMovieLikes.likes)
        })
    }
    else if(event.target.className === "dislike-btn") {
        const currentDislikes = currentMovie.querySelector('p.dislikes')
        const updateDislikes = parseInt(currentDislikes.innerText) + 1
        fetch(`http://localhost:3000/movies/${currentMovie.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({dislikes: updateDislikes}),
        })
        .then(response => response.json())
        .then(updateMovieDislikes => {
            currentDislikes.textContent = updateMovieDislikes.dislikes
            changeMyMoviesDislikes(updateMovieDislikes, updateMovieDislikes.dislikes)
        })
    }
    else if(event.target.className === "delete-btn") {
        const deleteId = currentMovie.querySelector('.delete-btn')
        console.log(deleteId)
        const deleteMovie = parseInt(deleteId.dataset.id)
        fetch(`http://localhost:3000/user_movies/${deleteMovie}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(deletedMovie => {
            alert("This movie has been removed from your list.")
            currentMovie.remove()
            changeMyMoviesDelete(deletedMovie)

        })
    }
})

/********** Calling Functions **********/

renderMyProfile()
getAllMovies()

document.addEventListener('DOMContentLoaded', () => {
    accessMyMovies()
    renderMyMovies(myMovies)
})