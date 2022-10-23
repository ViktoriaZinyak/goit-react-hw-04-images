import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGelleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem key={picture.id} picture={picture} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.objectOf({
        id: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default ImageGallery;
