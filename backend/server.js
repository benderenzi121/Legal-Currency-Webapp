const express = require('express');
const app = express();
const connectDB = require('../config/db');

app.get('/', (req , res) => res.send('API is runnig'));
connectDB();

app.use( express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));