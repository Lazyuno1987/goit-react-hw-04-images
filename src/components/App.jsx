// 28074243-fd9335165c63977f864a46342
// import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { mapperImages } from '../Helpers/mappers';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

Axios.defaults.baseURL = 'https://pixabay.com/api';

export default function App() {
  const [nameInput, setNameInput] = useState('');
  const [articles, setArticles] = useState([]);

  const [largImg, setLargImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  function resetPage() {
    setPage(1);
  }

  const toggleModal = largeImage => {
    setLargImg(largeImage);
    setShowModal(prevState => !prevState);
  };

  const onClose = () => {
    setLargImg('');
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (nameInput === '') {
      return;
    }
    async function fetchArt() {
      setStatus('pending');
      try {
        const response = await Axios.get(
          `/?q=${nameInput}&page=${page}&key=28074243-fd9335165c63977f864a46342&image_type=photo&orientation=horizontal&per_page=12`
        );
      
        setArticles(prevState => [
          ...prevState,
          ...mapperImages(response.data.hits),
        ]);
        setStatus('resolved');
        if (response.data.hits.length === 0) {
          toast.error('Enter something correct');
          setStatus('rejected');
        }
      } catch (error) {
        toast.error('Все пропало!', { position: 'top-center' });
        setStatus('rejected');
      }
    }

    fetchArt();
  }, [nameInput, page]);

  const onSubmitForm = name => {
    setNameInput(name);
    setArticles([]);
    resetPage();
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmitForm} />
      <ToastContainer autoClose={3000} />
      {articles.length !== 0 && (
        <ImageGallery toggleModal={toggleModal} articles={articles} />
      )}
      {status === 'pending' && <Loader />}
      {articles.length > 0 && <Button onClick={loadMore} />}
      {showModal && <Modal largImage={largImg} onClose={toggleModal} />}
    </div>
  );
}
