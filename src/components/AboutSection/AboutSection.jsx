import React from 'react';
import FilmStrip from './FilmStrip.jsx';
import styles from './AboutSection.module.css';

const DEFAULT_BODY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry…";

export default function AboutSection({
  title = 'About me',
  body = DEFAULT_BODY,
  mainMedia,
  peekMedia,
}) {
  const frames = [
    { src: mainMedia, type: 'image' },
    { src: peekMedia || mainMedia, type: 'image', peek: true },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <FilmStrip
          frames={[{ src: mainMedia, type: 'image' }]}
          height="var(--background-strip-height)"
          sprocketSize="var(--background-sprocket-size)"
          variant="background"
        />
      </div>

      <div className={styles.mainStripArea}>
        <FilmStrip
          frames={frames}
          height="var(--strip-height)"
          sprocketSize="var(--sprocket-size)"
        />
        <span className={`${styles.feather} ${styles.featherLeft}`} aria-hidden="true" />
        <span className={`${styles.feather} ${styles.featherRight}`} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
