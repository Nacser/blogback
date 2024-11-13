const express = require('express');
const db = require('./config/db');
const postsRoutes = require('./routes/postsRoutes');
const authorsRoutes = require('./routes/authorsRoutes');

const app = express();

app.use(express.json());

app.use('/posts', postsRoutes);
app.use('/authors', authorsRoutes);


module.exports = app;