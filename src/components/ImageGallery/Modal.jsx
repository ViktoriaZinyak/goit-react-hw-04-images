import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handkeKeydown);
    return () => {
      window.removeEventListener('keydown', handkeKeydown);
    };
  });

  const handkeKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img className={css.ModalImg} src={largeImg} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
