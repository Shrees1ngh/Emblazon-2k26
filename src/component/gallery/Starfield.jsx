import { useEffect, useRef } from 'react';

export default function Starfield({ starCount = 200, speed = 0.3 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let stars = [];

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initStars = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                z: Math.random() * 3 + 0.5,
                opacity: Math.random() * 0.7 + 0.3,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            }));
        };

        const draw = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            ctx.clearRect(0, 0, w, h);

            for (const star of stars) {
                star.pulse += star.pulseSpeed;
                const twinkle = 0.5 + 0.5 * Math.sin(star.pulse);
                const alpha = star.opacity * twinkle;
                const radius = star.z * 0.8;

                // Slow drift upward
                star.y -= speed * star.z * 0.15;
                star.x += Math.sin(star.pulse * 0.5) * 0.08;

                // Wrap around
                if (star.y < -5) {
                    star.y = h + 5;
                    star.x = Math.random() * w;
                }
                if (star.x < -5) star.x = w + 5;
                if (star.x > w + 5) star.x = -5;

                // Glow
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, radius * 3
                );
                gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha})`);
                gradient.addColorStop(0.4, `rgba(180, 200, 255, ${alpha * 0.4})`);
                gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

                ctx.beginPath();
                ctx.arc(star.x, star.y, radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(star.x, star.y, radius * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(235, 240, 255, ${alpha})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        initStars();
        draw();

        const ro = new ResizeObserver(() => {
            resize();
        });
        ro.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, [starCount, speed]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
}
