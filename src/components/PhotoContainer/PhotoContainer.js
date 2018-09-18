import React from 'react';
import Spinner from '../Spinner/Spinner';
import NoResult from '../NoResult/NoResult';
import './PhotoContainer.css';

const PhotoContainer = ({ title, isPending, photos }) => {
  const renderPhotos = photos => {
    return photos.map(photo => {
      const { id, farm, server, secret, title } = photo;

      return (
        <li key={id}>
          <img
            src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
            alt={title}
          />
        </li>
      );
    });
  }

  return (
    <div className="photo-container">
      <h2>{title && `Photos of "${title}"`}</h2>
      {isPending ? (
        <Spinner />
      ) : photos.length === 0 ? (
        <NoResult />
      ) : (
        <ul>{renderPhotos(photos)}</ul>
      )}
    </div>
  )
}

export default PhotoContainer;