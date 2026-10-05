import React from 'react';
import styles from './AboutSection.module.css';

const DEFAULT_BODY =
  "I'm a passionate 3D artist and developer who enjoys creating immersive digital experiences. I work with 3D animation, interactive experiences and modern web technologies.";

export default function AboutSection({
  title = 'About me',
  body = DEFAULT_BODY,
  mainMedia = '/images/about-me.jpg',
  backgroundMedia,
}) {
  return (
    <section id="about" className={styles.aboutSection}>
      <div
        className={styles.backgroundLayer}
        aria-hidden="true"
        style={
          backgroundMedia
            ? { backgroundImage: `url("${backgroundMedia}")` }
            : undefined
        }
      />

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>

        <div className={styles.filmStrip} aria-label="About me image">
          <div className={`${styles.filmHoles} ${styles.top}`} aria-hidden="true" />

          <div className={styles.filmImage}>
            <img src={mainMedia} alt="About me" />
          </div>

          <div className={`${styles.filmHoles} ${styles.bottom}`} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
