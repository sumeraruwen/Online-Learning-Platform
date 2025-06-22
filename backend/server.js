const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); 
const courseRoutes = require('./routes/courseRoutes');
const gptRoutes = require('./routes/gptRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use auth routes
app.use('/api', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/gpt', gptRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
