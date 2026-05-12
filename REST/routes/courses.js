import express from 'express';
import { getDB } from '../utils/readDB.js';
import { saveDB } from '../utils/writeDB.js';

const router = express.Router();

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 10)}`;
}

// GET /courses
router.get('/', async (req, res) => {
  const db = await getDB();
  res.json(db.courses || []);
});

// GET /courses/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  const course = (db.courses || []).find(c => String(c.id) === String(id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// POST /courses
router.post('/', async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).json({ error: 'Missing body' });
  const db = await getDB();
  db.courses = db.courses || [];
  const newItem = { ...payload };
  if (!newItem.id) newItem.id = generateId();
  db.courses.push(newItem);
  await saveDB(db);
  res.status(201).json(newItem);
});

// PUT /courses/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates) return res.status(400).json({ error: 'Missing body' });
  const db = await getDB();
  db.courses = db.courses || [];
  const idx = db.courses.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });
  const updated = { ...db.courses[idx], ...updates, id: db.courses[idx].id };
  db.courses[idx] = updated;
  await saveDB(db);
  res.json(updated);
});

// DELETE /courses/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  db.courses = db.courses || [];
  const idx = db.courses.findIndex(c => String(c.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });
  db.courses.splice(idx, 1);
  await saveDB(db);
  res.status(204).end();
});

export default router;
