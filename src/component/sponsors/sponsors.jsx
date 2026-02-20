import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import DotGrid from '../DotGrid';
import './sponsors.css';
import smaaashLogo from '../../assets/sponsors/smaaash.jpg';
import smartHandLogo from '../../assets/sponsors/smart&hand.png';

gsap.registerPlugin(ScrollTrigger);

const sponsorsData = {
  title: [
    {
      name: 'Smaaash',
      logo: smaaashLogo,
      description: 'Powering Emblazon 2K26',
    },
  ],
  gold: [
    { name: 'Smart&Hand', logo: smartHandLogo },
    { name: 'Gold Sponsor 2', logo: '' },
  ],
  silver: [
    { name: 'Silver Sponsor 1', logo: '' },
    { name: 'Silver Sponsor 2', logo: '' },
    { name: 'Silver Sponsor 3', logo: '' },
  ],
  partners: [
    { name: 'Media Partner', logo: '' },
    { name: 'Food Partner', logo: '' },
    { name: 'Tech Partner', logo: '' },
    { name: 'Merch Partner', logo: '' },
  ],
};

const tierConfig = {
  title: { label: 'TITLE SPONSOR', accent: '#FFD700', icon: '👑' },
  gold: { label: 'GOLD SPONSORS', accent: '#FFA500', icon: '🥇' },
  silver: { label: 'SILVER SPONSORS', accent: '#C0C0C0', icon: '🥈' },
  partners: { label: 'PARTNERS', accent: '#7dd3fc', icon: '🤝' },
};

function SponsorCard({ sponsor, tier, index }) {
  const cardRef = useRef(null);
  const config = tierConfig[tier];

  return (
    <div
      ref={cardRef}
      className={`sponsor-card sponsor-card--${tier}`}
      style={{ '--accent': config.accent, '--delay': `${index * 0.1}s` }}
    >
      <div className="sponsor-card__glow" />
      <div className="sponsor-card__inner">
        <div className="sponsor-card__logo-wrap">
          {sponsor.logo ? (
            <img src={sponsor.logo} alt={sponsor.name} className="sponsor-card__logo" />
          ) : (
            <div className="sponsor-card__placeholder">
              <span className="sponsor-card__placeholder-icon">{config.icon}</span>
              <span className="sponsor-card__placeholder-text">{sponsor.name}</span>
            </div>
          )}
        </div>
        {sponsor.description && (
          <p className="sponsor-card__desc">{sponsor.description}</p>
        )}
        <div className="sponsor-card__shine" />
      </div>
    </div>
  );
}

function SponsorTier({ tier, sponsors }) {
  const tierRef = useRef(null);
  const config = tierConfig[tier];

  useEffect(() => {
    const el = tierRef.current;
    if (!el) return;

    const heading = el.querySelector('.sponsor-tier__heading');
    const cards = el.querySelectorAll('.sponsor-card');
    const line = el.querySelector('.sponsor-tier__line');

    gsap.set([heading, ...cards], { opacity: 0, y: 50 });
    if (line) gsap.set(line, { scaleX: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    if (line) {
      tl.to(line, { scaleX: 1, duration: 0.6, ease: 'power2.out' });
    }

    tl.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<0.1');
    tl.to(cards, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '<0.2');

    return () => {
      tl.kill();
    };
  }, []);

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div ref={tierRef} className={`sponsor-tier sponsor-tier--${tier}`}>
      <div className="sponsor-tier__line" style={{ background: config.accent }} />
      <h2 className="sponsor-tier__heading" style={{ color: config.accent }}>
        <span className="sponsor-tier__icon">{config.icon}</span>
        {config.label}
      </h2>
      <div className={`sponsor-tier__grid sponsor-tier__grid--${tier}`}>
        {sponsors.map((sponsor, i) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} tier={tier} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const heroRef = useRef(null);
  // Floating particles background removed


  // Hero text animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const title = el.querySelector('.sponsors-hero__title');
    const sub = el.querySelector('.sponsors-hero__sub');
    const divider = el.querySelector('.sponsors-hero__divider');

    gsap.set([title, sub], { opacity: 0, y: 40 });
    gsap.set(divider, { scaleX: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    tl.to(divider, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3');

    return () => tl.kill();
  }, []);

  return (
    <div className="sponsors-page">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={20}
          baseColor="#2A1A05"
          activeColor="#FFD700"
          proximity={100}
          shockRadius={200}
          shockStrength={6}
          resistance={600}
          returnDuration={1.5}
        />
      </div>

      <div ref={heroRef} className="sponsors-hero">
        <h1 className="sponsors-hero__title">
          Our <span>Sponsors</span>
        </h1>
        <p className="sponsors-hero__sub">
          The incredible partners who make Emblazon 2K26 possible
        </p>
        <div className="sponsors-hero__divider" />
      </div>

      <div className="sponsors-content">
        <SponsorTier tier="title" sponsors={sponsorsData.title} />
        <SponsorTier tier="gold" sponsors={sponsorsData.gold} />
        <SponsorTier tier="silver" sponsors={sponsorsData.silver} />
        <SponsorTier tier="partners" sponsors={sponsorsData.partners} />
      </div>

      <div className="sponsors-cta">
        <h2 className="sponsors-cta__title">Want to Sponsor Emblazon?</h2>
        <p className="sponsors-cta__text">
          Partner with us and reach thousands of students and tech enthusiasts
        </p>
        <a href="mailto:emblazon@hmritm.ac.in" className="sponsors-cta__btn">
          Become a Sponsor →
        </a>
      </div>
    </div>
  );
}