import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, highlight, subtitle }) {
  return (
    <header className="page-header">
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title} {highlight && <span className="grad-text">{highlight}</span>}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
