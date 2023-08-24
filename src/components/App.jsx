import { useState, useEffect,  } from 'react';

import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import apiService from 'services/imagesAPI';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setlargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      try {
        const request = await apiService(query, page);

        if (request.length === 0) {
          return setError(`No photo '${query}' `);
        }

        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Something went wrong. Try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const serchImages = newSearch  => {
    if (query === newSearch) {
      return toast.error('We already found images. Please, enter another phrase.'); 
    } else {
      setQuery(newSearch);
      setImages([]);
      setPage(1);
      setError(null);
      setIsLoading(true);
    }
   
    
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = e => {
    setlargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy(0, window.innerHeight + 150);
    }, 1000);
  };

  return (
    <>
      <Container>
        <Searchbar onHandleSubmit={serchImages} />

        {error && <ErrorMsg texterror={error} />}

        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={onOpenModal} />
        )}

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && <Button onLoadMore={onLoadMore} />}

        {showModal && (
          <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
        )}

        <ToastContainer autoClose={5000} />
      </Container>
    </>
  );
}
