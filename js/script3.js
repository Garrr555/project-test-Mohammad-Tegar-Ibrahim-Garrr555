// $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=dca61bcc&s=avengers',
//     succes: result =>{
//         const movies = result.Search;
//         let card = '';
//         movies.forEach(m =>{
//             card += `<div class="col-md-4 my-5">
//                         <div class="card" style="width: 18rem;">
//                             <img src="..." class="card-img-top" alt="...">
//                             <div class="card-body">
//                             <h5 class="card-title">Card title</h5>
//                             <p class="card-text" style="color: black;">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                             </div>
//                         </div>
//                     </div>`;
//         })
//         $('.movie-container').html(card)
//     },
//     error: (e) =>{
//         console.log(e.responseText)
//     }
// })

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(){                  //memaikai function karena membutuhkan this, kalau menggunakan arrow function tidak ada this
    
    const inputKeyword = document.querySelector('.input-keyword')
    fetch('http://www.omdbapi.com/?apikey=c07affd5&s=' + 'avengers')
    .then(response => response.json())
    .then(response => {
        const movie = response.Search
        let cards = ''
        movie.forEach(m => cards += showCard(m))     //Menggunakan forEach unutk perulangan

        const movieContainer = document.querySelector('.movie-container')
        movieContainer.innerHTML = cards

        //Ketika Tombol detail di klik
        const modalDetailButton = document.querySelectorAll('.modal-detail-button')
        modalDetailButton.forEach(tombol => {                   //Menggunakan foreach karena tombol detail sangat banyak dan membutuhkan perulangan
            tombol.addEventListener('click', function(){
                const imdbid = this.dataset.imdbid;             //menggunakan dataset untuk mendapatkan id nya
                fetch('http://www.omdbapi.com/?apikey=c07affd5&i=' + imdbid)
                .then(response => response.json())
                .then(m => {
                    const movieDetail = showMovieDetail(m)
                    const modalBody = document.querySelector('.modal-body')
                    modalBody.innerHTML = movieDetail

                })
            })
        })
    })
})


function showCard(m){
    return `<div class="col-md-4 my-5" style="padding: 10px">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"></a>
                    </div>
                </div>
            </div>`
}

function showMovieDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} (${m.Year})</h4>
                                <h6>${m.Rated}</h6>
                            </li>
                            <li class="list-group-item"><strong>Released : </strong> ${m.Released}</li>
                            <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actor    : </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer   : </strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot     : </strong> ${m.Plot}</li>
                            <li class="list-group-item"><strong>Genre    : </strong> ${m.Genre}</li>
                            <li class="list-group-item"><strong>Time     : </strong> ${m.Runtime}</li>
                            <li class="list-group-item"><strong>Score     : </strong> ${m.Metascore}</li>
                            <li class="list-group-item"><strong>Tipe     : </strong> ${m.Type}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}