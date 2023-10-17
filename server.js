const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const tasksRoutes = require('./routes/tasks');

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/tasks', tasksRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));