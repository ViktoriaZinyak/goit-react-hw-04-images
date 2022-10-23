import { Component } from 'react';
import css from './ImageGallery.module.css';
import Modal from './Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalShow: false,
  };

  toggleModal = () => {
    this.setState(({ modalShow }) => ({
      modalShow: !modalShow,
    }));
  };

  onCloseModal = () => {
    this.setState({ modalShow: false });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.picture;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
            className={css.ImageGalleryItem__image}
          />
        </li>
        {this.state.modalShow && (
          <Modal largeImg={largeImageURL} onClose={this.onCloseModal} />
        )}
      </>
    );
  }
}
