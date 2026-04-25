import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { bookAppointment } from '../api';
import './Appointment.css';

const goals = [
  'Weight Loss',
  'Muscle Gain',
  'General Fitness',
  'Cardio Endurance',
  'Flexibility',
  'Sports Performance',
  'Body Transformation',
];

const times = [
  'Morning (6AM - 9AM)',
  'Mid Morning (9AM - 12PM)',
  'Afternoon (12PM - 4PM)',
  'Evening (4PM - 7PM)',
  'Night (7PM - 10PM)',
];

export default function Appointment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', phone: '', fitnessGoal: '', preferredTime: '' });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await bookAppointment(form);
      setStatus('success');
      setMsg(res.data.message);
      setForm({ name: '', phone: '', fitnessGoal: '', preferredTime: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="appointment" className="appointment section-padding">
      <div className="appointment-bg">
        <div className="appointment-orb" />
        <div className="appointment-grid" />
      </div>

      <div className="container" ref={ref}>
        <div className="appointment-layout">
          {/* Left: Copy */}
          <motion.div
            className="appointment-copy"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">Free Trial</p>
            <h2 className="section-title">
              START YOUR
              <br />
              <span>TRANSFORMATION</span>
              <br />
              TODAY
            </h2>
            <p className="appt-desc">
              Book your FREE trial session now. No commitment required.
              Our expert trainers will assess your fitness level and design
              a plan just for you.
            </p>

            <div className="appt-benefits">
              {[
                { icon: '✓', text: 'Free consultation with certified trainer' },
                { icon: '✓', text: 'Personalized fitness assessment' },
                { icon: '✓', text: 'Full gym tour & demo session' },
                { icon: '✓', text: 'No sign-up fees or commitments' },
              ].map((b) => (
                <div key={b.text} className="appt-benefit">
                  <span className="benefit-icon">{b.icon}</span>
                  <span className="benefit-text">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="appt-cta-note">
              <div className="cta-note-icon">📞</div>
              <div>
                <div className="cta-note-title">Prefer to call?</div>
                <a href="tel:+91XXXXXXXXXX" className="cta-note-phone">+91 XXXXX XXXXX</a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="appointment-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="form-badge">🎯 Book Free Trial Session</div>

            {status === 'success' && (
              <motion.div
                className="alert alert-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '1.5rem' }}
              >
                🎉 {msg}
              </motion.div>
            )}
            {status === 'error' && (
              <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                ✗ {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="9XXXXXXXXX"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Fitness Goal *</label>
                <select
                  name="fitnessGoal"
                  value={form.fitnessGoal}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select your primary goal</option>
                  {goals.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time *</label>
                <select
                  name="preferredTime"
                  value={form.preferredTime}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select preferred time slot</option>
                  {times.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary appt-submit"
                disabled={status === 'loading'}
              >
                <span>{status === 'loading' ? 'Booking...' : 'Book Free Trial Now'}</span>
                {status !== 'loading' && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              <p className="form-disclaimer">
                By submitting, you agree to receive a call from our team.
                Your information is 100% secure and never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
