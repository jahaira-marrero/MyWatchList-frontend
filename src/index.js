const header = document.querySelector('header')
const profileId = 2
const headerName = header.querySelector('h1')
const myMovieDiv = document.querySelector('div#movie-card-collection')
let netflixLogo = document.createElement('img')
let huluLogo = document.createElement('img')
let hboLogo = document.createElement('img')
let disneyLogo = document.createElement('img')
let amazonLogo = document.createElement('img')

    function renderProfile(profileId) {
        fetch(`http://localhost:3000/users/${profileId}`)
        .then(response => response.json())
        .then(userHash => {
            headerName.innerText = `Profile: ${userHash.username}`
    
            if (userHash.netflix == true) {
                netflixLogo.dataset.id = 1
                netflixLogo.src = "https://cdn.iconscout.com/icon/free/png-256/netflix-282224.png"
                header.append(netflixLogo)
                // logoClick(netflixLogo)
            }
                
            if (userHash.hulu == true) {
                huluLogo.dataset.id = 2
                huluLogo.src ="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/bk8cux6dapq8qjzylfaj"
                header.append(huluLogo)
                // logoClick(huluLogo)
               
            }
            if (userHash.hbo == true) {
                hboLogo.dataset.id = 3
                hboLogo.src ="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/lr6ntovb8hu36yqscb2c"
                header.append(hboLogo)
                // logoClick(hboLogo)
            }

            if (userHash.disney == true) {
                disneyLogo.dataset.id = 4
                disneyLogo.src ="https://developer.asustor.com/uploadIcons/0020_999_1591957052_app_icon_Disney_plus_256.png"
                header.append(disneyLogo)
                // logoClick(disneyLogo)
              
            }
            if (userHash.amazon == true) {
                amazonLogo.dataset.id = 5
                amazonLogo.src ="https://apprecs.org/ios/images/app-icons/256/e5/545519333.jpg"
                header.append(amazonLogo)
                // logoClick(amazonLogo)
                
            }
            
            // userHash.user_movies.forEach(userMovie => { 
            //     if (userMovie.movie.netflix == true ) {
            //     console.log(userMovie.movie.title)
            // }})
        }
    )
}
    


    renderProfile(profileId)
    // console.log('DOM fully loaded and parsed');

const ul = document.querySelector('ul')




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

// External LikeClick
// function likeClick(likeButton) {
//     likeButton.addEventListener('click', event => {
//     console.log(event.target.dataset.id)
//     // fetch(`http://localhost:3000/movies/${event.target.dataset.id}`)
//     })
// }

// function logoClick(logo) {
//     logo.addEventListener('click', event => {
//         myMovieDiv.innerHTML = ""
//         fetch('http://localhost:3000/user_movies')
//         .then(response => response.json())
//         .then(userMoviesArray => {
//             userMoviesArray.map(userMovie => {
//                 if(userMovie.user_id === profileId) {
//                     return 
//                 }
//             })
//         }) 
            
//     })
// }
// .addEventListener('click', event => {
//     event.preventDefault()
//     // console.log(event.target)
//     myMovieDiv.innerHTML = ""
//     userHash.user_movies.forEach(userMovie => {
//         if (userMovie.movie.hulu == true) {
//             const huluDiv = document.createElement('div')
//             huluDiv.classList.add('hulucard')
//             huluDiv.innerHTML =`<h2> ${userMovie.movie.title} </h2>
//             <h3> Year Released: ${userMovie.movie.year} </h3>
//             <img src ="${userMovie.movie.image}">
//             <p> Likes: ${userMovie.movie.likes}</p>
//             <p> Dislikes: ${userMovie.movie.dislikes}</p>
//             `
//             myMovieDiv.append(huluDiv)
//         }
//     })

// })

function renderMyNetflix()

// renderMovies()

