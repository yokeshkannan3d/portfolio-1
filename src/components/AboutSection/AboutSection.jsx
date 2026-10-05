import React from 'react';
import styles from './AboutSection.module.css';

const DEFAULT_BODY =
  "I'm a passionate 3D artist and developer who enjoys creating immersive digital experiences. I work with 3D animation, interactive experiences and modern web technologies.";

const HOLE_COUNT = 32;

function FilmStrip({ src, echo = false }) {
  const holes = Array.from({ length: HOLE_COUNT });

  return (
    <div className={echo ? styles.amEcho : styles.amStrip}>
      <div className={styles.amHoles} aria-hidden="true">
        {holes.map((_, index) => <span key={index} />)}
      </div>

      <div className={styles.amFrames}>
        <div className={styles.amGhost} aria-hidden="true">
          <div className={styles.amPh} />
        </div>

        <div className={styles.amFrame}>
          <img src={src} alt={echo ? '' : 'About me'} />
        </div>
      </div>

      <div className={styles.amHoles} aria-hidden="true">
        {holes.map((_, index) => <span key={index} />)}
      </div>
    </div>
  );
}

export default function AboutSection({
  title = 'About me',
  body = DEFAULT_BODY,
  mainMedia = '/images/about-me.jpg',
}) {
  return (
    <section id="about" className={styles.am}>
      <h2 className={styles.amTitle}>{title}</h2>

      <div className={styles.amGrid}>
        <p className={styles.amText}>{body}</p>

        <div className={styles.amStage}>
          <FilmStrip src={mainMedia} echo />
          <FilmStrip src={mainMedia} />
        </div>
      </div>
    </section>
  );
}
