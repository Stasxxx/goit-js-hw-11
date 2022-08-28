import FetchPictures from './fetchImg'
import renderGallery from './renderGallery';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const searchInput = document.querySelector('#search-form')
const listGallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')

let isLoading = true;
const fetchPictures = new FetchPictures()

searchInput.addEventListener('submit', onFormSubmit)
loadMore.addEventListener('click', handleLoadMoreClick)

let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: "alt",
   
});


function onFormSubmit(e) {
  e.preventDefault()
  isLoading = true
if (fetchPictures.img === e.target.searchQuery.value) return;
  
  fetchPictures.img = e.target.searchQuery.value
  
  
  fetchPictures.resetPage()
  
  fetchPictures.fetchGallery()
    .then(data => {
      if (data.total === 0) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      };
      loadMore.classList.remove('is-hidden')
      clearImgContainer()
      marcupImg(data)

      if (isLoading) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        isLoading = false;
      }
    })
  
  
}

function handleLoadMoreClick(e) {
  
  fetchPictures.fetchGallery()
    .then(data => {
      console.log(data)
      if (data.hits.length === 0) {
        loadMore.classList.add('is-hidden')
        Notify.info("We're sorry, but you've reached the end of search results.")
      };
      marcupImg(data);
    })
}

function marcupImg(data) {
  listGallery.innerHTML = renderGallery(data);
  gallery.refresh()
}

function clearImgContainer() {
  listGallery.innerHTML = '';
}


