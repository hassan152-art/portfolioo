import { Project, Skill, Experience } from './models.js';

const g = 'https://github.com/hassan152-art';

const projects = [
  {
    title: 'Market Link',
    description: 'A modern farmers-market and local artisan marketplace connecting local vendors with conscious buyers.',
    details: 'Market Link bridges the gap between independent producers and local consumers. Built using React and Vite, featuring smooth product exploration, interactive vendor listings, responsive catalog layouts, and instant category filters. Deployed on Vercel with high Core Web Vitals scores.',
    tags: ['React', 'Vite', 'JavaScript', 'CSS3', 'Responsive Design', 'Vercel'],
    liveUrl: 'https://market-link-jhmy.vercel.app/',
    githubUrl: g,
    featured: true,
    order: 1,
  },
  {
    title: 'Pets Care (FurShield)',
    description: 'A comprehensive pet-care platform delivering veterinary booking, care guides, and pet wellness services.',
    details: 'FurShield is a full-featured pet care platform tailored to pet parents. It includes pet service showcases, veterinary appointment request flows, emergency care tips, and an approachable, visually delightful UI with custom cards and smooth transitions.',
    tags: ['React', 'CSS Modules', 'UI/UX Design', 'SPA', 'Vercel'],
    liveUrl: 'https://fur-shield-complete-9aqu.vercel.app/',
    githubUrl: g,
    featured: true,
    order: 2,
  },
  {
    title: 'Eventsphere',
    description: 'An interactive events portal for browsing, discovering, and registering for community and tech gatherings.',
    details: 'Eventsphere delivers a streamlined experience for event organizers and attendees. Features dynamic date/category sorting, event countdowns, responsive ticket tier cards, and social sharing links. Designed with modern neon-accented dark aesthetics.',
    tags: ['React', 'JavaScript (ES6+)', 'Modern UI', 'State Management'],
    liveUrl: 'https://eventsphere-ten-kappa.vercel.app/',
    githubUrl: g,
    featured: true,
    order: 3,
  },
  {
    title: 'Event Management Platform',
    description: 'A responsive event management and schedule dashboard built with vanilla web technologies.',
    details: 'A lightweight and high-speed web application showcasing clean HTML5 semantics, custom CSS3 flexbox/grid architecture, and vanilla JavaScript DOM interactions. Features schedule tabs, attendee registration forms, and interactive modals.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://hassan152-art.github.io/Event/',
    githubUrl: g,
    featured: false,
    order: 4,
  },
  {
    title: 'Portfolio Website (v1)',
    description: 'First generation multi-page developer portfolio showcasing foundational frontend mastery.',
    details: 'The original multi-page portfolio that this React version replaces. Built using HTML5, CSS3, and Bootstrap, featuring interactive galleries and mobile responsiveness.',
    tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'jQuery'],
    liveUrl: 'https://hassan152-art.github.io/Portfolio/',
    githubUrl: g,
    featured: false,
    order: 5,
  },
  {
    title: 'Full-Stack MERN Admin & CMS Suite',
    description: 'An authenticated administration dashboard with real-time CRUD management, analytics, and asset storage.',
    details: 'An end-to-end full-stack portfolio administration suite. Powered by an Express.js & MongoDB backend with JWT authentication, Multer image upload processing, in-memory rate limiting, and an interactive React dashboard for live content updates.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Multer', 'React'],
    liveUrl: '',
    githubUrl: g,
    featured: true,
    order: 6,
  },
  {
    title: 'Clinic & Patient Management System',
    description: 'Database-driven management application built with C# .NET MVC and SQL relational database.',
    details: 'An enterprise management concept developed for clinics and service providers. Implements relational database normalization, parameterized SQL queries, patient records tracking, and administrative reports.',
    tags: ['C# .NET MVC', 'SQL Server', 'MySQL', 'Relational DB'],
    liveUrl: '',
    githubUrl: g,
    featured: false,
    order: 7,
  },
];

const skills = [
  ['React.js', 'Frontend', 90],
  ['JavaScript (ES6+)', 'Frontend', 88],
  ['HTML5', 'Frontend', 95],
  ['CSS3', 'Frontend', 92],
  ['Bootstrap & Tailwind', 'Frontend', 88],
  ['jQuery', 'Frontend', 82],
  ['Framer Motion', 'Frontend', 84],
  ['Node.js & Express', 'Backend & DB', 84],
  ['PHP', 'Backend & DB', 75],
  ['C# .NET MVC', 'Backend & DB', 74],
  ['MongoDB', 'Backend & DB', 85],
  ['MySQL & SQL', 'Backend & DB', 84],
  ['Git & GitHub', 'Tools', 88],
  ['VS Code & DevTools', 'Tools', 95],
  ['Vite & Build Tools', 'Tools', 85],
  ['Postman & API Testing', 'Tools', 86],
].map(([name, category, level], i) => ({ name, category, level, order: i + 1 }));

const experiences = [
  {
    type: 'work',
    title: 'Web Developer',
    organization: 'Digitemb',
    period: '1 Year (Professional)',
    description: 'Worked on the development of websites and web applications as part of the Digitemb development team.',
    bullets: [
      'Built responsive, cross-browser interfaces using HTML5, CSS3, Bootstrap, JavaScript, jQuery, and React, achieving 99% mobile compatibility.',
      'Developed server-side logic and database-driven features using PHP, C# .NET MVC, and Node.js with MySQL and MongoDB.',
      'Used Git and GitHub for version control and followed team coding practices and performance optimization standards.',
    ],
    order: 1,
  },
  {
    type: 'work',
    title: 'Full-Stack Developer & Freelancer',
    organization: 'Independent / Contract Projects',
    period: '2023 – Present',
    description: 'Designed and developed multiple responsive websites and web apps.',
    bullets: [
      'Built and tested cross-browser compatible, mobile-friendly interfaces, improving usability across devices.',
      'Implemented dynamic, interactive UI features and form validations using JavaScript, React, and Framer Motion.',
      'Deployed projects on GitHub Pages and Vercel, following version control and deployment best practices.',
    ],
    order: 2,
  },
  {
    type: 'education',
    title: 'Advanced Diploma in Web Development (ACCP)',
    organization: 'Aptech Computer Education',
    period: '2023 – Present',
    description: 'Professional multi-year web development program covering modern frontend, backend, and enterprise database systems.',
    bullets: [
      'Covers React, Node.js, Express, PHP, C# .NET MVC, and relational/document databases (MySQL, MongoDB).',
      'High distinction in practical software architecture projects and API design sprints.',
    ],
    order: 1,
  },
  {
    type: 'education',
    title: 'Higher Secondary Certificate',
    organization: 'Degree College Karachi',
    period: '2023 – Present',
    description: 'Academic studies in Computer Science and Mathematics.',
    bullets: [],
    order: 2,
  },
];

// Fills empty collections only, so it never overwrites existing data
export async function seed() {
  if ((await Project.countDocuments()) === 0) await Project.insertMany(projects);
  if ((await Skill.countDocuments()) === 0) await Skill.insertMany(skills);
  if ((await Experience.countDocuments()) === 0) await Experience.insertMany(experiences);
}
