import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DotGrid from '../DotGrid';
import './sponsors.css';
import infoStechnologiesLogo from '../../assets/sponsors/infoStechnologies.png';
import karunamritLogo from '../../assets/sponsors/karunamrit.jpeg';
import laPinozLogo from "../../assets/sponsors/La Pino'z Pizza.jpeg";
import PetroLogo from '../../assets/sponsors/petro.jpeg';
import cakery from '../../assets/sponsors/cakery.jpg';
import smaaash from '../../assets/sponsors/smaaash.jpg';
import skippi from '../../assets/sponsors/Skippi.webp';
import WowMomo from '../../assets/sponsors/Wow_Momo.jpg';

const sponsorsList = [
  {
    name: 'InfoS Technologies',
    logo: infoStechnologiesLogo,
    badge: 'Technology Partner',
  },
  {
    name: 'Karunamrit',
    logo: karunamritLogo,
    badge: 'Gifting Sponsor',
  },
  {
    name: "La Pino'z Pizza",
    logo: laPinozLogo,
    badge: 'Food Sponsor',
  },
  {
    name: 'Petro Photo Booth',
    logo: PetroLogo,
    badge: 'Photography Partner',
  },
  {
    name: 'Cakery',
    logo: cakery,
    badge: 'Gifting sponsor',
  },
  {
    name: 'Smaaash',
    logo: smaaash,
    badge: 'Entertainment Partner',
  },
  {
    name: 'Skippi',
    logo: skippi,
    badge: 'Refreshing Partner',
  },
  {
    name: 'Wow Momo',
    logo: WowMomo,
    badge: 'Taste Partner',
  },
];

function SponsorCard({ sponsor, index }) {
  return (
    <div
      className="sponsor-card"
      style={{ '--delay': `${0.15 + index * 0.1}s` }}
    >
      {/* Floating particles */}
      <div className="sponsor-card__particles">
        <div className="sponsor-card__particle" />
        <div className="sponsor-card__particle" />
        <div className="sponsor-card__particle" />
      </div>

      {/* Logo */}
      <div className="sponsor-card__logo-wrap">
        <div className="sponsor-card__glow" />
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="sponsor-card__logo"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h3 className="sponsor-card__name">{sponsor.name}</h3>

      {/* Badge */}
      <div className="sponsor-card__badge">
        ✦ {sponsor.badge}
      </div>

      {/* Shine sweep */}
      <div className="sponsor-card__shine" />
    </div>
  );
}

export default function Sponsors() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const eyebrow = el.querySelector('.sponsors-hero__eyebrow');
    const title = el.querySelector('.sponsors-hero__title');
    const sub = el.querySelector('.sponsors-hero__sub');

    gsap.set([eyebrow, title, sub], { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    tl.to(title, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.25');
    tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25');

    return () => tl.kill();
  }, []);

  return (
    <div className="sponsors-page">
      {/* Background layers */}
      <div className="sponsors-bg-grid">
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
      <div className="sponsors-bg-gradient" />

      {/* Hero */}
      <div ref={heroRef} className="sponsors-hero">
        <div className="sponsors-hero__eyebrow">
          <span className="sponsors-hero__eyebrow-icon">★</span>
          <span className="sponsors-hero__eyebrow-text">Emblazon 2K26</span>
        </div>
        <h1 className="sponsors-hero__title">
          Our <span>Sponsors</span>
        </h1>
        <p className="sponsors-hero__sub">
          The incredible partners who make Emblazon 2K26 possible
        </p>
      </div>

      {/* Sponsor Showcase */}
      <div className="sponsors-showcase">
        {sponsorsList.map((sponsor, i) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} index={i} />
        ))}
      </div>

      {/* Bottom */}
      <div className="sponsors-bottom">
        <div className="sponsors-bottom__line" />
        <p style={{ color: "white" }} className="sponsors-bottom__text">
          Interested in partnering with us? Reach out at emblazon@hmritm.ac.in
        </p>
      </div>
    </div>
  );
}