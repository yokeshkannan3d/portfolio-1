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
}) {
  const frames = [
    { src: mainMedia, type: 'image' },
    { src: peekMedia || mainMedia, type: 'image', peek: true },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.backgroundStripLayer} aria-hidden="true">
        <FilmStrip frames={[]} height="var(--bg-strip-height)" variant="background" />
      </div>

      <div className={styles.textColumn}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div className={styles.mainStripArea} aria-hidden="true">
        <FilmStrip frames={frames} height="var(--strip-height)" />
        <span className={styles.featherLeft} />
        <span className={styles.featherRight} />
      </div>
    </section>
  );
}
