import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
   // axios.get('http://localhost:5000/api/courses/my-courses' 
   axios.get('https://online-learning-platform-production.up.railway.app/api/courses/my-courses', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setCourses(res.data))
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id} style={{ marginBottom: '1.5rem' }}>
              <h4>{course.title}</h4>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledCourses;