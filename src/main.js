let result;



// experimental =====================================
let tipoFilme = "undefined";

function processClick() { 
	tipoFilme = this.id;
	b_click(tipoFilme)
}
document.querySelectorAll('.main_button').forEach(mybutton => {
	mybutton.addEventListener('click', processClick);
});
// experimental =====================================
function b_click(id){
	document.querySelectorAll('.main_button_selected').forEach(mybutton => {
		mybutton.classList.remove('main_button_selected');
	})
	document.getElementById(id).classList.add('main_button_selected')
}



const displayResults = (data) => {
	const resultArea = document.querySelector('.results-area');

	resultArea.innerHTML = ``;

	if (data.Response === "False"){
		resultArea.innerHTML = `
			<div>
				<h2>Não foi encontrado.</h2>
			</div>
		`
	}
	
	if (data.Search != undefined){
		// console.log(data)
		// console.log(data.Search)
		data.Search.map((value) => {
			const resultItem = document.createElement('div');
			resultItem.classList.add('results-item');
			// resultItem.innerHTML = `
				// <img title="${value.Title}" src="${value.Poster}" alt="${value.Title}">
				// <h3 class="movie-title">
					// <a target="_blank" href="https://imdb.com/title/${value.imdbID}">${value.Title}</a>
				// </h3>
				// <p>${value.Year}</p>
			// `
			
			// ==============================================byNamebyName
			byName(value.imdbID, tipoFilme)
				.then(e => {
					if (e != 'none'){
						resultItem.innerHTML = e
						resultArea.appendChild(resultItem);
					}
				});
			// ==============================================byNamebyName
		});
	}
};

const search = async (value, type) => {
	fetch(`http://www.omdbapi.com/?apikey=53c239db&type=${type}&s=${value}`)
		.then(response => response.json())
		.then(data => {
			result = data;
			displayResults(data);
		})
}






// experimental ===================
const byName = async (id, genre=tipoFilme) => {

	const genero = genre

	let detalhes = await fetch(`http://www.omdbapi.com/?apikey=53c239db&i=${id}`)
		.then(response => response.json())
		.then(detailMovie => {
			return DATA = {
				Genre: detailMovie.Genre,
				Title: detailMovie.Title,
				imdbID: detailMovie.imdbID,
				Country:   detailMovie.Country,
				Poster: detailMovie.Poster,
				Year:    detailMovie.Year
			}
		})

	if (genero == "undefined" ){
		return res = `
				<img title="${detalhes.Title}" src="${detalhes.Poster}" alt="${detalhes.Title}">
				<h3 class="movie-title">
					<a target="_blank" href="https://imdb.com/title/${detalhes.imdbID}">${detalhes.Title}</a>
				</h3>
				<p>${detalhes.Year}</p>
			`
	}
	else if (detalhes.Genre.includes(genero)){
		return res = `
				<img title="${detalhes.Title}" src="${detalhes.Poster}" alt="${detalhes.Title}">
				<h3 class="movie-title">
					<a target="_blank" href="https://imdb.com/title/${detalhes.imdbID}">${detalhes.Title}</a>
				</h3>
				<p>${detalhes.Year}</p>
				<p>${detalhes.Genre}<//p>
			`
	}
	else {
		return 'none'
	}

}
// experimental ===================






// quando iniciar a tela
window.onload = () => {
	const SEARCH_SELECT = document.querySelector('.search-select')
	const SEARCH_INPUT = document.querySelector('.search-input')
	SEARCH_INPUT.addEventListener('input', (e) => {
		console.log(`${SEARCH_INPUT.value}, ${SEARCH_SELECT.value}`);
		let searchValue = SEARCH_INPUT.value;
		let searchType  = SEARCH_SELECT.value;

		if (searchValue.length > 3){
			search(searchValue, searchType);
		}
	})
};


