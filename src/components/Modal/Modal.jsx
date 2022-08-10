import { ModalBack, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose, largImage }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <ModalBack onClick={handleBackdropClick}>
      <ModalContent>
        <img width={700} src={largImage} alt="" />
      </ModalContent>
    </ModalBack>,
    modalRoot
  );
}

Modal.propTypes = {
  largImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
