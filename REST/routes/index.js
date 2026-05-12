import express from "express";

const router = express.Router();

import studentRoutes from './students.js';
import courseRoutes from './courses.js';

router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);

export default router;