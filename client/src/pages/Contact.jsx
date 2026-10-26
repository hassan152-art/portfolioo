import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Mail, MapPin, Phone, Send, MessageCircle, Copy, Check, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SpotlightCard from '../components/SpotlightCard';
import { api } from '../api';
import { profile } from '../data/profile';

const empty = { name: '', email: '', subject: '', service: 'Full-Stack Development', budget: 'Flexible / Discuss', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [copiedKey, setCopiedKey] = useState(null);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: '' });
    try {
      const fullSubject = `[${form.service}] ${form.subject || 'New Inquiry'}`;
      const fullMessage = `Service: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`;
      await api.sendMessage({
        name: form.name,
        email: form.email,
        subject: fullSubject,
        message: fullMessage,
      });
      setForm(empty);
      setStatus({ type: 'ok', msg: "Thank you! Your message was sent directly to my database. I'll get back to you shortly." });
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err.status ? err.message : 'Could not reach the server right now. Feel free to contact via WhatsApp or email directly!',
      });
    }
  };

  const info = [
    { icon: Mail, label: 'Email Address', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email, key: 'email' },
    { icon: Phone, label: 'Phone / Direct Call', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, copy: profile.phone, key: 'phone' },
    { icon: MapPin, label: 'Location & Work Zone', value: profile.address, href: null },
    { icon: Github, label: 'GitHub Repository', value: `@${profile.githubUser}`, href: profile.github },
  ];

  return (
    <div className="container page">
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's build something"
        highlight="meaningful together"
        subtitle="Have a project in mind, an open role, or need technical consulting? Send a message or connect directly."
      />

      <div className="contact-grid">
        <div className="contact-info" style={{ display: 'grid', gap: '18px' }}>
          {/* Quick WhatsApp Action Card */}
          <Reveal>
            <div className="whatsapp-cta-card" style={{ padding: '24px' }}>
              <div>
                <span className="badge-pill" style={{ background: 'rgba(37, 211, 102, 0.2)', borderColor: 'rgba(37, 211, 102, 0.4)' }}>
                  Fastest Response
                </span>
                <strong style={{ display: 'block', fontSize: '1.15rem', marginTop: '6px' }}>Chat on WhatsApp</strong>
                <p className="muted small" style={{ marginTop: '2px' }}>Usually replies within a couple hours.</p>
              </div>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </Reveal>

          {info.map((i, idx) => (
            <Reveal key={i.label} delay={idx * 0.08}>
              <SpotlightCard className="fact glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div className="icon-box">
                    <i.icon size={22} />
                  </div>
                  <div>
                    <span className="muted small">{i.label}</span>
                    {i.href ? (
                      <a href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'block', fontWeight: 600, fontSize: '0.98rem' }}>
                        {i.value}
                      </a>
                    ) : (
                      <strong style={{ display: 'block', fontSize: '0.98rem' }}>{i.value}</strong>
                    )}
                  </div>
                </div>

                {i.copy && (
                  <button
                    onClick={() => copyText(i.copy, i.key)}
                    className="btn-icon btn-sm"
                    title={`Copy ${i.label}`}
                    type="button"
                    style={{ width: '36px', height: '36px' }}
                  >
                    {copiedKey === i.key ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  </button>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SpotlightCard className="glass form-card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Send a Direct Message</h2>
            <p className="muted small" style={{ marginBottom: '20px' }}>Fill out the details below and I'll get back to you promptly.</p>

            <form onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your Name *
                  <input required value={form.name} onChange={set('name')} placeholder="e.g. Alex Johnson" maxLength={100} />
                </label>
                <label>
                  Email Address *
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="alex@company.com" />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Service Needed
                  <select value={form.service} onChange={set('service')}>
                    <option value="Full-Stack Web App">Full-Stack Web Application</option>
                    <option value="Frontend & UI/UX">Frontend & UI/UX Development</option>
                    <option value="Backend & REST API">Backend & REST API Development</option>
                    <option value="Database Design">Database Architecture & Tuning</option>
                    <option value="E-Commerce Store">E-Commerce / Marketplace</option>
                    <option value="Full-Time Hiring">Full-Time / Contract Hiring</option>
                  </select>
                </label>

                <label>
                  Timeline / Budget
                  <select value={form.budget} onChange={set('budget')}>
                    <option value="Flexible / Discuss">Flexible / Let's discuss</option>
                    <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                    <option value="Standard (2-4 weeks)">Standard (2-4 weeks)</option>
                    <option value="Full-Time Employment">Full-Time Employment</option>
                  </select>
                </label>
              </div>

              <label>
                Subject
                <input value={form.subject} onChange={set('subject')} placeholder="Brief summary of your project or role" maxLength={200} />
              </label>

              <label>
                Message Details *
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Provide details about your project, requirements, or any questions you have…"
                  maxLength={5000}
                />
              </label>

              <motion.button className="btn btn-primary" type="submit" disabled={status.type === 'loading'} whileTap={{ scale: 0.97 }}>
                {status.type === 'loading' ? 'Transmitting message…' : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>

              {status.type === 'ok' && (
                <p className="alert ok">
                  <CheckCircle2 size={18} /> {status.msg}
                </p>
              )}
              {status.type === 'error' && <p className="alert err">{status.msg}</p>}
            </form>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  );
}
