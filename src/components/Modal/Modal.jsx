import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ largeImageURL, onToggleModal }) {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onToggleModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onToggleModal]);

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onToggleModal();
        }
    };

    return createPortal(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt="" />
            </div>
        </div>,
        document.querySelector('#modalPortal'),
    );
}


Modal.propTypes = {
    onToggleModal: PropTypes.func.isRequired,
};