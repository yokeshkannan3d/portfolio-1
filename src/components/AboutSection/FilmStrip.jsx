import React, { useId } from 'react';
import FilmFrame from './FilmFrame.jsx';
import styles from './AboutSection.module.css';

function SprocketPattern({ position, size }) {
  const patternId = useId().replace(/:/g, '');
  const patternWidth = 28;
  const patternHeight = 52;

  return (
    <svg
      className={`${styles.sprockets} ${position === 'top' ? styles.sprocketsTop : styles.sprocketsBottom}`}
      viewBox={`0 0 ${patternWidth} ${patternHeight}`}
      preserveAspectRatio="none"
      style={{ '--sprocket-size': size }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`sprocket-${position}-${patternId}`}
          width={patternWidth}
          height={patternHeight}
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="21" width="14" height="10" rx="4" fill="var(--section-bg)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#sprocket-${position}-${patternId})`} />
    </svg>
  );
}

export default function FilmStrip({
  frames = [],
  height = 'var(--strip-height)',
  sprocketSize = 'var(--sprocket-size)',
  variant = 'main',
}) {
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
