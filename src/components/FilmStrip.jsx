import React from 'react';
import './FilmStrip.css';

export const FilmStrip = ({ imageSrc, altText = 'Film strip image' }) => {
  return (
    <div className="film-strip-container">
      {/* Top film strip */}
      <div className="film-strip film-strip-top">
        <div className="sprocket-holes">
          {[...Array(8)].map((_, i) => (
            <div key={`top-${i}`} className="sprocket-hole"></div>
          ))}
        </div>
      </div>

      {/* Image frame */}
      <div className="image-frame">
        <img src={imageSrc} alt={altText} className="film-image" />
      </div>

      {/* Bottom film strip */}
      <div className="film-strip film-strip-bottom">
        <div className="sprocket-holes">
          {[...Array(8)].map((_, i) => (
            <div key={`bottom-${i}`} className="sprocket-hole"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
