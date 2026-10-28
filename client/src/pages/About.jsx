import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, Globe, MapPin, FileText, CheckCircle, Code, Cpu, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SpotlightCard from '../components/SpotlightCard';
import ResumeModal from '../components/ResumeModal';
import { profile } from '../data/profile';
import { fallbackExperiences } from '../data/fallback';

const principles = [
  {
    title: 'Clean, Maintainable Architecture',
    desc: 'Writing clean, modular, and self-documenting code that scales smoothly and is a joy for any developer to maintain.',
    icon: Code,
  },
  {
    title: 'Performance & Speed First',
    desc: 'Optimizing network bundles, image compression, lazy loading, and caching for ultra-fast, snappy page loads.',
    icon: Cpu,
  },
  {
    title: 'Pixel-Perfect User Experience',
    desc: 'Ensuring fluid layouts, consistent spacing, intuitive typography, and accessible keyboard navigation across all screen sizes.',
    icon: Sparkles,
  },
  {
    title: 'Transparent Communication',
    desc: 'Providing regular sprint updates, open communication on roadblocks, and proactive solutions to technical challenges.',
    icon: CheckCircle,
  },
];

export default function About() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const facts = [
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: Clock, label: 'Availability', value: profile.availability },
    { icon: Briefcase, label: 'Work Type', value: profile.workType },
    { icon: Globe, label: 'Languages', value: profile.languages.join(', ') },
  ];

  return (
    <div className="container page">
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      <PageHeader
        eyebrow="Developer Journey"
        title="Passionate about"
        highlight="clean engineering"
        subtitle="Full-Stack Developer crafting reliable, elegant digital experiences from Karachi, Pakistan."
      />

      <div className="about-grid">
        <Reveal>
          <SpotlightCard className="about-text glass" style={{ height: '100%', padding: '34px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              Hello, I'm <span className="grad-text">{profile.name}</span>
            </h2>
            {profile.about.map((p, i) => (
              <p key={i} className="muted" style={{ lineHeight: 1.7, fontSize: '0.96rem' }}>
                {p}
              </p>
            ))}
            <div className="hero-cta" style={{ marginTop: '16px' }}>
              <button
                onClick={() => setResumeOpen(true)}
                className="btn btn-primary"
                type="button"
              >
                <FileText size={18} />
                <span>View Full CV / Resume</span>
              </button>
              <Link to="/contact" className="btn btn-ghost">
                Contact Me
              </Link>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="facts">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <SpotlightCard className="fact glass" style={{ padding: '20px' }}>
                <div className="icon-box">
                  <f.icon size={22} />
                </div>
                <div>
                  <span className="muted small">{f.label}</span>
                  <strong style={{ display: 'block', fontSize: '1rem', marginTop: '2px' }}>{f.value}</strong>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
            <div className="whatsapp-cta-card">
              <div>
                <strong style={{ fontSize: '0.96rem', display: 'block' }}>Prefer WhatsApp?</strong>
                <span className="small muted">Chat directly about projects or roles</span>
              </div>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={16} />
                <span>Message Now</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Engineering Philosophy & Principles */}
      <section className="section" style={{ paddingBottom: '30px' }}>
        <Reveal>
          <div className="section-head">
            <div>
              <span className="badge-pill">Core Principles</span>
              <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '8px' }}>
                How I Approach <span className="grad-text">Development</span>
              </h2>
              <p className="muted lead">The values and engineering standards that guide my daily work.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid-2">
          {principles.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 0.08}>
              <SpotlightCard className="glass" style={{ padding: '30px', display: 'flex', gap: '18px' }}>
                <div className="icon-box" style={{ flexShrink: 0 }}>
                  <pr.icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{pr.title}</h3>
                  <p className="muted small" style={{ lineHeight: 1.6 }}>{pr.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interests & Continuous Learning */}
      <section className="section">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="badge-pill">Passions & Focus</span>
              <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '8px' }}>
                Areas of <span className="grad-text">Interest</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid-3">
          {profile.interests.map((it, i) => (
            <Reveal key={it} delay={i * 0.06}>
              <SpotlightCard className="interest glass" style={{ padding: '24px', textAlign: 'center' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--text-pure)' }}>{it}</strong>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
