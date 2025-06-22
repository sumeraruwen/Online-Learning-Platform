const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  enrollInCourse,
  getMyCourses,
} = require('../controllers/courseController');
const { updateCourse, deleteCourse } = require('../controllers/courseController');


const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Public
router.get('/', getCourses);

// Protected
router.post('/', protect, authorizeRoles('instructor'), createCourse);
router.post('/:id/enroll', protect, authorizeRoles('student'), enrollInCourse);
router.get('/my-courses', protect, authorizeRoles('student'), getMyCourses);
router.put('/:id', protect, authorizeRoles('instructor'), updateCourse);
router.delete('/:id', protect, authorizeRoles('instructor'), deleteCourse);


module.exports = router;
