const express = require('express');
const router = express.Router();
const { getCourseRecommendations } = require('../controllers/gptController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Only for students
router.post('/recommend', protect, authorizeRoles('student'), getCourseRecommendations);

module.exports = router;
