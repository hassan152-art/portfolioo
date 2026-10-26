import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { assetUrl } from '../api';
import SpotlightCard from './SpotlightCard';

const hues = [265, 190, 330, 150, 30, 215];
const hueOf = (s = '') => hues[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length];

export function Thumb({ project, className = '' }) {
  const [failed, setFailed] = useState(false);
  const src = project.image
    ? assetUrl(project.image)
    : project.liveUrl
    ? `https://image.thum.io/get/width/900/crop/560/${project.liveUrl}`
    : '';
  const h = hueOf(project.title);

  if (!src || failed) {
    return (
      <div
        className={`thumb thumb-fallback ${className}`}
        style={{
          background: `linear-gradient(135deg, hsl(${h} 75% 35%), hsl(${(h + 50) % 360} 80% 25%))`,
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          height: '100%',
          minHeight: '180px',
        }}
      >
        <span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.7)' }}>
          {project.title?.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <img
      className={`thumb ${className}`}
      src={src}
      alt={project.title}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      layout
      style={{ height: '100%' }}
    >
      <SpotlightCard className="project-card">
        <Link to={`/projects/${project._id}`} className="project-thumb" style={{ position: 'relative', display: 'block' }}>
          <Thumb project={project} />
          {project.category && (
            <span className="project-badge">{project.category}</span>
          )}
        </Link>
        <div className="project-body">
          <Link to={`/projects/${project._id}`}>
            <h3 className="project-title">{project.title}</h3>
          </Link>
          <p className="muted small" style={{ lineHeight: 1.6 }}>{project.description}</p>

          <div className="project-tags">
            {project.tags?.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="project-foot">
            <Link to={`/projects/${project._id}`} className="link-arrow small">
              Case study <ArrowUpRight size={14} />
            </Link>
            <div style={{ display: 'flex', gap: '10px' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-icon btn-sm"
                  title="Source code on GitHub"
                  style={{ width: '32px', height: '32px' }}
                >
                  <Github size={15} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-icon btn-sm"
                  title="Live Demo"
                  style={{ width: '32px', height: '32px' }}
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
