import React from 'react';
import FilmStrip from './FilmStrip.jsx';
import styles from './AboutSection.module.css';

const DEFAULT_BODY =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry…';

export default function AboutSection({
  title = 'About me',
  body = DEFAULT_BODY,
  mainMedia,
  peekMedia,
  backgroundMedia,
}) {
  const frames = [{ src: mainMedia, type: 'image' }];

  return (
    <section id="about" className={styles.aboutSection}>
      <div
        className={styles.backgroundLayer}
        aria-hidden="true"
        style={backgroundMedia ? { backgroundImage: `url("${backgroundMedia}")` } : undefined}
      />

      <div className={styles.aboutContent}>
        <div className={styles.copy}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>

        <div className={styles.mainStripArea}>
          <FilmStrip frames={frames} variant="main" />
        </div>
      </div>
    </section>
  );
}
