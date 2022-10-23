import axios from 'axios';
const KEY = '29652789-9575d4159aae8e630a1d59f50';

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const api = axios.create({
        baseURL: 'https://pixabay.com/api/',
      });
      const resposne = await api.get(
        `?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.page}`
      );
      const newObj = await resposne.data;
      return newObj;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  set appPage(newPage) {
    this.page = newPage;
  }
}
