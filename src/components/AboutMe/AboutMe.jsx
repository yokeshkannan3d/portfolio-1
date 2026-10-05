import styles from "./AboutMe.module.css";

const SLIDES = [
  { src: "/image.jpeg", alt: "About me portfolio image" },
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

function Strip({ slides }) {
  const last = slides[slides.length - 1];

  return (
    <div className={styles["am-strip"]}>
      <Sprockets />
      <ul className={styles["am-frames"]} aria-label="Photos">
        <li className={`${styles["am-frame"]} ${styles["am-ghost"]}`} aria-hidden="true">
          {last?.src ? <img src={last.src} alt="" draggable="false" /> : <div className={styles["am-ph"]} />}
        </li>

        {slides.map((slide, index) => (
          <li className={styles["am-frame"]} key={index}>
            {slide.src ? (
              <img src={slide.src} alt={slide.alt} draggable="false" />
            ) : (
              <div className={styles["am-ph"]} aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
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
          <div className={styles["am-echo"]} aria-hidden="true">
            <Strip slides={slides} />
          </div>
          <Strip slides={slides} />
        </div>
      </div>
    </section>
  );
}
