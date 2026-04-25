import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './Hero.css';

const features = [
  { icon: '🏆', label: 'Certified Trainers' },
  { icon: '⚡', label: 'Modern Equipment' },
  { icon: '🕐', label: '24/7 Availability' },
  { icon: '🎯', label: 'Personal Training' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Background elements */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-gradient" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      {/* Scanline effect */}
      <div className="scanline" />

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot" />
            <span>#1 Gym in Meerut, Garh Road</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="hero-heading">
            TRANSFORM
            <br />
            <span className="heading-accent">YOUR BODY,</span>
            <br />
            TRANSFORM
            <br />
            <span className="heading-white">YOUR LIFE</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="hero-subheading">
            Best Gym in Meerut with Modern Equipment & Expert Trainers.
            <br />
            Start your fitness journey today — first trial is FREE.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="hero-ctas">
            <Link to="appointment" smooth duration={600} offset={-80} className="btn btn-primary hero-btn">
              <span>Join Now</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="appointment" smooth duration={600} offset={-80} className="btn btn-outline hero-btn">
              <span>Book Free Trial</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="hero-stats">
            {[
              { num: '500+', label: 'Active Members' },
              { num: '10+', label: 'Expert Trainers' },
              { num: '5+', label: 'Years Strong' },
              { num: '6AM', label: 'Opens Daily' },
            ].map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat-num">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
          <div className="hero-visual-inner">
            <div className="gym-silhouette">
              <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="athlete-svg">
                {/* Barbell */}
                <rect x="40" y="160" width="320" height="12" rx="6" fill="#00d4ff" opacity="0.9"/>
                <rect x="20" y="140" width="40" height="50" rx="8" fill="#00d4ff" opacity="0.7"/>
                <rect x="30" y="145" width="20" height="40" rx="4" fill="#00d4ff"/>
                <rect x="340" y="140" width="40" height="50" rx="8" fill="#00d4ff" opacity="0.7"/>
                <rect x="350" y="145" width="20" height="40" rx="4" fill="#00d4ff"/>
                <rect x="60" y="148" width="30" height="30" rx="4" fill="rgba(0,212,255,0.4)"/>
                <rect x="310" y="148" width="30" height="30" rx="4" fill="rgba(0,212,255,0.4)"/>
                {/* Body */}
                <ellipse cx="200" cy="260" rx="45" ry="65" fill="white" opacity="0.08"/>
                {/* Arms */}
                <path d="M155 200 Q100 200 80 166" stroke="white" strokeWidth="18" strokeLinecap="round" opacity="0.15"/>
                <path d="M245 200 Q300 200 320 166" stroke="white" strokeWidth="18" strokeLinecap="round" opacity="0.15"/>
                {/* Head */}
                <circle cx="200" cy="110" r="38" fill="white" opacity="0.08"/>
                {/* Legs */}
                <path d="M175 320 L155 430" stroke="white" strokeWidth="20" strokeLinecap="round" opacity="0.12"/>
                <path d="M225 320 L245 430" stroke="white" strokeWidth="20" strokeLinecap="round" opacity="0.12"/>
                {/* Glow rings */}
                <circle cx="200" cy="166" r="120" stroke="#00d4ff" strokeWidth="1" opacity="0.15" strokeDasharray="8 4"/>
                <circle cx="200" cy="166" r="160" stroke="#00d4ff" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 8"/>
              </svg>
              <div className="athlete-glow" />
            </div>

            {/* Feature badges */}
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                className={`feature-badge feature-badge-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
              >
                <span className="badge-icon">{f.icon}</span>
                <span className="badge-text">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>SCROLL</span>
        <div className="scroll-line">
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
