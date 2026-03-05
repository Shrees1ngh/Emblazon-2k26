import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { events } from '../../data/eventsData';
import './EventSchedule.css';

/* Category config */
const catMeta = {
    Cultural: { color: '#F97066', bg: 'rgba(249,112,102,0.10)', icon: '🎭' },
    Fun: { color: '#FBBF24', bg: 'rgba(251,191,36,0.10)', icon: '🎪' },
    Drama: { color: '#FB7185', bg: 'rgba(251,113,133,0.10)', icon: '🎬' },
    Music: { color: '#818CF8', bg: 'rgba(129,140,248,0.10)', icon: '🎵' },
    Dance: { color: '#E879F9', bg: 'rgba(232,121,249,0.10)', icon: '💃' },
    'Literary/Fine Arts': { color: '#2DD4BF', bg: 'rgba(45,212,191,0.10)', icon: '🎨' },
};
const getMeta = (c) => catMeta[c] || { color: '#FFD700', bg: 'rgba(255,215,0,0.1)', icon: '✨' };

/* Parse "10:30 AM" → minutes from midnight for sorting */
const parseTime = (t) => {
    if (!t || t === 'Whole Day') return -1;
    const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return 0;
    let h = +m[1]; const min = +m[2]; const p = m[3].toUpperCase();
    if (p === 'PM' && h !== 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    return h * 60 + min;
};

const EventSchedule = () => {
    const [activeDay, setActiveDay] = useState('day1');
    const listRef = useRef(null);

    const day1 = useMemo(() =>
        events.filter(e => e.date === '2026-03-17').sort((a, b) => parseTime(a.time) - parseTime(b.time)),
        []);
    const day2 = useMemo(() =>
        events.filter(e => e.date === '2026-03-18').sort((a, b) => parseTime(a.time) - parseTime(b.time)),
        []);

    const activeEvents = activeDay === 'day1' ? day1 : day2;

    /* Scroll list to top when switching days */
    useEffect(() => {
        listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeDay]);

    return (
        <section className="sched-section">
            {/* Decorative elements */}
            <div className="sched-glow sched-glow--1" />
            <div className="sched-glow sched-glow--2" />

            {/* Header */}
            <div className="sched-header">
                <span className="sched-badge">✦ FULL SCHEDULE ✦</span>
                <h2 className="sched-heading">
                    Event <span>Schedule</span>
                </h2>
                <p className="sched-sub">Complete time-wise lineup for both days</p>
            </div>

            {/* Day Switcher */}
            <div className="sched-tabs">
                <button
                    className={`sched-tab ${activeDay === 'day1' ? 'sched-tab--active' : ''}`}
                    onClick={() => setActiveDay('day1')}
                >
                    <span className="sched-tab__dot" />
                    <span className="sched-tab__label">DAY 1</span>
                    <span className="sched-tab__date">17th March</span>
                </button>
                <button
                    className={`sched-tab ${activeDay === 'day2' ? 'sched-tab--active' : ''}`}
                    onClick={() => setActiveDay('day2')}
                >
                    <span className="sched-tab__dot" />
                    <span className="sched-tab__label">DAY 2</span>
                    <span className="sched-tab__date">18th March</span>
                </button>
            </div>

            {/* Events List */}
            <div className="sched-list-wrap" ref={listRef}>
                <div className="sched-table-head">
                    <span className="sched-th sched-th--sno">#</span>
                    <span className="sched-th sched-th--event">Event</span>
                    <span className="sched-th sched-th--time">Time</span>
                    <span className="sched-th sched-th--venue">Venue</span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        className="sched-events"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        {activeEvents.map((ev, i) => {
                            const meta = getMeta(ev.category);
                            return (
                                <motion.div
                                    key={ev.id}
                                    className="sched-row"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}
                                >
                                    <span className="sched-cell sched-cell--sno" style={{ color: meta.color }}>{i + 1}</span>
                                    <span className="sched-cell sched-cell--event">
                                        <span className="sched-cat-dot" style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}40` }} />
                                        <span className="sched-ev-name">{ev.title}</span>
                                        <span className="sched-cat-pill" style={{ color: meta.color, background: meta.bg }}>{ev.category}</span>
                                    </span>
                                    <span className="sched-cell sched-cell--time">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        {ev.time}
                                    </span>
                                    <span className="sched-cell sched-cell--venue">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {ev.location}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Event count badge */}
            <div className="sched-footer">
                <span className="sched-count">{activeEvents.length} events</span>
            </div>
        </section>
    );
};

export default EventSchedule;
