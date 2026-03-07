import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import { motion } from 'motion/react';
import DotGrid from '../DotGrid';
import './gallery.css';
import DomeGallery from './DomeGallery';
import Starfield from './Starfield';

import fest01 from '../../assets/fest/fest_memory_01.JPG';
import fest03 from '../../assets/fest/fest_memory_03.JPG';
import fest04 from '../../assets/fest/fest_memory_04.JPG';
import fest05 from '../../assets/fest/fest_memory_05.JPG';
import fest06 from '../../assets/fest/fest_memory_06.jpg';
import fest07 from '../../assets/fest/fest_memory_07.jpg';
import fest08 from '../../assets/fest/fest_memory_08.jpg';
import fest09 from '../../assets/fest/fest_memory_09.jpg';
import fest010 from '../../assets/fest/fest_memory_010.jpg';
import fest011 from '../../assets/fest/fest_memory_011.jpeg';
import fest012 from '../../assets/fest/fest_memory_012.png';
import fest013 from '../../assets/fest/fest_memory_013.jpg';
import fest014 from '../../assets/fest/fest_memory_014.jpg';
import fest015 from '../../assets/fest/fest_memory_015.jpeg';
import fest1 from '../../assets/fest/fest_memory_1.jpeg';
import fest2 from '../../assets/fest/fest_memory_2.jpeg';
import fest3 from '../../assets/fest/fest_memory_3.jpeg';
import fest6 from '../../assets/fest/fest_memory_6.jpeg';
import fest9 from '../../assets/fest/fest_memory_9.jpeg';
import fest16 from '../../assets/fest/fest_memory_16.jpeg';
import fest17 from '../../assets/fest/fest_memory_17.jpeg';
import fest18 from '../../assets/fest/fest_memory_18.jpeg';
import fest19 from '../../assets/fest/fest_memory_19.jpeg';

const domeImages = [
  { src: fest01, alt: 'Emblazon fest' },
  { src: fest03, alt: 'Emblazon fest' },
  { src: fest04, alt: 'Emblazon fest' },
  { src: fest05, alt: 'Emblazon fest' },
  { src: fest06, alt: 'Emblazon fest' },
  { src: fest07, alt: 'Emblazon fest' },
  { src: fest08, alt: 'Emblazon fest' },
  { src: fest09, alt: 'Emblazon fest' },
  { src: fest010, alt: 'Emblazon fest' },
  { src: fest011, alt: 'Emblazon fest' },
  { src: fest012, alt: 'Emblazon fest' },
  { src: fest013, alt: 'Emblazon fest' },
  { src: fest014, alt: 'Emblazon fest' },
  { src: fest015, alt: 'Emblazon fest' },
  { src: fest1, alt: 'Emblazon fest' },
  { src: fest2, alt: 'Emblazon fest' },
  { src: fest3, alt: 'Emblazon fest' },
  { src: fest6, alt: 'Emblazon fest' },
  { src: fest9, alt: 'Emblazon fest' },
  { src: fest16, alt: 'Emblazon fest' },
  { src: fest17, alt: 'Emblazon fest' },
  { src: fest18, alt: 'Emblazon fest' },
  { src: fest19, alt: 'Emblazon fest' },
];

gsap.registerPlugin(Flip, ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const gallery = galleryRef.current;
    const section = sectionRef.current;
    if (!gallery || !section) return;

    // Exact same logic as the reference site
    const galleryItems = document.querySelectorAll('.gallery-page .gallery div');

    galleryItems.forEach((el) => el.classList.add('flip'));

    const state = Flip.getState(
      ['.gallery-page .gallery div', '.gallery-page .gallery div .img'],
      { props: 'borderRadius' }
    );

    galleryItems.forEach((el) => el.classList.remove('flip'));

    Flip.to(state, {
      scale: true,
      simple: true,
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: '+=300%',
        scrub: 2,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill(true));
      // Remove residual inline styles GSAP Flip sets on gallery items + .img
      const items = document.querySelectorAll('.gallery-page .gallery div');
      items.forEach((el) => {
        el.classList.remove('flip');
        el.style.cssText = '';
      });
      const imgs = document.querySelectorAll('.gallery-page .gallery .img');
      imgs.forEach((el) => {
        el.style.cssText = '';
      });
    };
  }, [location.key]);

  return (
    <div className="gallery-page">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={240}
          shockStrength={4}
          resistance={700}
          returnDuration={1.2}
        />
      </div>

      <section className="header-container">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>EMBLAZON <span>GALLERY</span> </h1>
          <p>Where every frame tells a story.</p>
        </motion.div>

        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <span>Keep Scrolling!</span>
          <div className="scroll-hint__arrows">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginTop: '-12px' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="gallery-container" ref={sectionRef}>
        <div className="gallery" ref={galleryRef}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <div className="img"></div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <section className="dome-section">
        <Starfield starCount={250} speed={0.4} />
        <motion.div
          className="dome-section__title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Memories of <span>Emblazon</span></h1>
        </motion.div>
        <motion.div
          className="dome-section__gallery"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <DomeGallery
            images={domeImages}
            grayscale={false}
            autoRotate={true}
            autoRotateSpeed={80}
            pointerFollow={false}
            overlayBlurColor="#050510"
            fit={0.85}
            minRadius={700}
          />
        </motion.div>
      </section>
    </div>
  );
}
