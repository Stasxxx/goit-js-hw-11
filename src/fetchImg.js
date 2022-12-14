import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29487133-26ae31273c20ec953386c6e64';
export default class FetchPictures{
    constructor() {
        this.searchImg = '';
        this.currentPage = 1;
    }
    
    async fetchGallery() {
        
       const respons = await axios.get(`/?key=${API_KEY}&q=${this.searchImg}&image_type=photo&page=${this.currentPage}&per_page=40&orientation=horizontal&safesearch=true`)
            // .then(({data}) => {
               await this.incrementPage()
                // console.log(images.data)
                return respons.data;
            // })  
        // .catch ((error) => {
        //     console.log(error)
        // })
    }

    async incrementPage() {
    this.currentPage += 1;
    }
    
    async resetPage() {
    this.currentPage = 1;
    }
    
    get img() {
        return this.searchImg;
    }

    set img(newImg) {
        this.searchImg = newImg
    }
}
// API_KEY = '29487133-26ae31273c20ec953386c6e64';
        // axios.defaults.baseURL = 'https://pixabay.com/api/';