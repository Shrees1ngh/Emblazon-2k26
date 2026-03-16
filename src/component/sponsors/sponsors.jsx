import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import DotGrid from '../DotGrid';
import './sponsors.css';
import infoStechnologiesLogo from '../../assets/sponsors/infoStechnologies.png';
import karunamritLogo from '../../assets/sponsors/karunamrit.jpeg';
import laPinozLogo from "../../assets/sponsors/La Pino'z Pizza.jpeg";
import PetroLogo from '../../assets/sponsors/petro.jpeg';
import cakery from '../../assets/sponsors/cakery.jpg';
import smaaash from '../../assets/sponsors/smaaash.jpg';

gsap.registerPlugin(ScrollTrigger);

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
    badge: 'Sweet Partner',
  },
  {
    name: 'Smaaash',
    logo: smaaash,
    badge: 'Entertainment Partner',
  },
];

function SponsorCard({ sponsor, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: index * 0.12,
      ease: 'power3.out',
    });

    return () => tl.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="sponsor-card"
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

    gsap.set([eyebrow, title, sub], { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2');
    tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

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

      {/* Sponsor Showcase – 2×2 Grid */}
      <div className="sponsors-showcase">
        {sponsorsList.map((sponsor, i) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} index={i} />
        ))}
      </div>

      {/* Bottom */}
      <div className="sponsors-bottom">
        <div className="sponsors-bottom__line" />
        <p style={{ color: "white"}} className="sponsors-bottom__text">
          Interested in partnering with us? Reach out at emblazon@hmritm.ac.in
        </p>
      </div>
    </div>
  );
}