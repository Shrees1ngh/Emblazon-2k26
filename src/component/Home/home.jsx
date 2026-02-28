import { motion } from 'motion/react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import festVideo from '../../assets/fest/clgFest.mp4';
import './home.css';
import LogoLoop from './LogoLoop';
import TextCursor from './TextCursor';

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
import img1 from '../../assets/fest/01.JPG';
import img2 from '../../assets/fest/02.JPG';
import img3 from '../../assets/fest/03.JPG';
import img4 from '../../assets/fest/04.JPG';
import img5 from '../../assets/fest/05.JPG';
import img6 from '../../assets/fest/06.jpg';

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

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const aboutTextRef = useRef(null);

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

        <TextCursor spacing={60} followMouseDirection randomFloat exitDuration={0.4} removalInterval={25} maxPoints={6} />
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

      <section className="sponsors-marquee-section">
        <h3 className="past-sponsors-heading">OUR PAST SPONSORS</h3>
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
          speed={100}
          direction="right"
          logoHeight={80}
          gap={100}
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
          speed={100}
          direction="left"
          logoHeight={80}
          gap={100}
          pauseOnHover={false}
          className="sponsors-marquee-loop"
        />
      </section>

      <FeaturedEventsScroll />
    </div >
  );
}
