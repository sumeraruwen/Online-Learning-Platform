const Course = require('../models/Course');

// Create a course (instructors only)
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error creating course' });
  }
};

// Get all courses (public)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// Enroll student in course
exports.enrollInCourse = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.students.includes(userId))
      return res.status(400).json({ message: 'Already enrolled' });

    course.students.push(userId);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

exports.updateCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      if (course.instructor.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized: Not your course' });
      }
  
      const { title, description, content } = req.body;
  
      course.title = title || course.title;
      course.description = description || course.description;
      course.content = content || course.content;
  
      const updated = await course.save();
      res.json(updated);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteCourse = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      if (course.instructor.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized: Not your course' });
      }
  
      await course.remove();
      res.json({ message: 'Course deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get student’s enrolled courses
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get enrolled courses' });
  }
};
