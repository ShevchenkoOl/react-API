import styles from './searchbar.module.css';

import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';
import { Loading } from 'components/Loading/Loading';
import { ImagesList } from 'components/ImagesList/ImagesList';

const Searchbar = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]); //состояние для нашего массива результата
  const [error, setError] = useState('');

  const fetchImage = async (e) => {
    e.preventDefault();
    const baseURL = 'https://pixabay.com/api/';
    const key = '30790248-497145c5d3b0c6576ca9c953f';

    let page = 1;
    let perPage = 12;

    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseURL}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      );
      console.log(res.data.hits);
      setImages(res.data.hits);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false)
    }
    setName('');
  };

  return (
    <>
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={fetchImage}>
          <button
            type="submit"
            className={styles.searchFormButton}
          >
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
        <ImagesList images={images} />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Searchbar;
