import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      
      {/* Form Section */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h2>Resume Form</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          rows={3}
        ></textarea><br /><br />

        <textarea
          placeholder="Professional Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
        ></textarea>
      </div>

      {/* Preview Section */}
      <div style={{ flex: 1, border: '1px solid black', padding: '20px' }}>
        <h2>Resume Preview</h2>
        <h3>{name || 'Your Name'}</h3>
        <p><strong>{job || 'Your Job Title'}</strong></p>
        <p>Skills: {skills || 'Add some skills'}</p>
        <p>{summary || 'Write a short summary about yourself...'}</p>
      </div>

    </div>
  );
}

export default App;
