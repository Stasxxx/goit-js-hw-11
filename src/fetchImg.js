export function fetchPictures(img) {
    API_KEY = '29487133-26ae31273c20ec953386c6e64';
    const url = 'https://pixabay.com/api/';
    
    return fetch(`${url}?key=${API_KEY}&q=${img}&image_type=photo&page=1&per_page=40&orientation=horizontal&safesearch=true`)
    .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}