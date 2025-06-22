import React, { useState } from 'react';
import axios from 'axios';

const GPTRecommendations = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://online-learning-platform-production.up.railway.app/api/gpt/recommend', { prompt }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResponse(res.data.message);
    } catch (err) {
      alert('Failed to get recommendation');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>AI Course Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="E.g., I want to be a software engineer, what courses should I follow?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <button type="submit">Get Suggestions</button>
      </form>
      {response && (
        <div style={{ marginTop: '1.5rem', background: '#f1f1f1', padding: '1rem', borderRadius: '8px' }}>
          <h4>Suggestions:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GPTRecommendations;
