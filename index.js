const accessKey = `JU12J8HnonzDXc4Pome67PRyvSgk2SFas_brsvOcPPE`;

//import all the important elements from inside index to script
const formElement = document.querySelector('form');
const inputElement = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData = ""; //stores all key words user types into form
let page = 1; //page number

async function searchImages(){ //use aysnc bc using response and fetch 
    inputData = inputElement.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result)=>{ //this creates template as the search result
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++; //increase page number
    if (page > 1){
        showMore.style.display = "block";
    }
};

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages() //this is done so that the show more button display more images 
});

showMore.addEventListener("click", (event)=>{
    searchImages() //this is done so that the show more button display more images 
});