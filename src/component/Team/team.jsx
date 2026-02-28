import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import DotGrid from '../DotGrid';
import './OrganisingCommitee.css';
import shreeImg from '../../assets/team/shree.jpeg';
import shashankImg from '../../assets/team/shashank.jpeg';
import AbhinavJha from '../../assets/team/AbhinavJha.jpeg';
import AdityaKumar from '../../assets/team/AdityaKumar.jpeg';
import Harshita from '../../assets/team/Harshita.jpeg';
import Ishika from '../../assets/team/Ishika.jpeg';
import IshPandey from '../../assets/team/IshPandey.jpeg';
import Junaid from '../../assets/team/Junaid.jpeg';
import Kanak from '../../assets/team/Kanak.jpeg';
import Manya from '../../assets/team/Manya.jpeg';
import Mayank from '../../assets/team/Mayank.jpeg';
import MayankAggarwal from '../../assets/team/MayankAggarwal.jpeg';
import Palak from '../../assets/team/Palak.jpeg';
import Parth from '../../assets/team/parth.jpeg';
import Priyanshu from '../../assets/team/Priyanshu.jpeg';
import Rachit from '../../assets/team/Rachit.jpeg';
import Sarthak from '../../assets/team/Sarthak.jpeg';
import Anmol from '../../assets/team/AnmolJangra.jpeg';




gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG Social Icons ── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);



const coreTeam = [
  {
    id: 1,
    name: 'Shree Bhagwan',
    role: 'Website Team',
    image: shreeImg,
    socials: { linkedin: 'https://www.linkedin.com/in/shreebhagwan/', instagram: 'https://www.instagram.com/shree_s1ngh/', email: 'helloshreebhagwan@gmail.com' },
  },
  {
    id: 2,
    name: 'Shashank Pandey',
    role: 'Website Team',
    image: shashankImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/shashank-pandey-2a3724291/',
      instagram: 'https://instagram.com/shashankpandey4730',
      email: 'shashankp846@gmail.com',
    },
  },
    {
    id: 3,
    name: 'Anmol Jangra',
    role: 'Website Team',
    image: Anmol,
    socials: { linkedin: 'https://www.linkedin.com/in/anmol-jangra-5b2786322?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: "", email: "" },
  },
  {
    id: 4,
    name: 'Junaid',
    role: 'Design & Advertisement Team',
    image: Junaid,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 5,
    name: 'Manya',
    role: 'Design & Advertisement Team',
    image: Manya,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 6,
    name: 'Mayank Aggarwal',
    role: 'Decoration Team',
    image: MayankAggarwal,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 7,
    name: 'Rachit Sharma',
    role: 'Decoration Team',
    image: Rachit,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 8,
    name: 'Priyanshu',
    role: 'Decoration Team',
    image: Priyanshu,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 9,
    name: 'Abhinav Jha',
    role: 'Marketing Team',
    image: AbhinavJha,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 10,
    name: 'Ishika',
    role: 'Marketing Team',
    image: Ishika,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 11,
    name: 'Parth',
    role: 'Marketing Team',
    image: Parth,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 12,
    name: ' Ish Pandey',
    role: 'Operations Team',
    image: IshPandey,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 13,
    name: 'Harshita',
    role: 'Operations Team',
    image: Harshita,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 14,
    name: 'Mayank Malik',
    role: 'Cultural Team',
    image: Mayank,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 15,
    name: 'Sarthak Goel',
    role: 'Cultural Team',
    image: Sarthak,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 16,
    name: 'Kanak Sharma',
    role: 'Cultural Team',
    image: Kanak,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
  {
    id: 17,
    name: 'Palak Goyal',
    role: 'Stage & Awards Team',
    image: Palak,
    socials: { linkedin: 'https://www.linkedin.com/in/palak-goyal-924741319', instagram: 'https://www.instagram.com/p_goyal01?igsh=MWs5NGdyazl3MWdlZw==', email: 'Palakgoyal0119@gmail.com' },
  },
  
  {
    id: 18,
    name: 'Aditya Kumar',
    role: 'Stage & Awards Team',
    image: AdityaKumar,
    socials: { linkedin: '#', instagram: '#', email: '#' },
  },
];

/* ── 3D Tilt Card ── */
function MemberCard({ member, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || flipped) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 12;
    const rotX = ((cy - y) / cy) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(120,100,255,0.25), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tm-card ${flipped ? 'tm-card--flipped' : ''}`}
      style={{ '--i': index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped((f) => !f)}
    >
      <div ref={glowRef} className="tm-card__cursor-glow" />

      {/* Front face */}
      <div className="tm-card__face tm-card__front">
        <div className="tm-card__img-ring">
          <div className="tm-card__ring-glow" />
          <img src={member.image} alt={member.name} className="tm-card__img" />
        </div>
        <h3 className="tm-card__name">{member.name}</h3>
        <span className="tm-card__role">{member.role}</span>
        <div className="tm-card__hint">Click to flip ↻</div>
      </div>

      {/* Back face */}
      <div className="tm-card__face tm-card__back">
        <div className="tm-card__back-content">
          <h3 className="tm-card__back-name">{member.name}</h3>
          <span className="tm-card__back-role">{member.role}</span>
          <div className="tm-card__socials">
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tm-social tm-social--linkedin"
              onClick={(e) => e.stopPropagation()}
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="tm-social tm-social--instagram"
              onClick={(e) => e.stopPropagation()}
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={`mailto:${member.socials.email}`}
              className="tm-social tm-social--email"
              onClick={(e) => e.stopPropagation()}
              title="Email"
            >
              <EmailIcon />
            </a>
          </div>
          <div className="tm-card__hint">Click to flip back ↻</div>
        </div>
      </div>
    </div>
  );
}



/* ── Main Team Page ── */
export default function Team() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Animate header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const title = el.querySelector('.tm-hero__title');
    const sub = el.querySelector('.tm-hero__sub');
    const line = el.querySelector('.tm-hero__line');

    gsap.set([title, sub], { opacity: 0, y: 50 });
    gsap.set(line, { scaleX: 0 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    tl.to(line, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=0.2');

    return () => tl.kill();
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.tm-card');
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.92 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.4)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="tm-page">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={4}
          gap={18}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={100}
          shockRadius={220}
          shockStrength={4}
          resistance={700}
          returnDuration={1.2}
        />
      </div>

      <div ref={headerRef} className="tm-hero">
        <h1 className="tm-hero__title">
          Meet Our <span>Team</span>
        </h1>
        <p className="tm-hero__sub">
          The brilliant minds behind Emblazon 2K26
        </p>
        <div className="tm-hero__line" />
      </div>

      <div className="tm-content">
        <div ref={gridRef} className="tm-grid">
          {coreTeam.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
