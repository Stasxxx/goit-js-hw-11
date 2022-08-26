// import { fetchPictures } from './fetchImg'
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchInput = document.querySelector('#search-form')
const listGallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')

let isLoading = true;
let currentPage = 1;
let searchImg = '';
let totalHits = 0;


searchInput.addEventListener('submit', onFormSubmit)
loadMore.addEventListener('click', handleLoadMoreClick)


// console.log(totalHits)
function onFormSubmit(e) {
    e.preventDefault()
    
  if (searchImg === e.target.searchQuery.value) return;
  searchImg = e.target.searchQuery.value;
  listGallery.innerHTML = '';
  currentPage = 1;
  totalHits = 0;
  fetchPictures()

  loadMore.classList.remove('is-hidden')
}


function fetchPictures() {
    API_KEY = '29487133-26ae31273c20ec953386c6e64';
    // isLoading = true;
  axios
    .get(`/?key=${API_KEY}&q=${searchImg}&image_type=photo&page=${currentPage}&per_page=40&orientation=horizontal&safesearch=true`)
    .then(images => {
      // console.log(images.data)
      // console.log(images.data.totalHits)
    if (images.data.total === 0) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };

      const total = images.data.totalHits
      let totalPages = images.data.hits.length;
      totalHits += totalPages;
      if (isLoading) {
        Notify.success(`Hooray! We found ${total} images.`);
        isLoading = false;
    }
      

      if (totalHits === images.data.totalHits) {
        loadMore.classList.add('is-hidden')
        Notify.info("We're sorry, but you've reached the end of search results.")
      };
      renderGallery(images)
  })
    // .then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         return response.json();
    //     })
}

function renderGallery(images) {
  const imageCard = images.data.hits
  const marcupImg = imageCard.map(image => 
    `<div class="photo-card">
  <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${image.downloads}
    </p>
  </div>
</div>`)
    .join('')
  listGallery.innerHTML = marcupImg;
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: "alt",
    close: true,

});

gallery.refresh()

function handleLoadMoreClick(e) {
  currentPage += 1
  
  fetchPictures()
}




