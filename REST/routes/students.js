import express from 'express';
import { getDB } from '../utils/readDB.js';
import { saveDB } from '../utils/writeDB.js';

const router = express.Router();

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 10)}`;
}

// GET /students
router.get('/', async (req, res) => {
  const db = await getDB();
  res.json(db.students || []);
});

// GET /students/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  const student = (db.students || []).find(s => String(s.id) === String(id));
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// POST /students
router.post('/', async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).json({ error: 'Missing body' });
  const db = await getDB();
  db.students = db.students || [];
  const newItem = { ...payload };
  if (!newItem.id) newItem.id = generateId();
  db.students.push(newItem);
  await saveDB(db);
  res.status(201).json(newItem);
});

// PUT /students/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates) return res.status(400).json({ error: 'Missing body' });
  const db = await getDB();
  db.students = db.students || [];
  const idx = db.students.findIndex(s => String(s.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });
  const updated = { ...db.students[idx], ...updates, id: db.students[idx].id };
  db.students[idx] = updated;
  await saveDB(db);
  res.json(updated);
});

// DELETE /students/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await getDB();
  db.students = db.students || [];
  const idx = db.students.findIndex(s => String(s.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });
  db.students.splice(idx, 1);
  await saveDB(db);
  res.status(204).end();
});

export default router;
