import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import { useData } from '../context/DataContext';

export default function Projects() {
  const { projects, loading } = useData();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((p) => {
      if (p.tags) p.tags.forEach((t) => set.add(t));
      if (p.category) set.add(p.category.split('/')[0].trim());
    });
    return Array.from(set).slice(0, 10);
  }, [projects]);

  const shown = useMemo(() => {
    return projects.filter((p) => {
      const matchFilter =
        filter === 'All' ||
        (p.tags && p.tags.includes(filter)) ||
        (p.category && p.category.toLowerCase().includes(filter.toLowerCase()));
      const matchQuery =
        !query ||
        p.title?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchFilter && matchQuery;
    });
  }, [projects, filter, query]);

  return (
    <div className="container page">
      <PageHeader
        eyebrow="Flagship Portfolio"
        title="Featured Applications &"
        highlight="Engineering Projects"
        subtitle="A collection of production websites, full-stack SPAs, and responsive frontend applications."
      />

      {/* Filter tabs and search bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '34px' }}>
        <div className="filter-tabs" style={{ marginBottom: 0 }}>
          {categories.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-btn ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: 'min(300px, 100%)' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            style={{ paddingLeft: '40px', paddingBlock: '10px', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <span className="muted small">
          Showing <strong>{shown.length}</strong> {shown.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      {loading ? (
        <p className="muted center">Loading projects…</p>
      ) : (
        <motion.div className="grid-3" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && shown.length === 0 && (
        <div className="glass center" style={{ padding: '60px 20px', margin: '20px auto', maxWidth: '500px' }}>
          <h3>No matching projects found</h3>
          <p className="muted small" style={{ marginTop: '8px' }}>
            Try selecting another tag or clearing your search term.
          </p>
          <button
            onClick={() => {
              setFilter('All');
              setQuery('');
            }}
            className="btn btn-ghost btn-sm"
            style={{ marginTop: '16px' }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
