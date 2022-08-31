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


async function onFormSubmit(e) {
  e.preventDefault()
  isLoading = true
  fetchPictures.img = e.target.searchQuery.value.trim();

  if (fetchPictures.img === e.target.searchQuery.value || fetchPictures.img === '') return;
  
  
    
  await fetchPictures.resetPage()
  const images = await fetchPictures.fetchGallery()
  // await fetchPictures.fetchGallery()
    // .then(data => {
  if (images.total === 0) {
        clearImgContainer()
      loadMore.classList.add('is-hidden')
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      };
      loadMore.classList.remove('is-hidden')
      clearImgContainer()
      marcupImg(images)

      if (isLoading) {
        Notify.success(`Hooray! We found ${images.totalHits} images.`);
        isLoading = false;
      }
    // })
  
}

async function handleLoadMoreClick(e) {
  
  // await fetchPictures.fetchGallery()
  const images = await fetchPictures.fetchGallery()
     
    // .then(data => {
      // console.log(data)
      if (images.hits.length < 40) {
        loadMore.classList.add('is-hidden')
        Notify.info("We're sorry, but you've reached the end of search results.")
      };
      marcupImg(images);
    // })
  
}

function marcupImg(data) {
  listGallery.innerHTML = renderGallery(data);
  gallery.refresh()
}

function clearImgContainer() {
  listGallery.innerHTML = '';
}
