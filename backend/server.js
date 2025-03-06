// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite');

// Create table
db.run(`CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT
)`);

// Handle form submissions
app.post('/api/submit', (req, res) => {
  const { name, email, message } = req.body;
  
  db.run(
    'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get('/api/submissions', (req, res) => {
    db.all('SELECT * FROM submissions ORDER BY id DESC', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
