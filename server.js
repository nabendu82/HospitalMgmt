const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/hospitals', require('./routes/api/hospitals'));
app.use('/api/patients', require('./routes/api/patients'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));