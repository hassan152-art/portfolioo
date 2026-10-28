import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Mail, Phone, MapPin, ExternalLink, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { profile } from '../data/profile';
import { fallbackExperiences, fallbackSkills } from '../data/fallback';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="resume-backdrop" onClick={onClose}>
        <motion.div
          className="resume-modal glass"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="resume-modal-top">
            <div className="resume-actions-left">
              <span className="badge-pill">Curriculum Vitae</span>
              <span className="muted small">Updated for 2026</span>
            </div>
            <div className="resume-actions-right">
              <button onClick={handlePrint} className="btn btn-ghost btn-sm" title="Print or save as PDF">
                <Printer size={16} /> Print / Save PDF
              </button>
              <button onClick={onClose} className="btn-icon btn-sm" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="resume-printable-area">
            {/* Header */}
            <header className="resume-header">
              <div>
                <h1 className="resume-name">{profile.name}</h1>
                <p className="resume-subtitle grad-text">{profile.title}</p>
              </div>
              <div className="resume-contact-meta">
                <div className="meta-item"><Mail size={14} /> {profile.email}</div>
                <div className="meta-item"><Phone size={14} /> {profile.phone}</div>
                <div className="meta-item"><MapPin size={14} /> {profile.address}</div>
                <div className="meta-item"><ExternalLink size={14} /> {profile.github}</div>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="resume-sec">
              <h3 className="resume-sec-title"><Award size={16} /> Professional Profile</h3>
              <p className="resume-p">{profile.about[0]}</p>
              <p className="resume-p">{profile.about[1]}</p>
            </section>

            {/* Experience */}
            <section className="resume-sec">
              <h3 className="resume-sec-title"><Briefcase size={16} /> Work Experience</h3>
              {fallbackExperiences
                .filter((e) => e.type === 'work')
                .map((exp) => (
                  <div key={exp._id} className="resume-item">
                    <div className="resume-item-head">
                      <div>
                        <strong>{exp.title}</strong> — <span className="muted">{exp.organization}</span>
                      </div>
                      <span className="resume-date">{exp.period}</span>
                    </div>
                    <p className="resume-p small muted">{exp.description}</p>
                    <ul className="resume-bullets">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </section>

            {/* Education & Training */}
            <section className="resume-sec">
              <h3 className="resume-sec-title"><GraduationCap size={16} /> Education & Professional Training</h3>
              {fallbackExperiences
                .filter((e) => e.type === 'education')
                .map((edu) => (
                  <div key={edu._id} className="resume-item">
                    <div className="resume-item-head">
                      <div>
                        <strong>{edu.title}</strong> — <span className="muted">{edu.organization}</span>
                      </div>
                      <span className="resume-date">{edu.period}</span>
                    </div>
                    {edu.description && <p className="resume-p small muted">{edu.description}</p>}
                    {edu.bullets && edu.bullets.length > 0 && (
                      <ul className="resume-bullets">
                        {edu.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </section>

            {/* Core Competencies */}
            <section className="resume-sec">
              <h3 className="resume-sec-title"><Code size={16} /> Technical Skills</h3>
              <div className="resume-skills-chips">
                {fallbackSkills.map((s) => (
                  <span key={s._id} className="resume-chip">
                    {s.name} <i className="small muted">({s.level}%)</i>
                  </span>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
