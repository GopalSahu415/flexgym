import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-scroll';
import './Membership.css';

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    duration: '/month',
    tag: 'Starter',
    popular: false,
    features: [
      '✓ Gym Floor Access',
      '✓ Cardio Equipment',
      '✓ Locker Room Access',
      '✓ Group Classes (2/week)',
      '✓ Basic Fitness Assessment',
      '✗ Personal Training',
      '✗ Diet Consultation',
      '✗ Supplement Guidance',
    ],
  },
  {
    name: 'Standard',
    price: '₹1,799',
    duration: '/month',
    tag: 'Most Popular',
    popular: true,
    features: [
      '✓ Full Gym Access',
      '✓ All Equipment',
      '✓ Locker Room + Shower',
      '✓ Unlimited Group Classes',
      '✓ Monthly Assessment',
      '✓ 2 Personal Training Sessions',
      '✓ Diet Consultation',
      '✗ Supplement Guidance',
    ],
  },
  {
    name: 'Premium',
    price: '₹2,999',
    duration: '/month',
    tag: 'Elite',
    popular: false,
    features: [
      '✓ 24/7 Gym Access',
      '✓ All Premium Equipment',
      '✓ Private Locker',
      '✓ Unlimited Group Classes',
      '✓ Weekly Assessment',
      '✓ 8 Personal Training Sessions',
      '✓ Custom Diet Plan',
      '✓ Supplement Guidance',
    ],
  },
];

export default function Membership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="membership" className="membership section-padding">
      <div className="membership-bg">
        <div className="membership-grid" />
      </div>
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Membership Plans</p>
          <h2 className="section-title">
            CHOOSE YOUR <span>PLAN</span>
          </h2>
          <p className="section-subtitle">
            Flexible plans for every fitness level and budget. No contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="plans-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`plan-card ${plan.popular ? 'plan-popular' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
            >
              {plan.popular && <div className="popular-badge">⚡ Most Popular</div>}
              <div className="plan-tag">{plan.tag}</div>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price-block">
                <span className="plan-price">{plan.price}</span>
                <span className="plan-duration">{plan.duration}</span>
              </div>
              <div className="plan-divider" />
              <ul className="plan-features">
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className={`plan-feature ${f.startsWith('✗') ? 'plan-feature-no' : ''}`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="appointment"
                smooth
                duration={600}
                offset={-80}
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} plan-cta`}
              >
                <span>Join Now</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="plans-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          * Prices inclusive of GST. Annual plans available at 2 months free.
          Call us to know about student & corporate discounts.
        </motion.p>
      </div>
    </section>
  );
}
