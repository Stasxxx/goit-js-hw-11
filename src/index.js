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
  
  
  gallery.refresh()
  
}

function handleLoadMoreClick(e) {
  
  // fetchPictures.incrementPage()
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


// console.log(totalHits)
// function onFormSubmit(e) {
//     e.preventDefault()
    
//   if (searchImg === e.target.searchQuery.value) return;
//   searchImg = e.target.searchQuery.value;
//   listGallery.innerHTML = '';
//   currentPage = 1;
//   totalHits = 0;
//   fetchPictures()
   
// }

// async function fetchPictures() {
//     API_KEY = '29487133-26ae31273c20ec953386c6e64';
  
//   try { 
//   await axios
//     .get(`/?key=${API_KEY}&q=${searchImg}&image_type=photo&page=${currentPage}&per_page=40&orientation=horizontal&safesearch=true`)
//     .then(images => {
      
//     if (images.data.total === 0) {
//       return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     };

//       const total = images.data.totalHits
      
//     if (isLoading) {
//         Notify.success(`Hooray! We found ${total} images.`);
//         isLoading = false;
//       }
      
//     let totalPages = images.data.hits.length;
//     totalHits += totalPages;
      
//     if (totalHits === images.data.totalHits) {
//         loadMore.classList.add('is-hidden')
//         Notify.info("We're sorry, but you've reached the end of search results.")
//     };
//       renderGallery(images);
//       gallery.refresh()
//     })   
//   } catch (error) {
//     console.log(error)
//   }
  
// }


// function fetchPictures() {
//     API_KEY = '29487133-26ae31273c20ec953386c6e64';
    
//   axios
//     .get(`/?key=${API_KEY}&q=${searchImg}&image_type=photo&page=${currentPage}&per_page=40&orientation=horizontal&safesearch=true`)
//     .then(images => {
      
//     if (images.data.total === 0) {
//       return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     };

//       const total = images.data.totalHits
      
//     if (isLoading) {
//         Notify.success(`Hooray! We found ${total} images.`);
//         isLoading = false;
//       }
      
//     let totalPages = images.data.hits.length;
//     totalHits += totalPages;
      
//     if (totalHits === images.data.totalHits) {
//         loadMore.classList.add('is-hidden')
//         Notify.info("We're sorry, but you've reached the end of search results.")
//     };
//       renderGallery(images);
//       gallery.refresh()
//   })   
// }

// function renderGallery(images) {
//   const imageCard = images.data.hits
//   const marcupImg = imageCard.map(image => 
//     `<div class="photo-card">
//       <a class="photo-card" href="${image.largeImageURL}">
//        <img class="photo-img"src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//       </a>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b>
//           ${image.likes}
//         </p>
//         <p class="info-item">
//           <b>Views</b>
//           ${image.views}
//         </p>
//         <p class="info-item">
//           <b>Comments</b>
//           ${image.comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads</b>
//           ${image.downloads}
//         </p>
//       </div>
//     </div>`)
//     .join('')
//   listGallery.innerHTML = marcupImg;
// }


// function handleLoadMoreClick(e) {
//   currentPage += 1
  
//   fetchPictures()
// }




