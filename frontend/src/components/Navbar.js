import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      {token ? (
        <>
          <div>
            <span style={{ marginRight: '1rem' }}>
              👋 Logged in as <strong>{role === 'instructor' ? 'Instructor' : 'Student'}</strong>
            </span>

            <Link to="/">Courses</Link>

            {role === 'student' && (
              <>
                {' | '}
                <Link to="/my-courses">My Courses</Link>{' | '}
                <Link to="/suggest">AI Recommendations</Link>
              </>
            )}

            {' | '}
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link to="/">Courses</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
