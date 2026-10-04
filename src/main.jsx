import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Mail, Play, X } from 'lucide-react';
import './styles.css';

const ASSET_BASE = 'https://raw.githubusercontent.com/yokeshkannan3d/Yokeshkannan/main';
const ABOUT_IMAGE = `${ASSET_BASE}/public/images/about-film.jpg`;
const REEL = `${ASSET_BASE}/public/videos/reel.mp4`;

const WORKS = [
  { id: 1, title: '3D Models', image: `${ASSET_BASE}/public/images/work-1.svg` },
  { id: 2, title: 'VFX', image: `${ASSET_BASE}/public/images/work-2.svg` },
  { id: 3, title: 'Animation', image: `${ASSET_BASE}/public/images/work-3.svg` },
  { id: 4, title: 'Design', image: `${ASSET_BASE}/public/images/work-4.svg` },
  { id: 5, title: 'Project 05', image: null },
  { id: 6, title: 'Project 06', image: null },
];

const BIO = `I’m a 3D Generalist and Multimedia Artist with a passion for creating cinematic visuals, animation, motion graphics, and immersive experiences. My work combines storytelling, design, and technical problem-solving across 3D modeling, rigging, animation, VFX, compositing, and real-time workflows. I enjoy turning ideas into polished visual experiences and continuously exploring new tools and techniques.`;

function Nav() {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top" aria-label="Yokesh Kannan home">YK</a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#milestones">Milestones</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  const [open, setOpen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  return (
    <>
      <section id="top" className="hero">
        <video className="hero-preview" autoPlay muted loop playsInline preload="metadata">
          <source src={REEL} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-copy">
          <div>
            <h1>JUMP INTO MY <span>WORLD</span></h1>
            <button className="reel-cta" onClick={() => setOpen(true)}>
              <span className="play-ring"><Play size={25} fill="currentColor" /></span>
              <span>PLAY SHOW REEL</span>
            </button>
          </div>
        </div>
        <button className="scroll-cue" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to About">
          <ChevronDown size={22} />
        </button>
      </section>

      {open && (
        <div className="reel-modal" role="dialog" aria-modal="true" aria-label="Show reel" onClick={() => setOpen(false)}>
          <button className="reel-close" onClick={() => setOpen(false)} aria-label="Close reel"><X size={30} /></button>
          <div className="reel-player" onClick={(e) => e.stopPropagation()}>
            <video ref={previewRef} autoPlay controls playsInline>
              <source src={REEL} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

function FilmStrip() {
  const holes = Array.from({ length: 13 });
  return (
    <div className="film-primary">
      <div className="film-track">{holes.map((_, i) => <span key={`t-${i}`} />)}</div>
      <div className="film-image-frame"><img src={ABOUT_IMAGE} alt="Yokesh on set" /></div>
      <div className="film-track">{holes.map((_, i) => <span key={`b-${i}`} />)}</div>
    </div>
  );
}

function DiagonalFilm() {
  const holes = Array.from({ length: 15 });
  return (
    <div className="film-diagonal" aria-hidden="true">
      <div className="diagonal-body">
        <div className="film-track">{holes.map((_, i) => <span key={i} />)}</div>
        <div className="diagonal-empty" />
        <div className="film-track">{holes.map((_, i) => <span key={`b-${i}`} />)}</div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about section-shell">
      <DiagonalFilm />
      <div className="about-inner">
        <div className="about-copy">
          <h2>About me</h2>
          <p>{BIO}</p>
        </div>
        <FilmStrip />
      </div>
    </section>
  );
}

function WorkCard({ work, onOpen }) {
  return (
    <button className="work-card" onClick={() => onOpen(work)} aria-label={`Open ${work.title}`}>
      {work.image ? <img src={work.image} alt="" /> : <div className="placeholder-art"><span>{String(work.id).padStart(2, '0')}</span><small>PROJECT PLACEHOLDER</small></div>}
      <span className="work-label">{work.title}</span>
    </button>
  );
}

function WorkLibrary({ work, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); };
  }, [onClose]);

  return (
    <div className="library-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="library-panel" onClick={(e) => e.stopPropagation()}>
        <button className="library-close" onClick={onClose} aria-label="Close library"><X size={28} /></button>
        <p className="eyebrow">WORK LIBRARY</p>
        <h3>{work.title}</h3>
        <div className="library-preview">
          {work.image ? <img src={work.image} alt={work.title} /> : <div className="library-placeholder"><strong>Library ready</strong><span>Project files will be added here later.</span></div>}
        </div>
        <div className="library-meta"><span>Category</span><strong>{work.title}</strong></div>
        <div className="library-empty">No project files added yet.</div>
      </div>
    </div>
  );
}

function Work() {
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const move = (distance) => trackRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
  const start = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 8) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: 330, behavior: 'smooth' });
    }, 2600);
  };

  useEffect(() => { start(); return () => clearInterval(timerRef.current); }, []);

  return (
    <section id="work" className="work section-shell">
      <div className="work-inner">
        <h2>Made by Yokesh</h2>
        <div className="carousel-shell" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={start}>
          <button className="carousel-arrow left" onClick={() => move(-330)} aria-label="Previous work"><ArrowLeft size={23} /></button>
          <div className="work-track" ref={trackRef} onPointerDown={() => clearInterval(timerRef.current)} onPointerUp={start}>
            {[...WORKS, ...WORKS].map((work, i) => <WorkCard key={`${work.id}-${i}`} work={work} onOpen={setSelected} />)}
          </div>
          <button className="carousel-arrow right" onClick={() => move(330)} aria-label="Next work"><ArrowRight size={23} /></button>
        </div>
      </div>
      {selected && <WorkLibrary work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function Milestones() {
  return (
    <section id="milestones" className="milestones section-shell">
      <div className="content-narrow">
        <h2>Milestones</h2>
        <div className="milestone-panel">
          <div className="milestone-item"><div className="milestone-dot" /><p>Created optimized low-poly assets for the real-time game engine. Built Boba Run, including vehicles, environment props, and modular assets.</p></div>
          <div className="milestone-item"><div className="milestone-dot" /><p>Created optimized low-poly assets for the real-time game engine. Built environments, props, and modular assets.</p></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact section-shell">
      <div className="content-narrow">
        <h2>Get in Touch</h2>
        <div className="contact-panel">
          <a href="https://www.linkedin.com/in/yokesh-kannan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="social-icon linkedin-icon">in</span></a>
          <a href="https://www.behance.net/yokeshkannan" target="_blank" rel="noreferrer" aria-label="Behance"><span className="social-icon behance-icon">Bē</span></a>
          <a href="mailto:yokeshkannan3d@gmail.com" aria-label="Email"><Mail size={36} /></a>
          <a href="#" aria-label="Instagram"><span className="social-icon instagram-icon"><span /></span></a>
        </div>
      </div>
    </section>
  );
}

function App() {
  return <div className="app"><Nav /><Hero /><About /><Work /><Milestones /><Contact /></div>;
}

createRoot(document.getElementById('root')).render(<App />);
