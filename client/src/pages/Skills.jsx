import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Code2, Server, Database, Wrench } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import SpotlightCard from '../components/SpotlightCard';
import { useData } from '../context/DataContext';

export default function Skills() {
  const { skills, loading } = useData();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(skills.map((s) => s.category))];

  const filtered = skills.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesQuery = !query || s.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const grouped = activeCategory === 'All'
    ? [...new Set(filtered.map((s) => s.category))]
    : [activeCategory];

  return (
    <div className="container page">
      <PageHeader
        eyebrow="Technical Stack"
        title="Tools, Frameworks &"
        highlight="Technologies"
        subtitle="Comprehensive breakdown of my frontend, backend, database, and dev tools mastery."
      />

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '34px' }}>
        <div className="filter-tabs" style={{ marginBottom: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: 'min(300px, 100%)' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technology..."
            style={{ paddingLeft: '40px', paddingBlock: '10px', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {loading && <p className="muted center">Loading skills…</p>}

      <div className="grid-3" style={{ marginBottom: '60px' }}>
        {grouped.map((cat, ci) => {
          const catSkills = filtered.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <Reveal key={cat} delay={ci * 0.08}>
              <SpotlightCard className="skill-card glass" style={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem' }}>{cat}</h3>
                  <span className="badge-pill">{catSkills.length} skills</span>
                </div>
                <div>
                  {catSkills.map((s, i) => (
                    <div key={s._id} className="skill-item">
                      <div className="skill-meta">
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {s.experience && <span className="muted small" style={{ fontSize: '0.78rem' }}>{s.experience}</span>}
                          <strong style={{ color: 'var(--b)', fontSize: '0.86rem' }}>{s.level}%</strong>
                        </div>
                      </div>
                      <div className="skill-bar-bg">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      {/* Quick Interactive Cloud */}
      <Reveal>
        <div className="section-head">
          <div>
            <span className="badge-pill">Interactive Cloud</span>
            <h2 className="section-title" style={{ marginTop: '10px', marginBottom: '8px' }}>
              Technologies <span className="grad-text">at a Glance</span>
            </h2>
          </div>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills.map((s, i) => (
          <motion.button
            key={s._id}
            type="button"
            className="tag"
            style={{ fontSize: '0.86rem', padding: '8px 16px', cursor: 'pointer' }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ y: -3, scale: 1.05, borderColor: 'var(--a)' }}
            onClick={() => {
              setActiveCategory(s.category);
              setQuery(s.name);
            }}
            title={`Click to filter by ${s.name}`}
          >
            {s.name} <span className="muted small" style={{ marginLeft: '4px' }}>{s.level}%</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
