import { useEffect, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import css from './App.module.css';
import PixabayApi from 'components/service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';

const pixabayApi = new PixabayApi();

const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const handleSearchRequest = value => {
    setSearchRequest(value);
    setPage(1);
    setPictures([]);
    setLoading(prevState => !prevState);
  };

  useEffect(() => {
    if (searchRequest !== '') {
      pixabayApi.query = searchRequest;
      pixabayApi.appPage = page;
      async function getPictures() {
        try {
          const data = await pixabayApi.fetchPhotos();
          setPictures(prevPictures => [...prevPictures, ...data.hits]);
          setLoading(false);
          setLoadMore(true);
        } catch (error) {
          console.error(error);
        }
      }
      console.log('second');
      getPictures();
    }
    console.log('first');
  }, [searchRequest, page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
    setLoadMore(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchRequest} />
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
      {loadMore && pictures.length > 0 && <Button onClick={onLoadMore} />}
    </div>
  );
};

export default App;
