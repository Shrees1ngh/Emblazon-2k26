import { useRef } from 'react';
import gsap from 'gsap';
import './Dock.css';

const Dock = ({ items, activeItem, onItemClick }) => {
    const dockRef = useRef(null);

    const handleMouseMove = (e) => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon');
        const dockRect = dock.getBoundingClientRect();
        const mouseX = e.clientX;

        icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const dist = Math.abs(mouseX - iconCenterX);

            // Calculate scale based on distance (macOS style)
            // Max scale 1.5 at center, dropping to 1 at 150px distance
            let scale = 1;
            if (dist < 150) {
                scale = 1 + (1.5 - 1) * (1 - dist / 150);
            }

            gsap.to(icon, {
                scale: scale,
                duration: 0.1,
                overwrite: 'auto'
            });
        });
    };

    const handleMouseLeave = () => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');

        gsap.to(icons, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };

    return (
        <div className="dock-container">
            <div
                ref={dockRef}
                className="dock"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={`dock-icon ${activeItem === item.id ? 'active' : ''}`}
                        onClick={() => onItemClick(item.id)}
                        aria-label={item.label}
                    >
                        <div className="dock-icon__inner">
                            {item.icon}
                        </div>
                        {activeItem === item.id && <div className="dock-dot" />}
                        <div className="dock-tooltip">{item.label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dock;
