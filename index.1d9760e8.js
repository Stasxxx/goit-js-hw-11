document.querySelector("#search-form").addEventListener("submit",(function(e){e.preventDefault();const t=e.target.searchQuery.value;console.log(t),function(e){API_KEY="29487133-26ae31273c20ec953386c6e64";fetch(`https://pixabay.com/api/?key=${API_KEY}&${e}&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}(t)}));
//# sourceMappingURL=index.1d9760e8.js.map