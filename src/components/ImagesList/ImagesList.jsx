import { Button } from 'components/Button/Button';
import { Modal } from '../Modal/Modal';
import styles from './imsgesList.module.css';
import { useState } from 'react';
// import simpleLightbox from 'simplelightbox';

export const ImagesList = ({ images }) => {
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickOpen = image => {
    setSelectedImage(image);
    setModal(true);
  };

  const handleClickClose = () => {
    setModal(false);
    setSelectedImage(null);
  }
  return (
    <>
      <ul className={styles.ImageGallery}>
        {images.map(image => {
          return (
            <>
              <Modal
                visible={modal}
                setVisible={setModal}
                image={images}
              ></Modal>
              <li className={styles.Item} key={image.id}>
                <img
                  className={styles.img}
                  src={image.webformatURL}
                  alt={image.tags}
                  onClick={()=> handleClickOpen(image)}
                />
              </li>
            </>
          );
        })}
      </ul>
      <Button title="Load more" />
      {modal && <Modal visible={modal} setVisible={handleClickClose} image={selectedImage} />}
    </>
  );
};
