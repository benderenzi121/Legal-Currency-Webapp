const 
    express = require('express'),
    connectDB = require('../config/db'),
    cors = require('cors'),
    app = express(),
    PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use( express.json({ extended: false }));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orderItems', require('./routes/orderItems'));
app.get('/', (req , res) => res.send('API is runnig'));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));