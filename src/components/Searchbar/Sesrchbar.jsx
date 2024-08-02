import styles from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';
import { Loading } from 'components/Loading/Loading';
import { ImagesList } from 'components/ImagesList/ImagesList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const perPage = 12;

  const fetchImage = async (query, newPage) => {
    const baseURL = 'https://pixabay.com/api/';
    const key = '30790248-497145c5d3b0c6576ca9c953f';

    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseURL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${newPage}&per_page=${perPage}`
      );

      setImages(prevImages =>
        newPage === 1 ? res.data.hits : [...prevImages, ...res.data.hits]
      );

      if (res.data.total !== 0) {
        toast.success(`👌 Found ${res.data.total} images successfully`, {
          position: 'top-center',
          theme:"dark",
          autoClose: 2000,
        });
      } else {
        toast.warn('🤦‍♂️ Please enter the correct name', {
          position: 'top-center',
          theme:"dark",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
      toast.error('😒 Failed to fetch images. Please try again.', {
        position: 'top-center',
        theme:"dark"
      });
    } finally {
      setIsLoading(false);
    }
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImage(name, 1);
  };

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchImage(name, newPage);
  };

  return (
    <>
      <header className={styles.searchbar}>
        <form
          className={styles.searchForm}
          onSubmit={handleSubmit}
        >
          <button type="submit" className={styles.searchFormButton}>
            <FaSearch />
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.searchFormInput}
            type="text"
            value={name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => {
              setName(e.target.value);
              //console.log(e.target.value); // Здесь будет вывод в консоль
            }}
          />
        </form>
      </header>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : images.length > 0 ? (
        <ImagesList images={images} loadMore={loadMore} />
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </>
  );
};

export default Searchbar;
