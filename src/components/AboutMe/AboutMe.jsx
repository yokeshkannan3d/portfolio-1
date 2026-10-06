import { useEffect, useState } from "react";
import styles from "./AboutMe.module.css";
import aboutMe2 from "../../../assets/slideshow/about-me-2.jpg";
import aboutMe3 from "../../../assets/slideshow/about-me-3.jpg";

const SLIDES = [
  { src: aboutMe2, alt: "About me portfolio image 2" },
  { src: aboutMe3, alt: "About me portfolio image 3" },
];

const HOLES = 16;

const holeShade = (i) => {
  const t = Math.min(1, i / (HOLES * 0.55));
  const v = Math.round(70 + t * 160);
  return `rgb(${v},${v},${v})`;
};

function Sprockets() {
  return (
    <div className={styles["am-holes"]} aria-hidden="true">
      {Array.from({ length: HOLES }, (_, i) => (
        <span key={i} style={{ background: holeShade(i) }} />
      ))}
    </div>
  );
}

function RightBoxes() {
  return (
    <div className={styles["am-right-boxes"]} aria-hidden="true">
      <div className={styles["am-right-box-row"]}>
        {Array.from({ length: 4 }, (_, i) => <span key={`top-${i}`} />)}
      </div>
      <div className={`${styles["am-right-box-row"]} ${styles["am-right-box-row-bottom"]}`}>
        {Array.from({ length: 4 }, (_, i) => <span key={`bottom-${i}`} />)}
      </div>
    </div>
  );
}

function Strip({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    if (slideCount <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [slideCount]);

  useEffect(() => {
    if (activeIndex >= slideCount && slideCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);

  return (
    <div className={styles["am-strip"]}>
      <Sprockets />
      <RightBoxes />

      <div className={styles["am-center-frame"]} aria-label="About me slideshow">
        {activeSlide?.src ? (
          <img
            key={activeIndex}
            className={styles["am-slide-image"]}
            src={activeSlide.src}
            alt={activeSlide.alt}
            draggable="false"
          />
        ) : (
          <div className={styles["am-ph"]} aria-hidden="true" />
        )}
      </div>

      <Sprockets />
    </div>
  );
}

export default function AboutMe({ slides = SLIDES }) {
  return (
    <section className={styles["am"]} id="about">
<h2 className={styles["am-title"]}>About me</h2>

      <div className={styles["am-grid"]}>
        <p className={styles["am-text"]}>
          I’m a 3D Generalist and Multimedia Artist with a passion for creating
          cinematic visuals, animation, motion graphics, and immersive
          experiences. My work combines storytelling, design, and technical
          problem-solving across 3D modeling, rigging, animation, VFX,
          compositing, and real-time workflows. I enjoy turning ideas into
          polished visual experiences and continuously exploring new tools and
          techniques.
        </p>

        <div className={styles["am-stage"]}>
          <Strip slides={slides} />
        </div>
      </div>
    </section>
  );
}
