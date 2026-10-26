import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Thumb } from '../components/ProjectCard';
import { useData } from '../context/DataContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, loading } = useData();
  const project = projects.find((p) => p._id === id);

  if (loading) return <div className="container page"><p className="muted center">Loading…</p></div>;
  if (!project)
    return (
      <div className="container page center">
        <h1>Project not found</h1>
        <Link to="/projects" className="btn btn-primary">Back to projects</Link>
      </div>
    );

  const more = projects.filter((p) => p._id !== id).slice(0, 3);

  return (
    <div className="container page">
      <Link to="/projects" className="link-arrow back">
        <ArrowLeft size={16} /> All projects
      </Link>

      <div className="detail">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Thumb project={project} className="detail-img" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1>{project.title}</h1>
          <p className="lead muted">{project.description}</p>
          {project.details && <p>{project.details}</p>}
          <div className="tags">
            {project.tags?.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="hero-cta">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Live demo <ArrowUpRight size={18} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <Github size={18} /> Source
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {more.length > 0 && (
        <>
          <h2 className="section-title">
            More <span className="grad-text">projects</span>
          </h2>
          <div className="grid-3">
            {more.map((p) => (
              <Link key={p._id} to={`/projects/${p._id}`} className="mini glass">
                <Thumb project={p} />
                <strong>{p.title}</strong>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
