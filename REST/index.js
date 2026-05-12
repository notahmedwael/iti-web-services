import express from "express";

const app = express();

import apiRoutes from "./routes/index.js";

app.use(express.json());

app.use('/', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});