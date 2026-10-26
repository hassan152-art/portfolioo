import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Briefcase, ExternalLink, FolderKanban, LogOut, Mail, Wrench } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Manager from './Manager';
import MessagesManager from './MessagesManager';

const projectFields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Short description', type: 'textarea' },
  { name: 'details', label: 'Details (shown on project page)', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'tags', label: 'Tags', type: 'tags', hint: 'Comma separated, e.g. React, Node.js, MongoDB' },
  { name: 'liveUrl', label: 'Live URL', type: 'text', placeholder: 'https://…' },
  { name: 'githubUrl', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/…' },
  { name: 'order', label: 'Order', type: 'number', hint: 'Lower numbers appear first' },
  { name: 'featured', label: 'Show on home page', type: 'checkbox' },
];

const skillFields = [
  { name: 'name', label: 'Skill name', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true, default: 'Frontend', hint: 'e.g. Frontend, Backend & DB, Tools' },
  { name: 'level', label: 'Level (0-100)', type: 'number', min: 0, max: 100, default: 80 },
  { name: 'order', label: 'Order', type: 'number' },
];

const expFields = [
  { name: 'type', label: 'Type', type: 'select', options: [{ value: 'work', label: 'Experience' }, { value: 'education', label: 'Education' }] },
  { name: 'title', label: 'Title / Role / Degree', type: 'text', required: true },
  { name: 'organization', label: 'Company / School', type: 'text' },
  { name: 'period', label: 'Period', type: 'text', placeholder: '2023 – Present' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'bullets', label: 'Bullet points', type: 'lines', hint: 'One per line' },
  { name: 'order', label: 'Order', type: 'number' },
];

const tabs = [
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experiences', label: 'Experience & Education', icon: Briefcase },
  { id: 'messages', label: 'Messages', icon: Mail },
];

export default function Dashboard() {
  const { token, checking, logout } = useAuth();
  const [tab, setTab] = useState('projects');

  if (checking) return <div className="container page"><p className="muted center">Checking session…</p></div>;
  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <div className="container page admin">
      <aside className="admin-side glass">
        <h3>Dashboard</h3>
        {tabs.map((t) => (
          <button key={t.id} className={`side-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <t.icon size={18} /> {t.label}
          </button>
        ))}
        <Link to="/" className="side-btn">
          <ExternalLink size={18} /> View site
        </Link>
        <button className="side-btn" onClick={logout}>
          <LogOut size={18} /> Log out
        </button>
      </aside>

      <section className="admin-main">
        {tab === 'projects' && (
          <Manager
            key="projects"
            title="Projects"
            singular="project"
            resource="projects"
            fields={projectFields}
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'tags', label: 'Tags', render: (p) => (p.tags || []).join(', ') },
              { key: 'featured', label: 'Home', render: (p) => (p.featured ? 'Yes' : '—') },
              { key: 'order', label: 'Order' },
            ]}
          />
        )}
        {tab === 'skills' && (
          <Manager
            key="skills"
            title="Skills"
            singular="skill"
            resource="skills"
            fields={skillFields}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'category', label: 'Category' },
              { key: 'level', label: 'Level', render: (s) => `${s.level}%` },
            ]}
          />
        )}
        {tab === 'experiences' && (
          <Manager
            key="experiences"
            title="Experience & Education"
            singular="entry"
            resource="experiences"
            fields={expFields}
            columns={[
              { key: 'type', label: 'Type', render: (e) => (e.type === 'work' ? 'Experience' : 'Education') },
              { key: 'title', label: 'Title' },
              { key: 'organization', label: 'Where' },
              { key: 'period', label: 'Period' },
            ]}
          />
        )}
        {tab === 'messages' && <MessagesManager key="messages" />}
      </section>
    </div>
  );
}
