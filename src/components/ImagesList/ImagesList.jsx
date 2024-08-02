// -------------------------------------------------------------Этот вариант кода использует библиотеку simpleLightbox
import { Button } from 'components/Button/Button';
import styles from './imsgesList.module.css';
import { useEffect } from 'react';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const ImagesList = ({ images, loadMore }) => {

  useEffect(() => {
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    return () => lightbox.destroy();
  }, [images]);

  return (
    <>
      <ul className={`${styles.ImageGallery} gallery`}>
        {images.map(image => (
          <li className={styles.Item} key={image.id}>
            <a href={image.largeImageURL}>
              <img
                className={styles.img}
                src={image.webformatURL}
                alt={image.tags}
              />
            </a>
          </li>
        ))}
      </ul>
      <Button title="Load more" onClick={loadMore} />
    </>
  );
};



// ------------------------------------------Этот вариант кода использует обычное модальное окно 
// import { Button } from 'components/Button/Button';
// import { Modal } from '../Modal/Modal';
// import styles from './imsgesList.module.css';
// import { useState } from 'react';

// export const ImagesList = ({ images }) => {
//   const [modal, setModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleClickOpen = image => {
//     setSelectedImage(image);
//     setModal(true);
//   };

//   const handleClickClose = () => {
//     setModal(false);
//     setSelectedImage(null);
//   }
//   return (
//     <>
//       <ul className={styles.ImageGallery}>
//         {images.map(image => {
//           return (
//             <>
//               <Modal
//                 visible={modal}
//                 setVisible={setModal}
//                 image={images}
//               ></Modal>
//               <li className={styles.Item} key={image.id}>
//                 <img
//                   className={styles.img}
//                   src={image.webformatURL}
//                   alt={image.tags}
//                   onClick={()=> handleClickOpen(image)}
//                 />
//               </li>
//             </>
//           );
//         })}
//       </ul>
//       <Button title="Load more" />
//       {modal && <Modal visible={modal} setVisible={handleClickClose} image={selectedImage} />}
//     </>
//   );
// };