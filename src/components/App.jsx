import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import fetchPicturesApi  from 'services/imagesAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function App() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(null);
 // const [Mount, setMount] = useState(true);

  useEffect(() => {
  //  if (Mount) {
     // setMount(false);
     // return;
  //  }
    fetchPicturesApi(name, page)
      .then(pictures => {
        if (pictures.total === 0) {
          setError(`We don't have picture: ${name}`);
          setStatus('rejected');
        } else {
          setPictures(prevState => [...prevState, ...pictures.hits]);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [name, page]);

  const formSubmit = name => {
  //  setName(name);
   // setPictures([]);
  //  setPage(1);
  //  setStatus('pending');
    if (useState.name === name) {
      Notify.failure('We already found images. Please, enter another phrase.');

    }
    else {
      setName(name);
      setPictures([]);
      setPage(1);
      setStatus('pending');
    };
  };
  

  const openModal = (id, largeImageURL, tags) => {
    setShowModal(true);
    setCurrentPicture({ id, largeImageURL, tags });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <>
          <ImageGallery>
            {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                openModal={openModal}
              />
            ))}
          </ImageGallery>
          <Button loadMore={setPage} />
        </>
      )}
      {showModal && (
        <Modal picture={currentPicture} closeModal={setShowModal} />
      )}
      {status === 'rejected' && <h1>{error}</h1>}
    </div>
  );
}