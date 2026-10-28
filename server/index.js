import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { Project, Skill, Experience, Message } from './models.js';
import { seed } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Explicitly load .env from server dir first, fallback to root
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_URL } = process.env;
const PORT = process.env.PORT || 5000;

for (const [k, v] of Object.entries({ MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD })) {
  if (!v) {
    console.error(`Missing ${k}. Set it in server/.env (local) or in the Vercel project's Environment Variables.`);
  }
}

const app = express();
const allowedOrigins = CLIENT_URL
  ? CLIENT_URL.split(',').map((u) => u.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));

// ---------- database (connection is cached so it works on Vercel serverless) ----------
let dbReady;
function connectDB() {
  if (!dbReady) {
    dbReady = mongoose
      .connect(MONGODB_URI)
      .then(() => seed())
      .catch((e) => {
        dbReady = null;
        throw e;
      });
  }
  return dbReady;
}
app.use((req, res, next) => connectDB().then(() => next(), next));

// ---------- helpers ----------
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const safeEqual = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

const auth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// tiny in-memory login rate limit: 10 attempts / 15 min / IP
const attempts = new Map();
const loginLimit = (req, res, next) => {
  const now = Date.now();
  const rec = (attempts.get(req.ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  if (rec.length >= 10) return res.status(429).json({ message: 'Too many attempts. Try again later.' });
  rec.push(now);
  attempts.set(req.ip, rec);
  next();
};

// ---------- auth ----------
app.post('/api/auth/login', loginLimit, (req, res) => {
  const email = (req.body?.email || '').trim().toLowerCase();
  const password = (req.body?.password || '').trim();
  const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedPassword = (process.env.ADMIN_PASSWORD || '').trim();

  if (email && password && expectedEmail && expectedPassword && safeEqual(email, expectedEmail) && safeEqual(password, expectedPassword)) {
    const token = jwt.sign({ role: 'admin', email: expectedEmail }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { email: expectedEmail } });
  }
  res.status(401).json({ message: 'Invalid email or password' });
});
app.get('/api/auth/me', auth, (req, res) => res.json({ ok: true }));

// ---------- generic CRUD (public read, admin write) ----------
function crud(Model, sort) {
  const r = express.Router();
  r.get('/', wrap(async (req, res) => res.json(await Model.find().sort(sort))));
  r.get('/:id', wrap(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  }));
  r.post('/', auth, wrap(async (req, res) => {
    const { _id, __v, createdAt, updatedAt, ...body } = req.body;
    res.status(201).json(await Model.create(body));
  }));
  r.put('/:id', auth, wrap(async (req, res) => {
    const { _id, __v, createdAt, updatedAt, ...body } = req.body;
    const doc = await Model.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  }));
  r.delete('/:id', auth, wrap(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  }));
  return r;
}

app.use('/api/projects', crud(Project, { order: 1, createdAt: -1 }));
app.use('/api/skills', crud(Skill, { category: 1, order: 1 }));
app.use('/api/experiences', crud(Experience, { order: 1 }));

// ---------- messages (public create, admin read/manage) ----------
const messages = express.Router();
messages.post('/', wrap(async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Please enter a valid email' });
  await Message.create({ name, email, subject, message });
  res.status(201).json({ ok: true });
}));
messages.get('/', auth, wrap(async (req, res) => res.json(await Message.find().sort({ createdAt: -1 }))));
messages.put('/:id', auth, wrap(async (req, res) => {
  const doc = await Message.findByIdAndUpdate(req.params.id, { read: !!req.body.read }, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}));
messages.delete('/:id', auth, wrap(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));
app.use('/api/messages', messages);

// ---------- image upload (admin) ----------
// Vercel has no writable disk, so images are stored inside the document as a data URL.
// The admin panel shrinks images before uploading, so they stay small.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)),
});
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Only PNG, JPG, WEBP or GIF images up to 2MB are allowed' });
  res.json({ url: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// ---------- errors ----------
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' });
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// Local development only. On Vercel the app is exported and run as a serverless function.
if (!process.env.VERCEL) {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
    .catch((e) => {
      console.error('MongoDB connection failed:', e.message);
      process.exit(1);
    });
}

export default app;
