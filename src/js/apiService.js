const BASE_FETCH_URL = 'https://pixabay.com/api?';
const API_KEY = '23313503-fe93316d6899b77e3854f09dc';

export default class ApiService {
  constructor() {
    this.searchQueary = '';
    this.page = 1;
  }

  fetchGetImages() {
    const url = `${BASE_FETCH_URL}key=${API_KEY}&q=${this.searchQueary}&page=${this.page}&per_page=12&image_type=photo`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQueary;
  }

  set query(newQuery) {
    this.searchQueary = newQuery;
  }
}
