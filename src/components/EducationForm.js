import React from 'react';

function EducationForm({ education, setEducation }) {
  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleAdd = () => {
    setEducation([...education, { school: '', degree: '', year: '' }]);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  return (
    <div className="form-section">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} style={{ marginBottom: '16px', position: 'relative' }}>
          <label>School / University</label>
          <input
            type="text"
            placeholder="e.g., Stanford University"
            value={edu.school}
            onChange={(e) => handleChange(index, 'school', e.target.value)}
          />

          <label>Degree</label>
          <input
            type="text"
            placeholder="e.g., B.Tech in Computer Science"
            value={edu.degree}
            onChange={(e) => handleChange(index, 'degree', e.target.value)}
          />

          <label>Graduation Year</label>
          <input
            type="text"
            placeholder="e.g., 2024"
            value={edu.year}
            onChange={(e) => handleChange(index, 'year', e.target.value)}
          />

          {education.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              style={{
                background: '#dc3545',
                marginTop: '8px'
              }}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={handleAdd}>
          + Add More Education
        </button>
      </div>
    </div>
  );
}

export default EducationForm;
