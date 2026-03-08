import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import DotGrid from '../DotGrid';
import './gallery.css';
import DomeGallery from './DomeGallery';
import Starfield from './Starfield';

import img1 from '../../assets/fest/fest_img1.JPG';
import img2 from '../../assets/fest/fest_img2.jpeg';
import img3 from '../../assets/fest/fest_img3.JPG';
import img4 from '../../assets/fest/fest_img4.jpeg';
import img5 from '../../assets/fest/fest_img5.JPG';
import img6 from '../../assets/fest/fest_img6.jpeg';
import img7 from '../../assets/fest/fest_img7.JPG';
import img8 from '../../assets/fest/fest_img8.JPG';
import img9 from '../../assets/fest/fest_img9.jpg';
import img10 from '../../assets/fest/fest_img10.jpeg';
import img11 from '../../assets/fest/fest_img11.jpg';
import img12 from '../../assets/fest/fest_img12.jpg';
import img13 from '../../assets/fest/fest_img13.jpg';
import img14 from '../../assets/fest/fest_img14.jpeg';
import img15 from '../../assets/fest/fest_img15.jpg';
import img16 from '../../assets/fest/fest_img16.jpeg';
import img17 from '../../assets/fest/fest_img17.png';
import img18 from '../../assets/fest/fest_img18.jpg';
import img19 from '../../assets/fest/fest_img19.jpg';
import img20 from '../../assets/fest/fest_img20.jpeg';
import img21 from '../../assets/fest/fest_img21.jpeg';
import img22 from '../../assets/fest/fest_img22.jpeg';
import img23 from '../../assets/fest/fest_img23.jpeg';
import img24 from '../../assets/fest/fest_img24.jpeg';

const domeImages = [
  { src: img1, alt: 'Emblazon fest memory' },
  { src: img2, alt: 'Emblazon fest memory' },
  { src: img3, alt: 'Emblazon fest memory' },
  { src: img4, alt: 'Emblazon fest memory' },
  { src: img5, alt: 'Emblazon fest memory' },
  { src: img6, alt: 'Emblazon fest memory' },
  { src: img7, alt: 'Emblazon fest memory' },
  { src: img8, alt: 'Emblazon fest memory' },
  { src: img9, alt: 'Emblazon fest memory' },
  { src: img10, alt: 'Emblazon fest memory' },
  { src: img11, alt: 'Emblazon fest memory' },
  { src: img12, alt: 'Emblazon fest memory' },
  { src: img13, alt: 'Emblazon fest memory' },
  { src: img14, alt: 'Emblazon fest memory' },
  { src: img15, alt: 'Emblazon fest memory' },
  { src: img16, alt: 'Emblazon fest memory' },
  { src: img17, alt: 'Emblazon fest memory' },
  { src: img18, alt: 'Emblazon fest memory' },
  { src: img19, alt: 'Emblazon fest memory' },
  { src: img20, alt: 'Emblazon fest memory' },
  { src: img21, alt: 'Emblazon fest memory' },
  { src: img22, alt: 'Emblazon fest memory' },
  { src: img23, alt: 'Emblazon fest memory' },
  { src: img24, alt: 'Emblazon fest memory' },
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
