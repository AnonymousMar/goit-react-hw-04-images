import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onHandleSubmit }) {
    const [query, setQuery] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            return toast.error('Enter something!');
        }

        onHandleSubmit(query);
        setQuery('');
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={onSubmit}>
                <button type="submit" className={css.button}>
                    <span className={css.label}>Search</span>
                </button>
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    placeholder="Search images and photos"
                    value={query}
                    autoFocus
                    onChange={({ target }) => setQuery(target.value)}
                />
            </form>
        </header>
    );
}


Searchbar.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
};