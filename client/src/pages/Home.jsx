import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  Download,
  Github,
  Layers,
  Server,
  ShoppingBag,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  MessageCircle,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import Typewriter from '../components/Typewriter';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import SpotlightCard from '../components/SpotlightCard';
import TerminalBio from '../components/TerminalBio';
import ResumeModal from '../components/ResumeModal';
import { useData } from '../context/DataContext';
import { profile } from '../data/profile';

const serviceIcons = {
  Layers: Layers,
  Server: Server,
  Database: Database,
  ShoppingBag: ShoppingBag,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
};

export default function Home() {
  const { projects, skills } = useData();
  const [activeFaq, setActiveFaq] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const featured = (projects.filter((p) => p.featured).length ? projects.filter((p) => p.featured) : projects).slice(0, 6);

  const filteredProjects = activeTab === 'All'
    ? featured
    : featured.filter((p) => (p.tags && p.tags.includes(activeTab)) || (p.category && p.category.toLowerCase().includes(activeTab.toLowerCase())));

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-text">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            <span>{profile.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
<<<<<<< HEAD
            Hi, I'm <span className="grad-text">{profile.name}</span>
=======
            Hi, I'm <span className="grad-text">{profile.firstName}</span>
>>>>>>> c639ec66f38459a8856259170079e359d7904187
            <br />
            <Typewriter words={profile.roles} />
          </motion.h1>

          <motion.p
            className="lead muted"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            I architect responsive, pixel-perfect user interfaces and build scalable, secure backend systems. Based in Karachi, Pakistan, available worldwide.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Link to="/projects" className="btn btn-primary">
              <span>Explore My Work</span>
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => setResumeOpen(true)}
              className="btn btn-ghost"
              type="button"
            >
              <FileText size={18} />
              <span>View CV / Resume</span>
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-icon"
              aria-label="GitHub profile"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-icon"
              aria-label="Chat on WhatsApp"
              title="Direct WhatsApp Message"
              style={{ color: '#25d366' }}
            >
              <MessageCircle size={20} />
            </a>
          </motion.div>
        </div>

        {/* Hero Interactive Terminal Widget */}
        <motion.div
          className="hero-right-col"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <TerminalBio />
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="container stats">
        {profile.stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <SpotlightCard className="stat glass">
              <strong className="grad-text">{s.n}</strong>
              <div style={{ fontWeight: 600, fontSize: '0.98rem' }}>{s.l}</div>
              <span className="stat-sub">{s.sub}</span>
            </SpotlightCard>
          </Reveal>
        ))}
      </section>

      {/* Services Section ("What I Do") */}
      <section className="container section">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="badge-pill">Solutions & Services</span>
              <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '10px' }}>
                Full-Stack <span className="grad-text">Specializations</span>
              </h2>
              <p className="muted lead">From user interface design to production backend architecture.</p>
            </div>
            <Link to="/contact" className="link-arrow">
              Need a custom service? <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid-3">
          {profile.services.map((srv, i) => {
            const Icon = serviceIcons[srv.icon] || Code2;
            return (
              <Reveal key={srv.id} delay={i * 0.08}>
                <SpotlightCard className="service-card">
                  <div className="icon-box">
                    <Icon size={26} />
                  </div>
                  <h3>{srv.title}</h3>
                  <p className="muted small" style={{ lineHeight: 1.6 }}>{srv.desc}</p>
                  <div className="service-deliverables">
                    {srv.deliverables.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Development Workflow ("How I Work") */}
      <section className="container section">
        <Reveal>
          <div className="center" style={{ marginBottom: '40px' }}>
            <span className="badge-pill">Methodology</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              How I Turn <span className="grad-text">Concepts</span> Into Reality
            </h2>
            <p className="muted lead" style={{ marginInline: 'auto' }}>
              A disciplined, transparent, and agile workflow ensuring high quality and on-schedule delivery.
            </p>
          </div>
        </Reveal>

        <div className="workflow-grid">
          {profile.workflow.map((wf, i) => (
            <Reveal key={wf.step} delay={i * 0.1}>
              <SpotlightCard className="workflow-card">
                <div className="workflow-step-num">{wf.step}</div>
                <h3 style={{ fontSize: '1.15rem' }}>{wf.title}</h3>
                <p className="muted small" style={{ lineHeight: 1.6 }}>{wf.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Projects with Quick Filter */}
      <section className="container section">
        <Reveal className="section-head">
          <div>
            <span className="badge-pill">Portfolio Portfolio</span>
            <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '10px' }}>
              Featured <span className="grad-text">Projects</span>
            </h2>
            <p className="muted lead">Explore recent live websites, single-page web applications, and backend systems.</p>
          </div>
          <Link to="/projects" className="link-arrow">
            View all projects ({projects.length}) <ArrowRight size={16} />
          </Link>
        </Reveal>

        <div className="filter-tabs">
          {['All', 'React', 'Full-Stack', 'Responsive'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid-3">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Skills Matrix Preview */}
      <section className="container section">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="badge-pill">Core Stack</span>
              <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '10px' }}>
                Skills & <span className="grad-text">Proficiency</span>
              </h2>
              <p className="muted lead">Modern tools and frameworks I use every day.</p>
            </div>
            <Link to="/skills" className="link-arrow">
              View full skill breakdown <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid-2">
          <SpotlightCard className="skill-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="var(--a)" /> Frontend Mastery
            </h3>
            {skills
              .filter((s) => s.category === 'Frontend')
              .slice(0, 4)
              .map((s) => (
                <div key={s._id} className="skill-item">
                  <div className="skill-meta">
                    <span>{s.name}</span>
                    <span className="muted small">{s.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
          </SpotlightCard>

          <SpotlightCard className="skill-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={20} color="var(--b)" /> Backend & Data Architecture
            </h3>
            {skills
              .filter((s) => s.category.includes('Backend') || s.category.includes('Database'))
              .slice(0, 4)
              .map((s) => (
                <div key={s._id} className="skill-item">
                  <div className="skill-meta">
                    <span>{s.name}</span>
                    <span className="muted small">{s.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
          </SpotlightCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container section">
        <Reveal>
          <div className="center" style={{ marginBottom: '40px' }}>
            <span className="badge-pill">Collaborator Feedback</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              What People <span className="grad-text">Say</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid-3">
          {profile.testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <SpotlightCard className="testimonial-card">
<<<<<<< HEAD
                <div style={{ color: 'var(--a)', fontSize: '2rem', lineHeight: 1 }}>ï¿½</div>
=======
                <div style={{ color: 'var(--a)', fontSize: '2rem', lineHeight: 1 }}>“</div>
>>>>>>> c639ec66f38459a8856259170079e359d7904187
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.author.charAt(0)}</div>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{t.author}</strong>
                    <div className="muted small">{t.role}</div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container section">
        <Reveal>
          <div className="center" style={{ marginBottom: '40px' }}>
            <span className="badge-pill">Got Questions?</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              Frequently Asked <span className="grad-text">Questions</span>
            </h2>
            <p className="muted lead" style={{ marginInline: 'auto' }}>
              Common questions from clients, engineering managers, and recruiters.
            </p>
          </div>
        </Reveal>

        <div className="faq-list" style={{ maxWidth: '820px', marginInline: 'auto' }}>
          {profile.faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(i)}
                aria-expanded={activeFaq === i}
              >
                <span>{faq.q}</span>
                {activeFaq === i ? <ChevronUp size={20} color="var(--a)" /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container section">
        <Reveal>
          <div className="cta glass">
            <span className="badge-pill">Let's Connect</span>
            <h2>
              Ready to build something <span className="grad-text">extraordinary?</span>
            </h2>
            <p className="muted lead" style={{ marginInline: 'auto' }}>
              Whether you need a full-time software developer, a custom web application, or a revamp of your current website, let's talk.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
              <Link to="/contact" className="btn btn-primary">
                <span>Start a Project</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ borderColor: 'rgba(37, 211, 102, 0.4)', color: '#25d366' }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
