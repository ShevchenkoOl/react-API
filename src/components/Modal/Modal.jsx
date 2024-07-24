import styles from './modal.module.css';
import { AiTwotoneCloseCircle } from "react-icons/ai";

export const Modal = ({visible, setVisible, image}) => {
    if (!visible) return null;
  return (
    <div className={styles.Overlay} onClick={setVisible}>
      <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageContainer}>
          <img className={styles.img} src={image.largeImageURL} alt={image.tags} />
          <AiTwotoneCloseCircle className={styles.closeIcon} onClick={setVisible} />
        </div>
        <div className={styles.info}>
          <span>Likes: {image.likes}</span>
          <span>Views: {image.views}</span>
          <span>Downloads: {image.downloads}</span>
        </div>
      </div>
    </div>
  );
};
