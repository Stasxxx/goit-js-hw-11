export default function renderGallery(images) {
  const imageCard = images.hits
  const marcupImg = imageCard.map(image => 
    `<div class="photo-card">
      <a class="photo-card" href="${image.largeImageURL}">
       <img class="photo-img"src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
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
  return marcupImg;
}