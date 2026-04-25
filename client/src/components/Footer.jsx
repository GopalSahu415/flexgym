import { Link } from 'react-scroll';
import './Footer.css';

const quickLinks = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About Us' },
  { to: 'services', label: 'Services' },
  { to: 'membership', label: 'Membership' },
  { to: 'gallery', label: 'Gallery' },
  { to: 'contact', label: 'Contact' },
];

const services = [
  'Weight Training',
  'Cardio Training',
  'CrossFit',
  'Zumba Classes',
  'Personal Training',
  'Weight Loss Programs',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-flex">FLEX</span>
              <span className="logo-gym">GYM</span>
              <span className="logo-dot">.</span>
            </div>
            <p className="footer-tagline">
              Transform your body, transform your life.
              Meerut's premier fitness destination on Garh Road.
            </p>
            <div className="footer-socials">
              {['📘', '📸', '▶️', '💬'].map((icon, i) => (
                <a key={i} href="#" className="social-btn" aria-label="Social media">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} smooth duration={600} offset={-80} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s}>
                  <Link to="services" smooth duration={600} offset={-80} className="footer-link">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span>📍</span>
                <span>Opp. Vishal Mega Mart, Garh Road, Meerut, UP</span>
              </div>
              <div className="footer-contact-item">
                <span>📞</span>
                <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>
              </div>
              <div className="footer-contact-item">
                <span>📧</span>
                <a href="mailto:flexgymmeerut@gmail.com">flexgymmeerut@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <span>⏰</span>
                <span>Mon–Sat: 6AM–10PM | Sun: 8AM–6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Flex Gym Meerut. All rights reserved.</p>
          <p className="footer-credit">Built with 💪 for Meerut's fitness community</p>
        </div>
      </div>
    </footer>
  );
}
