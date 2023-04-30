const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const db = require('../modules/db')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'images')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const newfilename = Date.now() + ext;
        cb(null, newfilename)
        req.newfilename = newfilename
    }
})
const upload = multer ({storage})


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

app.post('/uploadProfileImage', upload.single('image'),(req, res) => {
    try {
      const sql = 'UPDATE user SET img= ? WHERE id= ?'
      const params = [req.newfilenamem, req.body?.id]
      const result = db.update(sql, params)
      res.send({
        status: 200,
        mesg: 'success',
        data: {
            img: req.newfilename
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = app;

