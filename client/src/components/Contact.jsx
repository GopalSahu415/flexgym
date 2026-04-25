import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { submitLead } from '../api';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitLead(form);
      setStatus('success');
      setMsg(res.data.message);
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="contact-bg">
        <div className="contact-grid" />
      </div>
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            CONTACT <span>US</span>
          </h2>
        </motion.div>

        <div className="contact-layout">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-value">Opposite Vishal Mega Mart,<br />Garh Road, Meerut, UP</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">
                  <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <div>
                <div className="info-label">Working Hours</div>
                <div className="info-value">
                  Mon–Sat: 6:00 AM – 10:00 PM<br />
                  Sunday: 8:00 AM – 6:00 PM
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href="mailto:flexgymmeerut@gmail.com">flexgymmeerut@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="map-container">
              <iframe
                title="Flex Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7!2d77.7085!3d28.9845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDU5JzA0LjIiTiA3N8KwNDInMzAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 className="form-heading">Send Us a Message</h3>
            <p className="form-subheading">We'll get back to you within 2 hours.</p>

            {status === 'success' && (
              <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
                ✓ {msg}
              </div>
            )}
            {status === 'error' && (
              <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                ✗ {msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Rahul Sharma"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
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
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="I'm interested in joining Flex Gym..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={status === 'loading'}
              >
                <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
