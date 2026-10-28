import { Link } from 'react-router-dom';
import { Github, Mail, Phone, MessageCircle } from 'lucide-react';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong style={{ color: 'var(--text-pure)', display: 'block', marginBottom: '2px' }}>{profile.name}</strong>
          <p className="muted small">
            © {new Date().getFullYear()} {profile.title} · Karachi, Pakistan.
          </p>
        </div>
        <div className="footer-links">
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="Chat on WhatsApp" style={{ color: '#25d366' }}>
            <MessageCircle size={18} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub Profile">
            <Github size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" title="Send Email">
            <Mail size={18} />
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} aria-label="Phone" title="Call Phone">
            <Phone size={18} />
          </a>
          <Link to="/admin/login" className="admin-link">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
