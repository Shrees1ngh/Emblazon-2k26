import { useRef } from 'react';
import gsap from 'gsap';
import './Dock.css';

const Dock = ({ items, activeItem, onItemClick }) => {
    const dockRef = useRef(null);

    const handleMouseMove = (e) => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon');
        const mouseX = e.clientX;

        icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const dist = Math.abs(mouseX - iconCenterX);

            let scale = 1;
            // Less extreme scaling for pills (1.15x instead of 1.3x)
            if (dist < 150) {
                scale = 1 + (1.15 - 1) * Math.cos((dist / 150) * (Math.PI / 2));
            }

            const baseWidth = icon.offsetWidth || 60;
            const marginX = (scale - 1) * baseWidth / 2;

            gsap.to(icon, {
                scale: scale,
                marginLeft: marginX,
                marginRight: marginX,
                y: -(scale - 1) * 15,
                duration: 0.15,
                ease: 'power2.out',
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
            marginLeft: 0,
            marginRight: 0,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
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
