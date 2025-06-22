import React, { useState } from 'react';
import axios from 'axios';

const GptSuggest = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setResponse('');
      setError('');

      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://online-learning-platform-production.up.railway.app/api/gpt/recommend', 
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(res.data.response);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💡 GPT Course Recommendations</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          placeholder="E.g. I want to be a mobile app developer"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Thinking...' : 'Get Suggestions'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {response && (
        <div style={styles.responseContainer}>
          <h4 style={styles.responseTitle}>📋 Suggested Courses:</h4>
          <div style={styles.responseBox}>
            <pre style={styles.pre}>{response}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fdfdfd',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  textarea: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  button: {
    padding: '10px 16px',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  responseContainer: {
    marginTop: '25px',
  },
  responseTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  responseBox: {
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    border: '1px solid #ccc',
  },
  pre: {
    margin: 0,
    fontFamily: 'inherit',
    fontSize: '1rem',
  },
};

export default GptSuggest;
