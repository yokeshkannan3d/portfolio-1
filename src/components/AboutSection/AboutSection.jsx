import React from 'react';
import styles from './AboutSection.module.css';

const DEFAULT_BODY =
  "I'm a passionate 3D artist and developer who enjoys creating immersive digital experiences. I work with 3D animation, interactive experiences and modern web technologies.";

const holes = Array.from({ length: 24 });

export default function AboutSection({
  title = 'About me',
  body = DEFAULT_BODY,
  mainMedia = '/images/about-me.jpg',
}) {
  const renderHoles = (className) => (
    <div className={className} aria-hidden="true">
      {holes.map((_, index) => <span key={index} />)}
    </div>
  );

  const renderStrip = (echo = false) => (
    <div className={echo ? styles.amEcho : styles.amStrip}>
      {renderHoles(styles.amHoles)}
      <div className={styles.amFrames}>
        <div className={styles.amFrame}>
          <img src={mainMedia} alt={echo ? '' : 'About me'} />
        </div>
      </div>
      {renderHoles(styles.amHoles)}
    </div>
  );

  return (
    <section id="about" className={styles.am}>
      <h2 className={styles.amTitle}>{title}</h2>

      <div className={styles.amGrid}>
        <p className={styles.amText}>{body}</p>

        <div className={styles.amStage}>
          {renderStrip(true)}
          {renderStrip(false)}
        </div>
      </div>
    </section>
  );
}
