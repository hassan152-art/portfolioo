import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import SpotlightCard from '../components/SpotlightCard';
import Reveal from '../components/Reveal';
import { Award, GraduationCap, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const certifications = [
  {
    title: 'Advanced Diploma in Web Development (ACCP)',
    issuer: 'Aptech Computer Education',
    year: '2023 – Present',
    desc: 'Intensive curriculum covering React, Node.js, Express, PHP, C# .NET MVC, SQL, and MongoDB.',
  },
  {
    title: 'Responsive Web Design & Algorithms',
    issuer: 'Independent Technical Studies',
    year: '2023',
    desc: 'Mastery in CSS Grid, Flexbox, Semantic HTML5, and vanilla JavaScript ES6 algorithms.',
  },
  {
    title: 'Full-Stack RESTful API & Database Architecture',
    issuer: 'Hands-On Agency Capstone',
    year: '2024',
    desc: 'Designing authenticated multi-role APIs, rate-limiting, and relational schema normalization.',
  },
];

export default function Education() {
  const { experiences } = useData();
  const educationItems = experiences.filter((e) => e.type === 'education');

  return (
    <div className="container page">
      <PageHeader
        eyebrow="Academic & Certifications"
        title="Learning, Degrees &"
        highlight="Professional Growth"
        subtitle="Formal education, advanced diploma programs, and specialized web engineering certifications."
      />

      <Timeline items={educationItems} />

      <section className="section" style={{ marginTop: '40px' }}>
        <Reveal>
          <div className="section-head">
            <div>
              <span className="badge-pill">Credentials</span>
              <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '8px' }}>
                Key Certifications & <span className="grad-text">Specializations</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <SpotlightCard className="glass" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="icon-box">
                  <Award size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem' }}>{c.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                  <span className="muted">{c.issuer}</span>
                  <span style={{ color: 'var(--b)', fontWeight: 600 }}>{c.year}</span>
                </div>
                <p className="muted small" style={{ lineHeight: 1.6, marginTop: 'auto' }}>{c.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
