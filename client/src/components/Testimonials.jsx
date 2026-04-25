import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Lost 18kg in 4 months',
    review: 'Flex Gym is genuinely the best gym in Meerut. The trainers understand your body, set realistic goals, and push you just enough. I lost 18kg in 4 months and I still can\'t believe it!',
    rating: 5,
    avatar: 'RS',
  },
  {
    name: 'Priya Agarwal',
    role: 'Zumba & Personal Training Member',
    review: 'Clean, well-maintained, and the Zumba classes are absolutely amazing! The staff is so welcoming and the female-friendly environment makes it very comfortable. Worth every rupee.',
    rating: 5,
    avatar: 'PA',
  },
  {
    name: 'Mohit Verma',
    role: 'Competitive Bodybuilder',
    review: 'The trainers here are very supportive and knowledgeable. They corrected my form on day one and I haven\'t had an injury since. The equipment is top-notch and always clean.',
    rating: 5,
    avatar: 'MV',
  },
  {
    name: 'Anjali Singh',
    role: 'Weight Loss Program Member',
    review: 'Affordable and absolutely worth it! I joined the weight loss program and the structured approach with diet and exercise together is what made the real difference. 100% recommend!',
    rating: 5,
    avatar: 'AS',
  },
  {
    name: 'Deepak Tyagi',
    role: 'CrossFit Enthusiast',
    review: 'Best gym in Meerut, period. The CrossFit sessions are intense and exciting. You can see the results in just weeks. The community here motivates you every single day.',
    rating: 5,
    avatar: 'DT',
  },
  {
    name: 'Kavita Rani',
    role: '6-month transformation member',
    review: 'I was nervous joining a gym for the first time but Flex Gym made it so easy. The trainers never make you feel judged. Such a positive, motivating atmosphere here.',
    rating: 5,
    avatar: 'KR',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" className="testimonials section-padding">
      <div className="testimonials-bg">
        <div className="testimonials-gradient" />
      </div>
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Member Stories</p>
          <h2 className="section-title">
            REAL <span>RESULTS</span>,
            <br />
            REAL PEOPLE
          </h2>
        </motion.div>

        <motion.div
          className="testimonials-layout"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Main featured review */}
          <div className="testimonial-featured">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testimonial-main"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{testimonials[active].review}</p>
                <div className="testimonial-stars">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonials[active].avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonials[active].name}</div>
                    <div className="author-role">{testimonials[active].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-controls">
              <button className="control-btn" onClick={prev} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="control-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
              <button className="control-btn" onClick={next} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Side reviews list */}
          <div className="testimonials-side">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                className={`testimonial-mini ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="mini-avatar">{t.avatar}</div>
                <div className="mini-info">
                  <div className="mini-name">{t.name}</div>
                  <div className="mini-role">{t.role}</div>
                </div>
                <div className="mini-stars">★★★★★</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Google Rating Banner */}
        <motion.div
          className="rating-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="rating-icon">⭐</div>
          <div className="rating-text">
            <strong>4.9/5</strong> on Google Reviews
          </div>
          <div className="rating-count">From 200+ verified reviews</div>
        </motion.div>
      </div>
    </section>
  );
}
