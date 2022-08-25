import {fetchPictures} from './fetchImg'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInput = document.querySelector('#search-form')
const listGallery = document.querySelector('.gallery')


searchInput.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()
    const searchImg = e.target.searchQuery.value
    // const elements = e.currentTarget.elements;
    // const searchImg = elements.searchQuery.value;
  
  
  

  fetchPictures(searchImg)
    .then(images => {

      if (images.total === 0) {
        
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      }
      renderGallery(images)
      console.log(images)
      
  })
    
}

function renderGallery(images) {
  const imageCard = images.hits
  const marcupImg = imageCard.map(image => 
    `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div>`)
    .join('')
  listGallery.innerHTML = marcupImg;
}


// function fetchPictures(img) {
//     API_KEY = '29487133-26ae31273c20ec953386c6e64'
//     const url = 'https://pixabay.com/api/'

//     return fetch(`${url}?key=${API_KEY}&${img}&image_type=photo&orientation=horizontal&safesearch=true`)
//     .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         });
// }

// function renderGallery({largeImageURL, tags, likes, views, comments, downloads}) {
//    `<div class="photo-card">
//   <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`
  
//   // listGallery.innerHTML = imageCard;
  
// }



// {largeImageURL, tags, likes, views, comments, downloads}
// largeImageURL, tags, likes, views, comments, downloads)
// {/* <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`