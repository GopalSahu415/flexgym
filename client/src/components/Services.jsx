import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

const services = [
  {
    icon: '🏋️',
    title: 'Weight Training',
    desc: 'Build strength and sculpt your physique with free weights, machines, and expert programming tailored to your level.',
    tag: 'Strength',
  },
  {
    icon: '🏃',
    title: 'Cardio Training',
    desc: 'Burn fat and boost endurance with treadmills, cycles, ellipticals, and structured cardio programs.',
    tag: 'Endurance',
  },
  {
    icon: '🔥',
    title: 'CrossFit',
    desc: 'High-intensity functional training that combines strength, agility, and conditioning for peak performance.',
    tag: 'HIIT',
  },
  {
    icon: '💃',
    title: 'Zumba Classes',
    desc: 'Dance your way to fitness with our energetic Zumba sessions — fun, effective, and open to all levels.',
    tag: 'Dance Fitness',
  },
  {
    icon: '🎯',
    title: 'Personal Training',
    desc: 'One-on-one sessions with certified trainers who design a custom program exclusively for your body and goals.',
    tag: 'Personal',
  },
  {
    icon: '⚖️',
    title: 'Weight Loss Programs',
    desc: 'Science-backed, structured programs combining diet guidance, cardio, and resistance training for sustainable fat loss.',
    tag: 'Transformation',
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="services section-padding">
      <div className="services-bg" />
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">
            OUR <span>SERVICES</span>
          </h2>
          <p className="section-subtitle">
            From beginner to elite athlete — we have a program designed just for you.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
            >
              <div className="service-tag">{s.tag}</div>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
