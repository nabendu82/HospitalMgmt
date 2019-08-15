require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');
//For Image Upload
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config/config')
// Connect Database
connectDB();

//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

  app.use(cors({
    origin: CLIENT_ORIGIN
  }))

  app.use(formData.parse())

  app.post('/image-upload', (req, res) => {

    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise
      .all(promises)
      .then(results => res.json(results))
      .catch((err) => res.status(400).json(err))
  })

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/hospitals', require('./routes/api/hospitals'));
app.use('/api/patients', require('./routes/api/patients'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));