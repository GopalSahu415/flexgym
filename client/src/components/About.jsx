import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const highlights = [
  {
    icon: '👊',
    title: 'Friendly Expert Trainers',
    desc: 'Our certified trainers design personalized programs to help you reach your goals faster.',
  },
  {
    icon: '✨',
    title: 'Clean & Hygienic Space',
    desc: 'We maintain strict hygiene standards so you can focus on your workout without distractions.',
  },
  {
    icon: '💰',
    title: 'Affordable Membership',
    desc: 'Premium fitness experience at prices that make sense. No hidden fees, ever.',
  },
  {
    icon: '⚡',
    title: 'State-of-the-Art Equipment',
    desc: 'Over 100+ modern machines and free weights to power every type of workout.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about section-padding">
      <div className="about-bg">
        <div className="about-grid" />
      </div>
      <div className="container about-container" ref={ref}>
        {/* Left side */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="section-label">About Flex Gym</p>
          <h2 className="section-title">
            MEERUT'S MOST
            <br />
            <span>TRUSTED</span>
            <br />
            FITNESS CENTER
          </h2>
          <p className="about-desc">
            Flex Gym is a modern fitness center in Meerut offering high-quality training,
            a clean environment, and professional trainers. We believe fitness is a lifestyle,
            not a phase — and we're here to make that journey empowering, exciting, and effective.
          </p>
          <p className="about-desc">
            Located opposite Vishal Mega Mart on Garh Road, we're conveniently accessible
            for residents across Meerut. Join our growing family of 500+ active members
            who have transformed their bodies and their lives.
          </p>

          <div className="about-numbers">
            {[
              { num: '500+', label: 'Happy Members' },
              { num: '10+', label: 'Pro Trainers' },
              { num: '5★', label: 'Google Rating' },
            ].map((n, i) => (
              <motion.div
                key={n.label}
                className="about-number"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                <div className="about-num-val">{n.num}</div>
                <div className="about-num-label">{n.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - highlights grid */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        >
          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <div className="highlight-icon">{h.icon}</div>
                <h3 className="highlight-title">{h.title}</h3>
                <p className="highlight-desc">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
