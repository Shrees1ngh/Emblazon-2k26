import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './home.css';

gsap.registerPlugin(ScrollTrigger);

const REGISTER_URL = 'https://google.com';
const FEST_DATE = '2026-03-15T00:00:00';

/* ═══ Countdown ═══ */
function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target) - new Date());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

/* ═══ Floating 3D Geometric Shapes ═══ */
function Shapes3D() {
  return (
    <div className="shapes3d" aria-hidden="true">
      <div className="shape shape--cube">
        <div className="shape__face shape__face--front" />
        <div className="shape__face shape__face--back" />
        <div className="shape__face shape__face--left" />
        <div className="shape__face shape__face--right" />
        <div className="shape__face shape__face--top" />
        <div className="shape__face shape__face--bottom" />
      </div>
      <div className="shape shape--ring" />
      <div className="shape shape--pyramid">
        <div className="pyramid__face pyramid__face--1" />
        <div className="pyramid__face pyramid__face--2" />
        <div className="pyramid__face pyramid__face--3" />
        <div className="pyramid__face pyramid__face--4" />
      </div>
      <div className="shape shape--ring shape--ring2" />
      <div className="shape shape--sphere" />
    </div>
  );
}

/* ═══ Sunburst Clock ═══ */
function SunburstClock() {
  const numRays = 60;
  const innerR = 45;
  const outerR = 120;
  const cx = 150;
  const cy = 150;

  const rays = [];
  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * 360;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + innerR * Math.cos(rad);
    const y1 = cy + innerR * Math.sin(rad);
    const x2 = cx + outerR * Math.cos(rad);
    const y2 = cy + outerR * Math.sin(rad);
    rays.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />);
  }

  return (
    <div className="sunburst-clock" aria-hidden="true">
      <svg viewBox="0 0 300 300" className="sunburst-clock__svg">
        {/* Rays */}
        <g className="sunburst-clock__rays">{rays}</g>

        {/* Orbit Path */}
        <ellipse cx={cx} cy={cy} rx="140" ry="25" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" transform={`rotate(-15 ${cx} ${cy})`} />

        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={innerR} fill="#030014" />
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* Gradient orb (Sun) */}
        <defs>
          <radialGradient id="orbGrad" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        <circle cx={cx - 50} cy={cy + 10} r="32" fill="url(#orbGrad)" className="sunburst-clock__orb" />

        {/* Orbit Moon */}
        <circle cx={cx - 60} cy={cy - 80} r="8" fill="#fff" className="sunburst-clock__moon" />

        {/* Clock hand */}
        <line
          x1={cx} y1={cy}
          x2={cx} y2={cy - outerR - 10}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="sunburst-clock__hand"
        />
        {/* tiny center dot */}
        <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.9)" />
      </svg>
      {/* Scattered stars */}
      <div className="sunburst-clock__stars">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="sunburst-star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ═══ Marquee ═══ */
function Marquee({ children, speed = 30 }) {
  return (
    <div className="marquee" style={{ '--speed': `${speed}s` }}>
      <div className="marquee__track">
        <span className="marquee__content">{children}</span>
        <span className="marquee__content" aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}

/* ═══ 3D Tilt Card Hook ═══ */
function useTilt3D(ref, strength = 15) {
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    gsap.to(el, {
      rotationY: x * strength,
      rotationX: -y * strength,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  }, [ref, strength]);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationY: 0, rotationX: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)',
    });
  }, [ref]);

  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

/* ═══ 3D Category Card ═══ */
function CatCard3D({ cat }) {
  const ref = useRef(null);
  const tilt = useTilt3D(ref, 12);
  return (
    <Link
      to="/events"
      ref={ref}
      className="cat-card"
      style={{ '--c': cat.color }}
      {...tilt}
    >
      <div className="cat-card__shine" />
      <div className="cat-card__glow" />
      <div className="cat-card__icon">{cat.icon}</div>
      <h3 className="cat-card__name">{cat.name}</h3>
      <p className="cat-card__tagline">{cat.tagline}</p>
      <span className="cat-card__count">{cat.events} events →</span>
    </Link>
  );
}

/* ═══ 3D Schedule Card ═══ */
function SchedCard3D({ day, date, theme, desc, items, variant }) {
  const ref = useRef(null);
  const tilt = useTilt3D(ref, 8);
  return (
    <div ref={ref} className={`sched-card sched-card--${variant}`} {...tilt}>
      <div className="sched-card__badge">Day {day}</div>
      <span className="sched-card__date">{date}</span>
      <h3 className="sched-card__theme">{theme}</h3>
      <p className="sched-card__desc">{desc}</p>
      <ul className="sched-card__list">
        {items.map(e => <li key={e}>{e}</li>)}
      </ul>
    </div>
  );
}

/* ═══ Data ═══ */
const categories = [
  { name: 'Cultural', icon: '🎭', events: 5, color: '#F97066', tagline: 'Fashion · Rap · Personality' },
  { name: 'Music', icon: '🎵', events: 5, color: '#818CF8', tagline: 'Solo · Duet · Buzz to Sing' },
  { name: 'Dance', icon: '💃', events: 3, color: '#E879F9', tagline: 'Solo · Duet · Group Battle' },
  { name: 'Drama', icon: '🎬', events: 3, color: '#FB7185', tagline: 'Street · One Act · Mono' },
  { name: 'Literary & Arts', icon: '🎨', events: 12, color: '#2DD4BF', tagline: 'Debate · Poetry · Rangoli' },
  { name: 'Star Evening', icon: '⭐', events: 1, color: '#FCD34D', tagline: 'The Grand Finale Night' },
];

const stats = [
  { num: '30+', label: 'Events', icon: '🎪' },
  { num: '2', label: 'Epic Days', icon: '📅' },
  { num: '6', label: 'Categories', icon: '🏷️' },
  { num: '1000+', label: 'Participants', icon: '👥' },
];

/* ═══════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════ */
export default function Home() {
  const cd = useCountdown(FEST_DATE);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const aboutRef = useRef(null);
  const catRef = useRef(null);
  const statsRef = useRef(null);
  const schedRef = useRef(null);
  const ctaRef = useRef(null);
  const cursorRef = useRef(null);

  /* ── 3D Hero parallax tilt on mouse ── */
  const handleHeroMouse = useCallback((e) => {
    if (!heroContentRef.current) return;
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 2;
    const y = (e.clientY / h - 0.5) * 2;
    gsap.to(heroContentRef.current, {
      rotationY: x * 4,
      rotationX: -y * 3,
      duration: 0.8,
      ease: 'power2.out',
      transformPerspective: 1200,
    });
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  const handleHeroLeave = useCallback(() => {
    if (!heroContentRef.current) return;
    gsap.to(heroContentRef.current, {
      rotationY: 0, rotationX: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    });
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      /* Hero cinematic entrance */
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl
        .from('.hero__badge', { opacity: 0, y: 30, scale: 0.9, duration: 0.6, ease: 'back.out(1.8)' })
        .from('.hero__letter', {
          opacity: 0, y: 100, rotationX: -90, scale: 0.5,
          duration: 0.9, ease: 'power4.out', stagger: 0.06,
        }, '-=0.3')
        .from('.sunburst-clock', {
          opacity: 0, scale: 0, rotation: 360,
          duration: 1.2, ease: 'back.out(1.5)',
        }, '-=0.6')
        .from('.hero__year', {
          opacity: 0, scale: 0, rotation: -360, z: -200,
          duration: 1, ease: 'back.out(2)',
        }, '-=0.8')
        .from('.hero__tagline', { opacity: 0, y: 30, filter: 'blur(10px)', duration: 0.7 }, '-=0.4')
        .from('.cd-box', {
          opacity: 0, y: 50, rotationX: -45, scale: 0.7,
          duration: 0.6, stagger: 0.08, ease: 'back.out(1.8)',
          transformPerspective: 600,
        }, '-=0.3')
        .from('.hero__cta', {
          opacity: 0, y: 30, scale: 0.8,
          duration: 0.5, stagger: 0.12, ease: 'back.out(2)',
        }, '-=0.2')
        .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.1')
        .from('.shape', {
          opacity: 0, scale: 0, rotation: 180,
          duration: 1, stagger: 0.15, ease: 'back.out(1.5)',
        }, '-=1.2');

      /* Hero scroll parallax */
      gsap.to('.hero__content', {
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        y: -150, opacity: 0, scale: 0.85, rotationX: 10,
        transformPerspective: 1000,
      });

      gsap.to('.shapes3d', {
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        y: -100, opacity: 0,
      });

      /* Marquee */
      gsap.from('.marquee-section', {
        scrollTrigger: { trigger: '.marquee-section', start: 'top 92%' },
        opacity: 0, scaleX: 0.8, duration: 1, ease: 'power3.out',
      });

      /* About */
      const aboutTl = gsap.timeline({
        scrollTrigger: { trigger: aboutRef.current, start: 'top 75%' },
      });
      aboutTl
        .from('.about__label', { opacity: 0, x: -40, duration: 0.5 })
        .from('.about__title', { opacity: 0, y: 50, rotationX: -15, duration: 0.7, transformPerspective: 800 }, '-=0.2')
        .from('.about__text', {
          opacity: 0, y: 40, filter: 'blur(6px)',
          duration: 0.6, stagger: 0.15,
        }, '-=0.3')
        .from('.about__feature', {
          opacity: 0, y: 40, scale: 0.8, rotationY: 20,
          duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
          transformPerspective: 600,
        }, '-=0.2');

      /* Categories - 3D entrance */
      gsap.from('.cat-card', {
        scrollTrigger: { trigger: catRef.current, start: 'top 80%' },
        opacity: 0, z: -200, rotationY: 25, y: 80,
        duration: 0.8, stagger: 0.1, ease: 'power3.out',
        transformPerspective: 1000,
      });

      /* Stats - 3D flip in */
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
        opacity: 0, rotationX: -60, y: 60, scale: 0.7,
        duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)',
        transformPerspective: 800,
      });

      /* Schedule - 3D slide up */
      gsap.from('.sched-card', {
        scrollTrigger: { trigger: schedRef.current, start: 'top 80%' },
        opacity: 0, y: 100, rotationX: -20, z: -100,
        duration: 0.9, stagger: 0.25, ease: 'power3.out',
        transformPerspective: 1000,
      });

      /* CTA - 3D scale pop */
      gsap.from('.cta-box', {
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
        opacity: 0, y: 80, rotationX: -15, scale: 0.9,
        duration: 1, ease: 'power3.out',
        transformPerspective: 1000,
      });
    });

    return () => ctx.revert();
  }, []);

  const titleLetters = 'EMBLAZON'.split('');

  return (
    <div className="hm">
      <div ref={cursorRef} className="cursor-glow" />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="hero"
        onMouseMove={handleHeroMouse}
        onMouseLeave={handleHeroLeave}
      >
        <div className="hero__glow-orbs" aria-hidden="true">
          <div className="glow-orb glow-orb--1" />
          <div className="glow-orb glow-orb--2" />
          <div className="glow-orb glow-orb--3" />
        </div>
        <div className="hero__noise" />
        <div className="hero__stars-bg" />
        <div className="hero__corner-glow hero__corner-glow--left" />
        <div className="hero__corner-glow hero__corner-glow--right" />
        <Shapes3D />

        <div ref={heroContentRef} className="hero__content">
          <div className="hero__main-row">
            <div className="hero__title-box">
              <div className="hero__title-wrapper">
                <div className="hero__title-outline" aria-hidden="true">
                  EMBLAZON<br />2K26
                </div>
                <h1 className="hero__title" aria-label="EMBLAZON 2K26">
                  <div className="hero__title-line">
                    {titleLetters.map((l, i) => (
                      <span key={i} className="hero__letter" style={{ '--i': i }}>{l}</span>
                    ))}
                  </div>
                </h1>
                <div className="hero__year">2K26</div>
              </div>

              <p className="hero__tagline">
                THE ANNUAL CULTURAL FEST OF HMRITM
              </p>
            </div>

            <div className="hero__clock-box">
              <SunburstClock />
            </div>
          </div>

          <div className="hero__bottom-row">
            <div className="hero__countdown-wrap">
              {[
                { v: cd.d, l: 'days' },
                { v: cd.h, l: 'hours' },
                { v: cd.m, l: 'mins' },
                { v: cd.s, l: 'secs' },
              ].map(({ v, l }) => (
                <div key={l} className="cd-box cd-box--giant">
                  <span className="cd-num">{String(v).padStart(2, '0')}</span>
                  <span className="cd-lbl">{l}</span>
                </div>
              ))}
            </div>

            <div className="hero__cta-row">
              <a href={REGISTER_URL} className="hero__cta hero__cta--primary" target="_blank" rel="noopener noreferrer">
                <span>Register Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
              <Link to="/events" className="hero__cta hero__cta--ghost">
                Explore Events
              </Link>
            </div>
          </div>

          <div className="hero__scroll">
            <div className="hero__scroll-mouse"><div className="hero__scroll-wheel" /></div>
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div className="marquee-section">
        <Marquee speed={25}>
          CULTURAL &nbsp;✦&nbsp; MUSIC &nbsp;✦&nbsp; DANCE &nbsp;✦&nbsp; DRAMA &nbsp;✦&nbsp; LITERARY &nbsp;✦&nbsp; STAR EVENING &nbsp;✦&nbsp; FASHION PARADE &nbsp;✦&nbsp; RAPPING &nbsp;✦&nbsp; SOLO SINGING &nbsp;✦&nbsp; GROUP DANCE &nbsp;✦&nbsp;
        </Marquee>
      </div>

      {/* ═══════════ ABOUT ═══════════ */}
      <section ref={aboutRef} className="about">
        <div className="about__inner">
          <span className="about__label section-label">About The Fest</span>
          <h2 className="about__title section-title">
            Where Talent Meets <span>Celebration</span>
          </h2>
          <p className="about__text">
            Emblazon is not just a fest — it's a two-day hurricane of energy, talent, and unforgettable
            moments. From electrifying dance battles to soulful musical performances, from intense debates
            to the glamour of the fashion parade — every corner of HMRITM comes alive.
          </p>
          <p className="about__text">
            Open to all colleges across Delhi-NCR, Emblazon 2K26 is your stage to compete, perform,
            create, and celebrate the best of what college life has to offer.
          </p>
          <div className="about__features">
            {['🎤 Live Performances', '🏆 30+ Competitions', '🎨 Art & Poetry', '⭐ Star Evening', '🎪 Open to All', '📸 Memories Forever'].map(f => (
              <div key={f} className="about__feature">{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section ref={catRef} className="cats">
        <span className="section-label">What&apos;s On</span>
        <h2 className="section-title">Event <span>Categories</span></h2>
        <div className="cat-grid">
          {categories.map((c) => <CatCard3D key={c.name} cat={c} />)}
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-item__icon">{s.icon}</span>
              <span className="stat-item__num">{s.num}</span>
              <span className="stat-item__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ MARQUEE 2 ═══════════ */}
      <div className="marquee-section marquee-section--reverse">
        <Marquee speed={35}>
          EMBLAZON 2K26 &nbsp;✦&nbsp; HMRITM DELHI &nbsp;✦&nbsp; MARCH 15–16 &nbsp;✦&nbsp; REGISTER NOW &nbsp;✦&nbsp; EMBLAZON 2K26 &nbsp;✦&nbsp; HMRITM DELHI &nbsp;✦&nbsp; MARCH 15–16 &nbsp;✦&nbsp;
        </Marquee>
      </div>

      {/* ═══════════ SCHEDULE ═══════════ */}
      <section ref={schedRef} className="schedule">
        <span className="section-label">The Lineup</span>
        <h2 className="section-title">Two Days of <span>Pure Energy</span></h2>
        <div className="sched-grid">
          <SchedCard3D day={1} date="March 15, 2026" theme="Ignite" variant="1"
            desc="The opening day sets the stage on fire with solo performances, literary competitions, and crowd favourites."
            items={['Fashion Parade', 'Rapping Battle', 'Solo Singing & Dance', 'Debate Competition', 'Treasure Hunt', 'Street Play', 'Poetria & Shayari', '+ many more']}
          />
          <SchedCard3D day={2} date="March 16, 2026" theme="Blaze" variant="2"
            desc="The grand finale — group acts, dramatic performances, creative showcases, and the legendary Star Evening."
            items={['Mr. & Ms. Emblazon', 'Group Dance Battle', 'One Act Play', 'Rangoli & Tech Art', 'Bollywood Faceoff', 'Nach Baliye (Duet)', '⭐ Star Evening']}
          />
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="cta-section">
        <div className="cta-box">
          <div className="cta-box__orbs" aria-hidden="true">
            <div className="cta-orb cta-orb--1" />
            <div className="cta-orb cta-orb--2" />
          </div>
          <h2>Ready to be part of something <span>extraordinary</span>?</h2>
          <p>March 15–16, 2026 · HMRITM, Delhi</p>
          <a href={REGISTER_URL} className="hero__cta hero__cta--primary hero__cta--lg" target="_blank" rel="noopener noreferrer">
            <span>Register Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <h3>EMBLAZON<span>2K26</span></h3>
            <p>HMR Institute of Technology & Management, Delhi</p>
          </div>
          <div className="footer__links">
            <Link to="/events">Events</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/team">Team</Link>
            <Link to="/sponsors">Sponsors</Link>
          </div>
          <div className="footer__social">
            <a href="#" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
            <a href="#" aria-label="YouTube"><i className="ri-youtube-line"></i></a>
            <a href="#" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
            <a href="#" aria-label="Twitter"><i className="ri-twitter-fill"></i></a>
          </div>
        </div>
        <p className="footer__copy">© 2026 Emblazon · HMRITM, Delhi. All rights reserved.</p>
      </footer>
    </div>
  );
}
