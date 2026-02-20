import { useEffect, useRef } from 'react';

export default function Starfield({ starCount = 120, speed = 0.3 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animId;
        let stars = [];
        let w = 0;
        let h = 0;
        let isVisible = true;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
            const rect = canvas.parentElement.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initStars = () => {
            stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * 3 + 0.5,
                opacity: Math.random() * 0.7 + 0.3,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            }));
        };

        const draw = () => {
            if (!isVisible) {
                animId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
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

                // Glow — simple larger circle (no gradient, much faster)
                ctx.globalAlpha = alpha * 0.25;
                ctx.fillStyle = 'rgb(190, 210, 255)';
                ctx.beginPath();
                ctx.arc(star.x, star.y, radius * 2, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.globalAlpha = alpha;
                ctx.fillStyle = 'rgb(235, 240, 255)';
                ctx.beginPath();
                ctx.arc(star.x, star.y, radius * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(draw);
        };

        resize();
        initStars();
        draw();

        // Pause when off-screen
        const io = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        io.observe(canvas);

        const ro = new ResizeObserver(() => { resize(); });
        ro.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            io.disconnect();
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
