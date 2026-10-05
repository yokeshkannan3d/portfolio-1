import React, { useId } from 'react';
import FilmFrame from './FilmFrame.jsx';
import styles from './AboutSection.module.css';

function SprocketPattern({ position }) {
  const patternId = useId().replace(/:/g, '');
  const patternWidth = 28;

  return (
    <svg
      className={styles.sprockets}
      viewBox={`0 0 ${patternWidth} 10`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`sprocket-${position}-${patternId}`}
          width={patternWidth}
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="14"
            height="10"
            rx="4"
            fill="var(--strip-hole-color)"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#sprocket-${position}-${patternId})`}
      />
    </svg>
  );
}

export default function FilmStrip({
  frames = [],
  height = 'var(--strip-height)',
  variant = 'main',
}) {
  return (
    <div
      className={`${styles.filmStripWrapper} ${
        variant === 'background' ? styles.backgroundStrip : ''
      }`}
      style={{ '--strip-height': height }}
    >
      <div className={styles.filmStrip}>
        <div className={styles.stripBody}>
          <SprocketPattern position="top" />
          <div className={styles.frameTrack}>
            {frames.map((frame, index) => (
              <FilmFrame
                key={`${frame.src || 'frame'}-${index}`}
                {...frame}
              />
            ))}
          </div>
          <SprocketPattern position="bottom" />
        </div>
      </div>
    </div>
  );
}
