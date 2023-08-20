import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
    const [searchName, setSearchName] = useState('');

    const searchbarFormSubmit = e => {
        e.preventDefault();
        onSubmit(searchName);
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={searchbarFormSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={css.SearchFormInput}
                    type="text"
                    value={searchName}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={e => setSearchName(e.target.value)}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};