import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import './gallery.css';
import DomeGallery from './DomeGallery';
import Starfield from './Starfield';

import fest1 from '../../assets/fest/1.jpeg';
import fest2 from '../../assets/fest/2.jpeg';
import fest3 from '../../assets/fest/3.jpeg';
import fest4 from '../../assets/fest/4.jpeg';
import fest6 from '../../assets/fest/6.jpeg';
import fest7 from '../../assets/fest/7.jpeg';
import fest8 from '../../assets/fest/8.jpeg';
import fest9 from '../../assets/fest/9.jpeg';

const domeImages = [
  { src: fest1, alt: 'Emblazon fest 1' },
  { src: fest2, alt: 'Emblazon fest 2' },
  { src: fest3, alt: 'Emblazon fest 3' },
  { src: fest4, alt: 'Emblazon fest 4' },
  { src: fest6, alt: 'Emblazon fest 6' },
  { src: fest7, alt: 'Emblazon fest 7' },
  { src: fest8, alt: 'Emblazon fest 8' },
  { src: fest9, alt: 'Emblazon fest 9' },
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
      <section className="header-container">
        <div className="title">
          <h1>EMBLAZON <span>GALLERY</span> </h1>
          <p>Where every frame tells a story.</p>
        </div>
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
        <div className="dome-section__title">
          <h1>Memories of <span>Emblazon</span></h1>
        </div>
        <div className="dome-section__gallery">
          <DomeGallery
            images={domeImages}
            grayscale={false}
            autoRotate={true}
            autoRotateSpeed={80}
            pointerFollow={false}
            overlayBlurColor="#0b1018"
            fit={0.85}
            minRadius={700}
          />
        </div>
      </section>
    </div>
  );
}
