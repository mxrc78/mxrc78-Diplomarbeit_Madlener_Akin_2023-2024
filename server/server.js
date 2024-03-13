const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const sqlConfig = {
  user: 'sa',
  password: '12345678',
  database: 'testdb',
  server: 'localhost',
  options: {
    trustServerCertificate: true // Change based on your SQL server configuration
  }
};

app.post('/api/events', upload.single('pdf'), async (req, res) => {
    try {
      const { description, startDate, endDate } = req.body;
      const pdfPath = req.file ? req.file.path : null;
  
      await sql.connect(sqlConfig);
      const result = await sql.query`INSERT INTO Events (event_beschreibung, event_startdatum, event_enddatum, event_pdf) VALUES (${description}, ${startDate}, ${endDate}, ${pdfPath})`;
      res.status(201).json({ message: 'Event hinzugefügt', pdfPath: pdfPath });
    } catch (error) {
      console.error('Fehler beim Einfügen in die Datenbank:', error);
      res.status(500).json({ message: 'Interner Serverfehler' });
    }
  });
  
  app.get('/api/events', async (req, res) => {
    try {
      await sql.connect(sqlConfig);
      const result = await sql.query('SELECT * FROM Events');
      res.json(result.recordset);
    } catch (error) {
      console.error('Fehler beim Abrufen der Events:', error);
      res.status(500).json({ message: 'Interner Serverfehler beim Abrufen der Events.' });
    }
  });

 

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));