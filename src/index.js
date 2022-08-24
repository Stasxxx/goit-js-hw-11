const searchInput = document.querySelector('#search-form')



searchInput.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()
    const searchImg = e.target.searchQuery.value
    // const elements = e.currentTarget.elements;
    // const searchImg = elements.searchQuery.value;
    console.log(searchImg)
    fetchPictures(searchImg)
    
}


function fetchPictures(img) {
    API_KEY = '29487133-26ae31273c20ec953386c6e64'
    const url = 'https://pixabay.com/api/'

    return fetch(`${url}?key=${API_KEY}&${img}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

function renderGallery(images) {
const imageCard = images.map({webformatURL,largeImageURL,tags,likes,views,comments,downloads})
    `<div class="photo-card">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
}