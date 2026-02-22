import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const videoSrc = new URL('../../assets/fest/Hmritm.mp4', import.meta.url).href;
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = el.querySelectorAll('.about-animate');

    gsap.set(children, { opacity: 0, y: 60 });

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: '#000' }}>
      {/* fixed full-screen video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={videoSrc}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      {/* fixed dark overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)',
          zIndex: 1
        }}
      />

      {/* spacer – first full screen is just the video */}
      <div style={{ height: '100dvh', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '2rem' }}>
        <div style={{ textAlign: 'center', animation: 'aboutBounce 2s ease-in-out infinite', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <span>Scroll to explore</span>
          <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginTop: '-12px' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <style>{`
          @keyframes aboutBounce {
            0%, 100% { transform: translateY(0); opacity: 0.7; }
            50% { transform: translateY(-12px); opacity: 1; }
          }
        `}</style>
      </div>

      {/* sticky about box – slides up from bottom, sticks at top: 20vh */}
      <div
        style={{
          position: 'sticky',
          top: '20vh',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3vw',
          paddingBottom: '8dvh'
        }}
      >
        <div
          ref={contentRef}
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(25, 10, 5, 0.82) 0%, rgba(45, 15, 5, 0.76) 100%)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 160, 0, 0.25)',
            borderTop: '1px solid rgba(255, 180, 0, 0.4)',
            borderRadius: 'clamp(12px, 3vw, 22px)',
            padding: 'clamp(1rem, 5vw, 2.6rem)',
            color: '#f8f8fc',
            lineHeight: 1.8,
            fontSize: 'clamp(0.95rem, 2.8vw, 1.06rem)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255, 160, 0, 0.15)',
            textAlign: 'justify',
            transform: 'translateZ(0)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 160, 0, 0.5)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.9), inset 0 2px 30px rgba(255, 160, 0, 0.25), 0 0 40px rgba(255, 160, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 160, 0, 0.25)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255, 160, 0, 0.15)';
          }}
        >
          <h1 className="about-animate" style={{ marginBottom: '1rem', background: 'linear-gradient(135deg, #ffc107, #ff5722)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', letterSpacing: '0.05em' }}>About Us</h1>
          <p className="about-animate" style={{ marginBottom: '1.2rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05em' }}>
            HMR Institute of Technology &amp; Management was established in the year 2002. It is spread over a sprawling lush green campus of 5 acres of land in the heart of Delhi.
          </p>
          <p className="about-animate" style={{ marginBottom: '1.2rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            <strong style={{ color: '#ffc107' }}>Nurturing the Technical Spirit</strong> – Conceived as a premier hub for engineering excellence, the HMR Institute of Technology and Management boasts of being among the reputed institutes. We recognize the absolute necessity for bringing up a new-age cerebral workforce in today's highly competitive environment.
          </p>
          <p className="about-animate" style={{ marginBottom: '1.2rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            The name HMR stands for the visionaries behind this institution: Late Sh. Hiralal, Late Smt. Mohan Devi, and Late Smt. Rita Gupta. The Institute provides an atmosphere ensuring rigorous academic excellence and unrivaled industry exposure. We equip our students with raw technical skills and profound emotional intelligence to grapple with the complexities of a dynamic technology-driven environment.
          </p>
          <p className="about-animate" style={{ marginBottom: '1.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            The institute stands for quality-embedded higher education on par with global standards, backed by state-of-the-art infrastructure. We aim to add immense value to crucial engineering developments through an unwavering focus on research and development.
          </p>
          <Link className="about-animate" to="/" style={{ color: '#1a1a2e', background: 'linear-gradient(135deg, #ffc107, #ff9800)', padding: '10px 24px', borderRadius: '30px', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.3)'; }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

