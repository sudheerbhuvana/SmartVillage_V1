"use client";
import React, { useState } from 'react';
import './page.css';

const MultiImageDisplay = ({ imagePaths }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  return (
    <div className="image-grid">
      {imagePaths.map((image) => (
        <div key={image.id} className="image-item">
          {!loadedImages[image.id] && (
            <div className="image-loading">Loading...</div>
          )}
          <img 
            src={image.url} 
            alt={image.description}
            onLoad={() => handleImageLoad(image.id)}
            style={{ opacity: loadedImages[image.id] ? 1 : 0 }}
          />
          <div className="image-overlay">
            <p className="image-domain">{image.domain}</p>
            {image.description && (
              <p className="image-description">{image.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiImageDisplay;