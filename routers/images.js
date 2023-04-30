const path = require('path');
const express = require('express');
const app = express();

// Serve image files
app.get('/image/:imageName', (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'images', imageName);
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;