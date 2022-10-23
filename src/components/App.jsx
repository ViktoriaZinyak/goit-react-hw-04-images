import { Component } from 'react';
import { Vortex } from 'react-loader-spinner';
import css from './App.module.css';
import PixabayApi from 'components/service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

const pixabayApi = new PixabayApi();

export class App extends Component {
  state = {
    searchRequest: '',
    page: 1,
    pictures: [],
    loading: false,
    loadMore: false,
  };

  handleSearchRequest = value => {
    this.setState(prevState => ({
      page: 1,
      searchRequest: value,
      pictures: [],
      loading: !prevState.loading,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchRequest, page } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      pixabayApi.query = searchRequest;
      prevState.page !== page
        ? (pixabayApi.appPage = page)
        : pixabayApi.resetPage();
      try {
        const data = await pixabayApi.fetchPhotos();
        this.setState(({ pictures }) => ({
          pictures: [...pictures, ...data.hits],
          loading: false,
          loadMore: true,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      loading: true,
      loadMore: false,
    }));
  };

  render() {
    const { loading, pictures, loadMore } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchRequest} />
        {loading && (
          <Vortex
            visible={true}
            height="40"
            width="40"
            ariaLabel="vortex-loading"
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        )}
        <ImageGallery pictures={pictures} />
        {loadMore && pictures.length > 0 && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}
