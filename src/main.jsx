import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Mail, Moon, Play, Sun, X } from 'lucide-react';
import './styles.css';
import AboutMe from "./components/AboutMe/AboutMe.jsx";

const ASSET_BASE = 'https://raw.githubusercontent.com/yokeshkannan3d/Yokeshkannan/main';
const REEL = `${ASSET_BASE}/public/videos/reel.mp4`;

const WORK_CATEGORIES = [
  { id: 'vfx', title: 'VFX & Compositing', subtitle: 'Visual effects, compositing & cinematic finishing', image: `${ASSET_BASE}/public/images/work-2.svg`, works: [
    { title: 'VFX & Compositing — Work 01', image: `${ASSET_BASE}/public/images/work-2.svg` },
    { title: 'VFX & Compositing — Work 02', image: null }, { title: 'VFX & Compositing — Work 03', image: null },
  ]},
  { id: 'product-viz', title: '3D Product Visualization', subtitle: 'Product modeling, materials, lighting & renders', image: `${ASSET_BASE}/public/images/work-1.svg`, works: [
    { title: '3D Product Visualization — Work 01', image: `${ASSET_BASE}/public/images/work-1.svg` },
    { title: '3D Product Visualization — Work 02', image: null }, { title: '3D Product Visualization — Work 03', image: null },
  ]},
  { id: 'hard-surface', title: 'Hard Surface Modelling', subtitle: 'Detailed mechanical, vehicle & industrial assets', image: `${ASSET_BASE}/public/images/work-1.svg`, works: [
    { title: 'Hard Surface Modelling — Work 01', image: `${ASSET_BASE}/public/images/work-1.svg` },
    { title: 'Hard Surface Modelling — Work 02', image: null }, { title: 'Hard Surface Modelling — Work 03', image: null }, { title: 'Hard Surface Modelling — Work 04', image: null },
  ]},
  { id: 'motion', title: 'Motion Graphics', subtitle: 'Motion design, animation & kinetic visuals', image: `${ASSET_BASE}/public/images/work-3.svg`, works: [
    { title: 'Motion Graphics — Work 01', image: `${ASSET_BASE}/public/images/work-3.svg` },
    { title: 'Motion Graphics — Work 02', image: null }, { title: 'Motion Graphics — Work 03', image: null },
  ]},
];

function Nav({ theme, onToggleTheme }) {
  return <header className="nav"><a className="nav-logo" href="#top" aria-label="Yokesh Kannan home">YK</a><nav className="nav-links" aria-label="Primary navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#milestones">Milestones</a><a href="#contact">Contact</a></nav><button className="theme-toggle" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span></button></header>;
}

function Hero() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const onKey = e => e.key === 'Escape' && setOpen(false); document.addEventListener('keydown', onKey); document.body.classList.add('modal-open'); return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); }; }, [open]);
  return <>{<section id="top" className="hero"><video className="hero-preview" autoPlay muted loop playsInline preload="metadata"><source src={REEL} type="video/mp4" /></video><div className="hero-shade" /><div className="hero-copy"><div><h1>JUMP INTO MY <span>WORLD</span></h1><button className="reel-cta" onClick={() => setOpen(true)}><span className="play-ring"><Play size={25} fill="currentColor" /></span><span>PLAY SHOW REEL</span></button></div></div><button className="scroll-cue" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to About"><ChevronDown size={22} /></button></section>}{open && <div className="reel-modal" role="dialog" aria-modal="true" aria-label="Show reel" onClick={() => setOpen(false)}><button className="reel-close" onClick={() => setOpen(false)} aria-label="Close reel"><X size={30} /></button><div className="reel-player" onClick={e => e.stopPropagation()}><video autoPlay controls playsInline><source src={REEL} type="video/mp4" /></video></div></div>}</>;
}

function About() { return <AboutMe />; }

function CategoryCard({ category, onOpen }) {
  return <button className="work-card work-category-card" onClick={() => onOpen(category)} aria-label={`Open ${category.title}`}><img src={category.image} alt="" /><div className="category-card-overlay"><span className="category-index">{category.id === 'vfx' ? '01' : category.id === 'product-viz' ? '02' : category.id === 'hard-surface' ? '03' : '04'}</span><span className="work-label category-label">{category.title}</span><span className="category-subtitle">{category.subtitle}</span></div></button>;
}

function CategoryLibrary({ category, onClose }) {
  useEffect(() => { const onKey = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', onKey); document.body.classList.add('modal-open'); return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open'); }; }, [onClose]);
  return <div className="library-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${category.title} work library`}><div className="library-panel category-library-panel" onClick={e => e.stopPropagation()}><button className="library-close" onClick={onClose} aria-label="Close library"><X size={28} /></button><p className="eyebrow">WORK CATEGORY</p><h3>{category.title}</h3><p className="category-library-description">{category.subtitle}</p><div className="category-work-grid">{category.works.map((work, index) => <article className="category-work-item" key={`${category.id}-${index}`}>{work.image ? <img src={work.image} alt={work.title} /> : <div className="category-work-placeholder"><span>{String(index + 1).padStart(2, '0')}</span><small>WORKPIECE</small></div>}<div className="category-work-caption"><span>{String(index + 1).padStart(2, '0')}</span><strong>{work.title}</strong></div></article>)}</div></div></div>;
}

function Work() {
  const [selected, setSelected] = useState(null); const trackRef = useRef(null); const timerRef = useRef(null);
  const move = distance => trackRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
  const start = () => { clearInterval(timerRef.current); timerRef.current = setInterval(() => { const track = trackRef.current; if (!track) return; const max = track.scrollWidth - track.clientWidth; if (track.scrollLeft >= max - 8) track.scrollTo({ left: 0, behavior: 'smooth' }); else track.scrollBy({ left: 430, behavior: 'smooth' }); }, 2600); };
  useEffect(() => { start(); return () => clearInterval(timerRef.current); }, []);
  return <section id="work" className="work section-shell"><div className="work-inner"><h2>Made by Yokesh</h2><p className="work-intro">Explore my work by category.</p><div className="carousel-shell" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={start}><button className="carousel-arrow left" onClick={() => move(-430)} aria-label="Previous category"><ArrowLeft size={23} /></button><div className="work-track" ref={trackRef} onPointerDown={() => clearInterval(timerRef.current)} onPointerUp={start}>{[...WORK_CATEGORIES, ...WORK_CATEGORIES].map((category, i) => <CategoryCard key={`${category.id}-${i}`} category={category} onOpen={setSelected} />)}</div><button className="carousel-arrow right" onClick={() => move(430)} aria-label="Next category"><ArrowRight size={23} /></button></div></div>{selected && <CategoryLibrary category={selected} onClose={() => setSelected(null)} />}</section>;
}

function Milestones() { return <section id="milestones" className="milestones section-shell"><div className="content-narrow"><h2>Milestones</h2><div className="milestone-panel"><div className="milestone-item"><div className="milestone-dot" /><p>Created optimized low-poly assets for the real-time game engine. Built Boba Run, including vehicles, environment props, and modular assets.</p></div><div className="milestone-item"><div className="milestone-dot" /><p>Created optimized low-poly assets for the real-time game engine. Built environments, props, and modular assets.</p></div></div></div></section>; }
function Contact() { return <section id="contact" className="contact section-shell"><div className="content-narrow"><h2>Get in Touch</h2><div className="contact-panel"><a href="https://www.linkedin.com/in/yokesh-kannan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="social-icon linkedin-icon">in</span></a><a href="https://www.behance.net/yokeshkannan" target="_blank" rel="noreferrer" aria-label="Behance"><span className="social-icon behance-icon">Bē</span></a><a href="mailto:yokeshkannan3d@gmail.com" aria-label="Email"><Mail size={36} /></a><a href="#" aria-label="Instagram"><span className="social-icon instagram-icon"><span /></span></a></div></div></section>; }
function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);
  return <div className={`app theme-${theme}`}><Nav theme={theme} onToggleTheme={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} /><Hero /><About /><Work /><Milestones /><Contact /></div>;
}
createRoot(document.getElementById('root')).render(<App />);
