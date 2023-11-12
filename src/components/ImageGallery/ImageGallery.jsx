import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';

export const ImageGallery = ({ images, onClick }) => {
  console.log('iamges' + images);
  return (
    <ul className={css.ImageGallery}>
      {images.map(item => (
        <ImageGalleryItem
          key={item.id}
          id={item.id}
          webformatURL={item.webformatURL}
          largeImageURL={item.largeImageURL}
          text={item.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
