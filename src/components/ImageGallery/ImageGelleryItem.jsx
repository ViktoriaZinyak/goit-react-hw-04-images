import { useState } from 'react';
import css from './ImageGallery.module.css';
import Modal from './Modal';

const ImageGalleryItem = ({
  picture: { webformatURL, tags, largeImageURL },
}) => {
  const [modalShow, setModalShow] = useState();

  const toggleModal = () => {
    setModalShow(prevState => !prevState);
  };

  const onCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
          className={css.ImageGalleryItem__image}
        />
      </li>
      {modalShow && <Modal largeImg={largeImageURL} onClose={onCloseModal} />}
    </>
  );
};

export default ImageGalleryItem;
