import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({ title: '', description: '' });

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
     // const res = await axios.get('http://localhost:5000/api/courses');
     const res = await axios.get('https://online-learning-platform-production.up.railway.app/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        `https://online-learning-platform-production.up.railway.app/api/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Enrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setForm({ title: course.title, description: course.description });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://online-learning-platform-production.up.railway.app/api/courses/${editingCourse}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Course updated!');
      setEditingCourse(null);
      setForm({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      alert('Failed to update course');
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`https://online-learning-platform-production.up.railway.app/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Course deleted');
      fetchCourses();
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(
        'https://online-learning-platform-production.up.railway.app/api/courses',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Course added!');
      setForm({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add course');
    }
  };

  return (
    <div className="container">
      <h2>Available Courses</h2>

      {role === 'instructor' && (
        <div style={{ marginBottom: '2rem' }}>
          <h3>Create New Course</h3>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <button onClick={handleAddCourse}>Add Course</button>
        </div>
      )}

      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              {editingCourse === course._id ? (
                <div>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    style={{ display: 'block', marginBottom: '0.5rem' }}
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
                    style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingCourse(null)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  {role === 'student' && (
                    <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                  )}

                  {role === 'instructor' && course.instructor === userId && (
                    <>
                      <button onClick={() => handleEdit(course)}>Edit</button>
                      <button onClick={() => handleDelete(course._id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
