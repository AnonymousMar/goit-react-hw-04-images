import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
    webformatURL,
    largeImageURL,
    tags,
    onOpenModal,
}) {
    return (
        <li className={css.ImageGalleryItem}>
            <img
                src={webformatURL}
                alt={tags}
                data-source={largeImageURL}
                className={css.image}
                onClick={onOpenModal}
            />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
};