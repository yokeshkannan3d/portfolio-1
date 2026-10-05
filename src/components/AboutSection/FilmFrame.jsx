import React, { useRef } from 'react';
import styles from './AboutSection.module.css';

export default function FilmFrame({ src, type = 'image', peek = false }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    if (type !== 'video' || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  };

  const handleLeave = () => {
    if (type !== 'video' || !videoRef.current) return;
    videoRef.current.pause();
  };

  return (
    <div
      className={`${styles.frame} ${peek ? styles.peekFrame : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {type === 'video' ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="About me video"
        />
      ) : (
        <img src={src} alt="" draggable="false" />
      )}
    </div>
  );
}
