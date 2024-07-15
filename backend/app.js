const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
let db;
MongoClient.connect(process.env.MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    db = client.db('comics_db');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Ruta para obtener la lista de cómics
app.get('/comics', async (req, res) => {
  try {
    const response = await axios.get('https://comicvine.gamespot.com/api/issues', {  
      params: {
        api_key: API_KEY,
        format: 'json',
      }
    });

    const comics = response.data.results;

    // Guardar los cómics en MongoDB Atlas
    await db.collection('comics').insertMany(comics);

    res.json(comics);
  } catch (error) {
    console.error('Error fetching comics:', error);
    res.status(500).json({ error: 'Error fetching comics' });
  }
});

// Ruta para obtener detalles de un cómic específico
app.get('/comics/:id', async (req, res) => {
  try {
    const comic = await db.collection('comics').findOne({ id: parseInt(req.params.id) });

    if (!comic) {
      const response = await axios.get(`https://comicvine.gamespot.com/api/issue/4000-${req.params.id}`, {
        params: {
          api_key: API_KEY,
          format: 'json'
        }
      });

      const comicDetails = response.data.results;
      await db.collection('comics').insertOne(comicDetails);
      res.json(comicDetails);
    } else {
      res.json(comic);
    }
  } catch (error) {
    console.error('Error fetching comic details:', error);
    res.status(500).json({ error: 'Error fetching comic details' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});