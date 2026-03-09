import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './StarToast.css';
import ajayHoodaImg from '../../assets/star/ajay_hooda.jpg';

export default function StarToast({ appState }) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (appState === 'ready') {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000); // 3 seconds after loading screen finishes
            return () => clearTimeout(timer);
        }
    }, [appState]);

    const handleExplore = () => {
        setIsVisible(false);

        // Hash logic to navigate to star evening
        const hash = 'star-evening';
        const targetPath = '/';

        const scrollToElement = (retries = 0) => {
            const el = document.getElementById(hash);
            if (el) {
                // Let scroll triggers recalculate
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            } else if (retries < 15) {
                setTimeout(() => scrollToElement(retries + 1), 200);
            }
        };

        if (window.location.pathname === targetPath) {
            scrollToElement();
        } else {
            gsap.globalTimeline.clear();
            document.body.style.width = '';
            document.documentElement.style.width = '';
            window.scrollTo(0, 0);
            navigate(targetPath);
            setTimeout(() => scrollToElement(), 500);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="star-toast-container"
                    initial={{ opacity: 0, y: 50, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button className="star-toast-close" onClick={() => setIsVisible(false)} aria-label="Close notification">
                        ✕
                    </button>

                    <div className="star-toast-content">
                        <div className="star-toast-img-wrapper">
                            <div className="star-toast-glow"></div>
                            <img src={ajayHoodaImg} alt="Ajay Hooda" className="star-toast-img" />
                        </div>

                        <div className="star-toast-text">
                            <span className="star-toast-badge">STAR REVEALED</span>
                            <h4 className="star-toast-title">The Wait is Over!</h4>
                            <p className="star-toast-desc">Ajay Hooda is coming to Emblazon 2K26.</p>

                            <button className="star-toast-btn" onClick={handleExplore}>
                                Explore Now →
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
