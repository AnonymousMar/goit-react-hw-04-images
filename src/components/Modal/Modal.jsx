import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ picture, closeModal }) {
    useEffect(() => {
        window.addEventListener('keydown', closePictureByEscape);
        return () => {
            window.removeEventListener('keydown', closePictureByEscape);
        };
    });

    const closePicture = e => {
        if (e.target === e.currentTarget) {
            closeModal(false);
        }
    };

    const closePictureByEscape = e => {
        if (e.code === 'Escape') {
            closeModal(false);
        }
    };

    return (
        <div className={css.Overlay} onClick={e => closePicture(e)}>
            <div className={css.Modal}>
                <img id={picture.id} src={picture.largeImageURL} alt={picture.tags} />
            </div>
        </div>
    );
}

Modal.propTypes = {
    picture: PropTypes.object,
    closeModal: PropTypes.func,
};