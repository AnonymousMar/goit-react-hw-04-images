import PropTypes from 'prop-types';
import React from 'react';
import css from './Button.module.css';

export default function Button({ onLoadMore }) {
    return (
        <div className={css.buttonContainer}>
            <button type="button" className={css.Button} onClick={onLoadMore}>
                Load more
            </button>
        </div>
    );
}



Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};