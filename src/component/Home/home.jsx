import { motion } from 'motion/react';
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import festVideo from '../../assets/fest/clgFest.mp4';
import './home.css';
import LogoLoop from './LogoLoop';
import TextCursor from './TextCursor';
import ElectricBorder from '../ElectricBorder/ElectricBorder';
import scheduleImg from "../../assets/events/day 1 and day 2 event.webp";

/* Social media icon assets */
import facebookLogo from '../../assets/social media/facebook.png';
import instagramLogo from '../../assets/social media/instagram.png';

/* Past sponsor logo assets */
import agroMania from '../../assets/sponsors/agro mania.webp';
import jambooree from '../../assets/sponsors/jambooree.png';
import smaaash from '../../assets/sponsors/smaaash.jpg';
import smartHand from '../../assets/sponsors/smart&hand.png';
import pepsiLogo from '../../assets/sponsors/Pepsi.svg';
import aceLogo from '../../assets/sponsors/ace.webp';
import allahabadBankLogo from '../../assets/sponsors/allahabad bank.jpg';
import codingNinjasLogo from '../../assets/sponsors/coding ninjas.avif';
import collegeDuniaLogo from '../../assets/sponsors/college dunia.jpg';
import madeEasyLogo from '../../assets/sponsors/made easy.jpg';
import punjabKesariLogo from '../../assets/sponsors/punjab kesari.png';
import sargamLogo from '../../assets/sponsors/sargam electronics.png';
import zebronicsLogo from '../../assets/sponsors/zebronics.webp';

/* Gallery marquee images */
import img1 from '../../assets/fest/fest_memory_01.JPG';
import img2 from '../../assets/fest/fest_memory_02.JPG';
import img3 from '../../assets/fest/fest_memory_03.JPG';
import img4 from '../../assets/fest/fest_memory_04.JPG';
import img5 from '../../assets/fest/fest_memory_05.JPG';
import img6 from '../../assets/fest/fest_memory_06.jpg';
import starTeaser from '../../assets/fest/starTeaser.png';

const socialLogos = [
  { src: instagramLogo, alt: "Instagram", href: "https://instagram.com/emblazon_hmritm" },
  { src: facebookLogo, alt: "Facebook", href: "https://facebook.com/emblazon_2k25/" },
];

gsap.registerPlugin(ScrollTrigger);

const FeaturedEventsScroll = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  /* Reset on mount so navigating back always starts fresh */
  useLayoutEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        transformOrigin: 'center center',
      });
    }

    /* Let the DOM settle + ScrollToTop finish, then recalculate all triggers */
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    return () => cancelAnimationFrame(refreshId);
  }, []);

  useGSAP(() => {
    gsap.set(textRef.current, { xPercent: -50, yPercent: -50, transformOrigin: 'center center' });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top top",
          scrub: 1,
        },
        top: "10%",
        left: "5%",
        xPercent: 0,
        yPercent: 0,
        scale: 0.4,
        transformOrigin: 'left top',
        ease: "power1.inOut"
      });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top top",
          scrub: 1,
        },
        top: "5%",
        left: "50%",
        xPercent: -50,
        yPercent: 0,
        scale: 0.5,
        transformOrigin: 'center top',
        ease: "power1.inOut"
      });
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="featured-video-section">
      <video className="highlights-video" autoPlay muted loop playsInline>
        <source src={festVideo} type="video/mp4" />
      </video>
      <div className="highlights-overlay"></div>
      <div ref={textRef} className="feat-title-sticky">
        <h2>🔥 HIGHLIGHTS</h2>
      </div>
    </div>
  );
};

const StarEveningTeaser = () => {
  const detailItems = [
    { icon: '📅', label: 'DATE', value: '18th March 2026' },
    { icon: '🕑', label: 'TIME', value: '2:00 PM — 4:00 PM' },
    { icon: '📍', label: 'VENUE', value: 'Main Stage' },
  ];

  /* Live analog clock state */
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hrDeg = hours * 30 + minutes * 0.5;

  /* Matrix question marks - generate columns */
  const matrixCols = 30;

  return (
    <section id="star-evening" className="star-teaser-section">
      {/* Matrix question marks background */}
      <div className="star-matrix-bg" aria-hidden="true">
        {[...Array(matrixCols)].map((_, col) => (
          <div key={col} className="matrix-col" style={{
            '--col-delay': `${Math.random() * 8}s`,
            '--col-dur': `${6 + Math.random() * 10}s`,
            '--col-opacity': `${0.04 + Math.random() * 0.04}`,
          }}>
            {[...Array(20)].map((_, row) => (
              <span key={row} className="matrix-char">?</span>
            ))}
          </div>
        ))}
      </div>

      <div className="star-teaser-content">
        {/* Image with ElectricBorder */}
        <motion.div
          className="star-teaser-image-col"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <ElectricBorder
            color="#e2ff05"
            speed={1.2}
            chaos={0.15}
            style={{ borderRadius: 32 }}
          >
            <div className="star-teaser-image-wrap">
              <img src={starTeaser} alt="Star Evening Teaser" className="star-teaser-img" />
              <div className="star-glow-effect" />
              <div className="star-img-overlay">
                <span className="star-coming-badge">
                  <span className="badge-dot" />
                  STAY TUNED
                </span>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Info column */}
        <div className="star-teaser-info">
          <motion.div
            className="star-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ✦ EXCLUSIVE PERFORMANCE ✦
          </motion.div>

          <motion.h2
            className="star-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            STAR <span className="star-title-highlight">EVENING</span>
          </motion.h2>

          <motion.p
            className="star-mystery-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <strong>Someone BIG is coming to ignite the stage.</strong><br />
            Get ready for a performance that will leave you breathless.
            <br /><em>The mystery unfolds soon...</em>
          </motion.p>

          <div className="star-details-grid">
            {detailItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="star-detail-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              >
                <span className="detail-icon">{item.icon}</span>
                <span className="detail-label">{item.label}</span>
                <span className="detail-value">{item.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Circular Analog Clock */}
          <motion.div
            className="star-clock-wrap"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, type: 'spring', stiffness: 150 }}
          >
            <div className="star-clock">
              <div className="clock-face">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="clock-mark" style={{ transform: `rotate(${i * 30}deg)` }}>
                    <div className="clock-mark-inner" />
                  </div>
                ))}
                <div className="clock-hand clock-hand-hr" style={{ transform: `rotate(${hrDeg}deg)` }} />
                <div className="clock-hand clock-hand-min" style={{ transform: `rotate(${minDeg}deg)` }} />
                <div className="clock-hand clock-hand-sec" style={{ transform: `rotate(${secDeg}deg)` }} />
                <div className="clock-center-dot" />
              </div>
              <div className="clock-ring-glow" />
            </div>
            <span className="clock-label">TICK TOCK...</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const aboutTextRef = useRef(null);

  const fireflies = useMemo(() => {
    return [...Array(50)].map((_, i) => {
      const colors = ['#A886F4', '#50C878', '#FF66B2', '#e2ff05', '#00faff'];
      const color = colors[i % colors.length];
      const size = Math.random() * 5 + 3;

      // Distribute evenly across 5 columns and 10 rows
      const col = i % 5;
      const row = Math.floor(i / 5);
      const leftBase = col * 20;
      const topBase = row * 10;

      return {
        id: i,
        width: `${size}px`,
        height: `${size}px`,
        left: `${leftBase + Math.random() * 15 + 2}%`,
        top: `${topBase + Math.random() * 8 + 1}%`,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
        animationDuration: `${Math.random() * 10 + 8}s`,
        animationDelay: `${Math.random() * 5}s`
      };
    });
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-03-17T00:00:00');
    const interval = setInterval(() => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <section className="emblazon-hero">
        <div className="hero-content-fest">
          <div className="hero-left-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hero-logo-wrapper">
              <h1 className="hero-emblazon-text">EMBLAZON</h1>
            </motion.div>

            <motion.h2 className="hero-subtitle-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
              <i>The Cultural Fest of HMRITM</i>
            </motion.h2>

            <motion.div className="hero-dates-modern" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p className="hero-dates-text">
                <span className="hero-dates-highlight">17th & 18th</span> March 2026
              </p>
            </motion.div>

            <motion.div className="hero-actions-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
              <div className="hero-actions-title">
                <span className="dot"></span> CONNECT
              </div>
              <div className="hero-actions">
                <LogoLoop logos={socialLogos} speed={40} direction="left" logoHeight={35} gap={30} hoverSpeed={0} scaleOnHover ariaLabel="Social Media links" />
              </div>
            </motion.div>
          </div>

          <div className="hero-right-col">
            <motion.div
              className="hero-timer-wrapper"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div className="neon-ring ring-1"></div>
              <div className="neon-ring ring-2"></div>

              <div className="modern-timer-container">
                <div className="pendulum-container modern-pendulum">
                  <div className="pendulum-pivot"></div>
                  <div className="pendulum-arm"></div>
                  <div className="pendulum-bob"></div>
                </div>

                <div className="modern-countdown-grid">
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div key={unit} className="modern-time-box">
                      <svg className="modern-time-svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48"></circle>
                      </svg>
                      <div className="modern-time-content">
                        <span className="modern-time-val">{timeLeft[unit]}</span>
                        <span className="modern-time-label">{unit.toUpperCase().replace(/S$/, '')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </section >

      <div className="gallery-marquee-wrap">
        <div className="gallery-marquee-inner">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="gallery-marquee-track">
              {[img5, img6, img1, img2, img3, img4, img5, img6].map((src, i) => (
                <img key={i} src={src} className="gal-mq-img" alt="Gallery" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="about-emblazon-section">
        <div className="brutalist-marquee-container">
          <div className="brutalist-marquee">
            <span>🚀 REGISTRATIONS LIVE ✦ THE ULTIMATE CULTURAL EXPERIENCE ✦ UNLEASH YOUR TALENT ✦ </span>
            <span>🚀 REGISTRATIONS LIVE ✦ THE ULTIMATE CULTURAL EXPERIENCE ✦ UNLEASH YOUR TALENT ✦ </span>
          </div>
        </div>

        <div className="about-emblazon-content" ref={aboutTextRef}>
          <h2 className="about-title">
            ✨ About <span>EMBLAZON</span>
          </h2>

          <div className="about-text-container">
            <p className="about-p">
              EMBLAZON is the flagship cultural fest of HMR Institute of Technology & Management, celebrating creativity, talent, and passion across music, dance, fashion, art, and innovation.
            </p>
            <p className="about-p">
              More than just a fest, EMBLAZON is a legacy — a platform where students from across colleges come together to perform, compete, collaborate, and create unforgettable memories.
            </p>
            <p className="about-p">
              From electrifying stage performances and fashion parades to rap battles, treasure hunts, and tech-creative showcases, EMBLAZON brings every form of expression under one vibrant celebration.
            </p>
            <p className="about-p">
              Every year, EMBLAZON lights up the HMRITM campus with energy, talent, and excitement — making it one of the most awaited events of the season.
            </p>

            <div className="about-buttons-wrapper">
              <Link to="/events" className="badge-pill explore-btn" style={{ textDecoration: 'none' }}>
                EXPLORE EVENTS
              </Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSceQNyjkvTdnhg_4XZfMQJypM5svwxLRJWI77HHnO1OGL7PdQ/viewform" target="_blank" rel="noopener noreferrer" className="badge-pill register-btn" style={{ textDecoration: 'none' }}>
                REGISTER NOW
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Time-Wise Event Schedule ── */}
      <section className="ev-schedule-banner">
        <div className="ev-schedule-glow ev-schedule-glow--red"></div>
        <div className="ev-schedule-glow ev-schedule-glow--blue"></div>

        {/* Floating Particles */}
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="ev-sched-particle"
            style={{
              width: ff.width,
              height: ff.height,
              left: ff.left,
              top: ff.top,
              background: ff.background,
              boxShadow: ff.boxShadow,
              animationDuration: ff.animationDuration,
              animationDelay: ff.animationDelay
            }}
          ></div>
        ))}

        <div className="ev-schedule-banner__content">
          <h2 className="ev-schedule-banner__title">
            Time-Wise Event <span>Schedule</span>
          </h2>
          <p className="ev-schedule-banner__sub">Day 1 (17th March) &amp; Day 2 (18th March) — Full Schedule</p>
          <div className="ev-schedule-banner__img-wrap">
            <ElectricBorder
              color="#00faff"
              speed={1}
              chaos={0.12}
              borderRadius={20}
              style={{ borderRadius: 20 }}
            >
              <img
                src={scheduleImg}
                alt="Day 1 and Day 2 Event Schedule"
                className="ev-schedule-banner__img"
                loading="lazy"
              />
            </ElectricBorder>
          </div>
        </div>
      </section>

      <section className="sponsors-marquee-section">
        <div className="sponsors-glow-orb sponsors-glow-orb--1"></div>
        <div className="sponsors-glow-orb sponsors-glow-orb--2"></div>

        <div className="sponsors-banner">
          <div className="sponsors-banner-line sponsors-banner-line--left"></div>
          <div className="sponsors-banner-center">
            <span className="sponsors-banner-tag">✦ TRUSTED BY THE BEST ✦</span>
            <h3 className="sponsors-banner-title">
              OUR PAST <span>SPONSORS</span>
            </h3>
            <p className="sponsors-banner-sub">Brands that believed in the EMBLAZON legacy</p>
          </div>
          <div className="sponsors-banner-line sponsors-banner-line--right"></div>
        </div>

        <div className="sponsors-tracks">
          <LogoLoop
            logos={[
              { src: agroMania, alt: "Agro Mania" },
              { src: jambooree, alt: "Jambooree" },
              { src: smaaash, alt: "Smaaash" },
              { src: smartHand, alt: "Smart & Hand" },
              { src: pepsiLogo, alt: "Pepsi" },
              { src: aceLogo, alt: "ACE" },
              { src: allahabadBankLogo, alt: "Allahabad Bank" },
            ]}
            speed={80}
            direction="right"
            logoHeight={70}
            gap={60}
            pauseOnHover={false}
            className="sponsors-marquee-loop"
          />
          <LogoLoop
            logos={[
              { src: codingNinjasLogo, alt: "Coding Ninjas" },
              { src: collegeDuniaLogo, alt: "College Dunia" },
              { src: madeEasyLogo, alt: "Made Easy" },
              { src: punjabKesariLogo, alt: "Punjab Kesari" },
              { src: sargamLogo, alt: "Sargam Electronics" },
              { src: zebronicsLogo, alt: "Zebronics" },
            ]}
            speed={80}
            direction="left"
            logoHeight={70}
            gap={60}
            pauseOnHover={false}
            className="sponsors-marquee-loop"
          />
        </div>
      </section>

      <FeaturedEventsScroll />
      <StarEveningTeaser />
      <TextCursor spacing={60} followMouseDirection randomFloat exitDuration={0.4} removalInterval={25} maxPoints={6} />
    </div >
  );
}
