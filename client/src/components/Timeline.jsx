import { motion } from 'framer-motion';

export default function Timeline({ items }) {
  if (!items.length) return <p className="muted center">Nothing added yet.</p>;
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <motion.div
          key={it._id}
          className="tl-item"
          initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="tl-dot" />
          <div className="glass tl-card">
            <span className="tag">{it.period}</span>
            <h3>{it.title}</h3>
            {it.organization && <p className="tl-org">{it.organization}</p>}
            {it.description && <p className="muted">{it.description}</p>}
            {it.bullets?.length > 0 && (
              <ul>
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
