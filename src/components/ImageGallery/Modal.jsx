import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handkeKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handkeKeydown);
  }

  handkeKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img className={css.ModalImg} src={this.props.largeImg} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
