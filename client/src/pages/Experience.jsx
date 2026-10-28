import { useState } from 'react';
import { FileText, Briefcase, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import ResumeModal from '../components/ResumeModal';
import { useData } from '../context/DataContext';

export default function Experience() {
  const { experiences } = useData();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="container page">
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      <PageHeader
        eyebrow="Career Timeline"
        title="Professional Experience &"
        highlight="Industry Track Record"
        subtitle="Where I have contributed as a web developer, systems engineer, and freelance builder."
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => setResumeOpen(true)}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <FileText size={16} />
          <span>View / Print Formatted Resume</span>
        </button>
      </div>

      <Timeline items={experiences.filter((e) => e.type === 'work')} />
    </div>
  );
}
