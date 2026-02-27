import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { events } from '../../data/eventsData';
import DotGrid from '../DotGrid';
import Dock from '../Dock/Dock';
import './events.css';

import culturalBanner from '../../assets/Extras/cultural.jpg';
import musicBanner from '../../assets/Extras/music.jpg';
import danceBanner from '../../assets/Extras/dance.jpg';
import literaryBanner from '../../assets/Extras/Literary_FineArts.jpg';
import starEveningBanner from '../../assets/Extras/StarEvening.jpg';

gsap.registerPlugin(ScrollTrigger);

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceQNyjkvTdnhg_4XZfMQJypM5svwxLRJWI77HHnO1OGL7PdQ/viewform'; // Replace with Google Form link when ready

/* Category config: accent colours, emojis, and Unsplash banner images
   Palette: warm coral → amber → rose → indigo → fuchsia → teal → gold */
const categoryConfig = {
  Cultural: {
    accent: '#F97066',
    icon: '🎭',
    banner: culturalBanner,
  },
  Fun: {
    accent: '#FBBF24',
    icon: '🎪',
    banner: '',
  },
  Drama: {
    accent: '#FB7185',
    icon: '🎬',
    banner: '',
  },
  Music: {
    accent: '#818CF8',
    icon: '🎵',
    banner: musicBanner,
  },
  Dance: {
    accent: '#E879F9',
    icon: '💃',
    banner: danceBanner,
  },
  'Literary/Fine Arts': {
    accent: '#2DD4BF',
    icon: '🎨',
    banner: literaryBanner,
  },
  'Star Evening': {
    accent: '#FCD34D',
    icon: '⭐',
    banner: starEveningBanner,
  },
};

const getCategoryConfig = (cat) =>
  categoryConfig[cat] || { accent: '#FFD700', icon: '✨', banner: '' };

/* ── Event Card ── */
const EventCard = ({ event, index, onImageClick }) => {
  const config = getCategoryConfig(event.category);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 5;
    const rotX = ((cy - y) / cy) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 15%, transparent), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      className="ev-card"
      style={{ '--accent': config.accent, '--i': index }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className="ev-card__cursor-glow" />
      <div className="ev-card__accent-line" />

      {event.image && (
        <div
          className="ev-card__poster-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            onImageClick(event.image);
          }}
          title="Click to view poster"
        >
          <img
            src={event.image}
            alt={event.title}
            className="ev-card__poster"
            loading="lazy"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
      )}

      <div className="ev-card__header">
        <span className="ev-card__icon">{config.icon}</span>
        <span className="ev-card__category">{event.category}</span>
        <span className="ev-card__status" data-status={event.registrationStatus?.toLowerCase()}>
          {event.registrationStatus}
        </span>
      </div>
      <h3 className="ev-card__title">{event.title}</h3>
      <p className="ev-card__desc">{event.description}</p>
      <div className="ev-card__footer">
        <div className="ev-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <span>{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="ev-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          <span>{event.time}</span>
        </div>
        <div className="ev-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span>{event.location}</span>
        </div>
      </div>
      {event.category !== 'Star Evening' && (
        <a
          href={REGISTER_URL}
          className="ev-card__register-btn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Register →
        </a>
      )}
    </div>
  );
};

/* ── Section with Banner ── */
const EventSection = ({ title, events: sectionEvents, bannerUrl, accent, onImageClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !sectionEvents.length) return;

    let ctx;
    // Use requestAnimationFrame to ensure DOM is fully painted before setting up animations
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const cards = el.querySelectorAll('.ev-card');
        if (cards.length === 0) return;

        // Check if section is already in viewport (common on page navigation)
        const rect = el.getBoundingClientRect();
        const isAlreadyVisible = rect.top < window.innerHeight;

        if (isAlreadyVisible) {
          // Section already in view — animate immediately without ScrollTrigger
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.05,
              delay: 0.1,
              onComplete: () => {
                gsap.set(cards, { clearProps: 'opacity,y,transform' });
                cards.forEach(card => card.classList.add('is-animated'));
              }
            }
          );
        } else {
          // Section below viewport — use ScrollTrigger
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
              onComplete: () => {
                gsap.set(cards, { clearProps: 'opacity,y,transform' });
                cards.forEach(card => card.classList.add('is-animated'));
              }
            }
          );
        }
      }, el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, [sectionEvents]);

  if (!sectionEvents.length) return null;

  const sorted = [...sectionEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div ref={sectionRef} className="ev-section">
      {bannerUrl && (
        <div className="ev-section__banner" style={{ '--accent': accent }}>
          <img
            src={bannerUrl}
            alt={title}
            className="ev-section__banner-img"
            onLoad={() => ScrollTrigger.refresh()}
          />
          <div className="ev-section__banner-overlay" />
          <h2 className="ev-section__banner-text">{title}</h2>
        </div>
      )}
      {!bannerUrl && title && (
        <h2 className="ev-section__title" style={{ color: accent }}>{title}</h2>
      )}
      <div className="ev-cards-grid">
        {sorted.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  );
};



/* ── Main Events Page ── */
const Event = () => {
  const heroRef = useRef(null);
  const [activeDay, setActiveDay] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const dockItems = [
    {
      id: 'all',
      label: 'All Days',
      icon: <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>ALL</span>,
    },
    {
      id: 'day1',
      label: 'Day 1 (Mar 17)',
      icon: <span style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>DAY 1</span>,
    },
    {
      id: 'day2',
      label: 'Day 2 (Mar 18)',
      icon: <span style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>DAY 2</span>,
    },
  ];

  const filterByDay = (list) => {
    if (activeDay === 'all') return list;
    const targetDate = activeDay === 'day1' ? '2026-03-17' : '2026-03-18';
    return list.filter((e) => e.date === targetDate);
  };

  useEffect(() => {
    const refreshST = () => {
      ScrollTrigger.refresh();
    };

    const t1 = setTimeout(refreshST, 100);
    const t2 = setTimeout(refreshST, 500);
    const t3 = setTimeout(refreshST, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeDay, events]);

  /* Title text animation removed */

  // Cleanup only event-page ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      // Kill only ScrollTriggers created within the events page
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger?.closest?.('.ev-page')) {
          t.kill();
        }
      });
    };
  }, []);

  const mainEvents = filterByDay(events.filter((e) => e.category === 'Cultural' || e.category === 'Fun' || e.category === 'Drama'));
  const literaryEvents = filterByDay(events.filter((e) => e.category === 'Literary/Fine Arts'));
  const musicEvents = filterByDay(events.filter((e) => e.category === 'Music'));
  const danceEvents = filterByDay(events.filter((e) => e.category === 'Dance'));
  const starEvents = filterByDay(events.filter((e) => e.category === 'Star Evening'));

  return (
    <div className="ev-page">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div ref={heroRef} className="ev-hero">
        <h1 className="ev-hero__title">
          Emblazon <span>Events</span>
        </h1>
        <p className="ev-hero__sub">
          Explore the thrilling lineup of competitions, performances and creative showcases
        </p>
        <div className="ev-hero__line" />
        <Dock items={dockItems} activeItem={activeDay} onItemClick={setActiveDay} />
      </div>

      <div className="ev-content">
        <EventSection
          title="Cultural · Fun · Drama"
          events={mainEvents}
          bannerUrl={categoryConfig.Cultural.banner}
          accent={categoryConfig.Cultural.accent}
          onImageClick={setSelectedImage}
        />

        <EventSection
          title="Music"
          events={musicEvents}
          bannerUrl={categoryConfig.Music.banner}
          accent={categoryConfig.Music.accent}
          onImageClick={setSelectedImage}
        />

        <EventSection
          title="Dance"
          events={danceEvents}
          bannerUrl={categoryConfig.Dance.banner}
          accent={categoryConfig.Dance.accent}
          onImageClick={setSelectedImage}
        />

        <EventSection
          title="Literary & Fine Arts"
          events={literaryEvents}
          bannerUrl={categoryConfig['Literary/Fine Arts'].banner}
          accent={categoryConfig['Literary/Fine Arts'].accent}
          onImageClick={setSelectedImage}
        />

        <EventSection
          title="Star Evening"
          events={starEvents}
          bannerUrl={categoryConfig['Star Evening'].banner}
          accent={categoryConfig['Star Evening'].accent}
          onImageClick={setSelectedImage}
        />
      </div>


      {selectedImage && (
        <div className="ev-modal" onClick={() => setSelectedImage(null)}>
          <div className="ev-modal__close">✕</div>
          <img
            src={selectedImage}
            alt="Event Poster Full"
            className="ev-modal__image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Event;
