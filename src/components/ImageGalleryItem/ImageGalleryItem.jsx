import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
    id,
    tags,
    webformatURL,
    largeImageURL,
    openModal,
}) {
    return (
        <li id={id} className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
                onClick={() => openModal(id, largeImageURL, tags)}
            />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    openModal: PropTypes.func,
};