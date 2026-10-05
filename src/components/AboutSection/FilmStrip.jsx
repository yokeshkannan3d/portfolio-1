import React from 'react';
import FilmFrame from './FilmFrame.jsx';
import styles from './AboutSection.module.css';

function SprocketPattern({ position, size }) {
  return (
    <svg
      className={`${styles.sprockets} ${position === 'top' ? styles.sprocketsTop : styles.sprocketsBottom}`}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      style={{ '--sprocket-size': size }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={`sprocket-${position}-${size}`} width="28" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="5" width="14" height="10" rx="4" fill="var(--section-bg)" />
        </pattern>
      </defs>
      <rect width="100" height="20" fill={`url(#sprocket-${position}-${size})`} />
    </svg>
  );
}

export default function FilmStrip({ frames, height, sprocketSize, variant = 'main' }) {
  return (
    <div
      className={`${styles.filmStrip} ${variant === 'background' ? styles.backgroundStrip : ''}`}
      style={{ '--strip-height': height, '--sprocket-size': sprocketSize }}
    >
      <div className={styles.stripBody}>
        <SprocketPattern position="top" size={sprocketSize} />
        <div className={styles.frameTrack}>
          {frames.map((frame, index) => (
            <FilmFrame key={`${frame.src || 'frame'}-${index}`} {...frame} />
          ))}
        </div>
        <SprocketPattern position="bottom" size={sprocketSize} />
      </div>
    </div>
  );
}
