import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Gallery.css';

// Gallery items using gradient placeholders with descriptive labels
const galleryItems = [
  { id: 1, label: 'Main Gym Floor', category: 'Interior', gradient: 'linear-gradient(135deg, #0a1628 0%, #00293d 50%, #001f30 100%)', icon: '🏋️', tall: true },
  { id: 2, label: 'Free Weights Zone', category: 'Equipment', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a00 50%, #0d0d0d 100%)', icon: '💪', tall: false },
  { id: 3, label: 'Cardio Section', category: 'Equipment', gradient: 'linear-gradient(135deg, #001a1a 0%, #003333 50%, #001a1a 100%)', icon: '🏃', tall: false },
  { id: 4, label: 'Personal Training', category: 'Training', gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)', icon: '🎯', tall: true },
  { id: 5, label: 'CrossFit Arena', category: 'Training', gradient: 'linear-gradient(135deg, #1a0000 0%, #2d0000 50%, #1a0000 100%)', icon: '🔥', tall: false },
  { id: 6, label: 'Zumba Studio', category: 'Classes', gradient: 'linear-gradient(135deg, #001a0a 0%, #00331a 50%, #001a0a 100%)', icon: '💃', tall: false },
  { id: 7, label: 'Transformation Result', category: 'Results', gradient: 'linear-gradient(135deg, #1a1a00 0%, #2d2d00 50%, #1a1a00 100%)', icon: '⭐', tall: false },
  { id: 8, label: 'Recovery Room', category: 'Facilities', gradient: 'linear-gradient(135deg, #00001a 0%, #00003d 50%, #00001a 100%)', icon: '🧘', tall: false },
];

const categories = ['All', 'Interior', 'Equipment', 'Training', 'Classes', 'Results'];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="gallery-bg" />
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Inside Flex Gym</p>
          <h2 className="section-title">
            THE <span>GALLERY</span>
          </h2>
          <p className="section-subtitle">
            A glimpse into your future fitness home.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="gallery-grid">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className={`gallery-item ${item.tall ? 'tall' : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="gallery-img" style={{ background: item.gradient }}>
                  <div className="gallery-icon">{item.icon}</div>
                  {/* Neon grid overlay */}
                  <div className="gallery-grid-overlay" />
                  <div className="gallery-neon-line" />
                </div>
                <div className="gallery-overlay">
                  <span className="gallery-category">{item.category}</span>
                  <span className="gallery-label">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="gallery-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="gallery-cta-text">Want to see it in person?</p>
          <a href="tel:+91XXXXXXXXXX" className="btn btn-outline">
            <span>Book a Free Visit</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
