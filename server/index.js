const express = require('express');
const cors = require('cors');
const Database = require('./utils/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// initialize database
const db = new Database(process.env.DB_PATH);

app.use(cors());
app.use(express.json());

// request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// initialize database connection
async function initializeServer() {
  try {
    await db.connect();
    await db.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

// start server
async function startServer() {
  await initializeServer();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, db };