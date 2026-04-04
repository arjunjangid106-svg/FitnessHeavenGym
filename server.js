const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Update this if your MySQL root user has a password
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.log('Please make sure your MySQL server is running and the credentials in server.js are correct.');
  } else {
    console.log('Connected to MySQL server.');

    // Create database if not exists
    db.query('CREATE DATABASE IF NOT EXISTS gym_db', (err) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        // Switch to the database
        db.query('USE gym_db', (err) => {
          if (err) console.error('Error selecting database:', err);
          else {
            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS payments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                plan VARCHAR(50) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )
            `;
            db.query(createTableQuery, (err) => {
              if (err) console.error('Error creating table:', err);
              else console.log("Table 'payments' is ready!");
            });
          }
        });
      }
    });
  }
});

app.post('/save-payment', (req, res) => {
  const { fullName, mobile, plan, amount, notes } = req.body;

  if (!fullName || !mobile || !plan || !amount) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const insertQuery = 'INSERT INTO payments (fullName, mobile, plan, amount, notes) VALUES (?, ?, ?, ?, ?)';

  db.query('USE gym_db', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Database selected failed' });
    }

    db.query(insertQuery, [fullName, mobile, plan, amount, notes || ''], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Error saving payment data' });
      }
      res.json({ message: 'Payment data saved successfully to database!' });
    });
  });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running nicely on http://localhost:${PORT}`);
});
