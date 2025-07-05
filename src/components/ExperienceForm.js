import React from 'react';

function ExperienceForm({ experience, setExperience }) {
  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: '', title: '', year: '', description: '' },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  return (
    <div className="form-section">
      <h2>Work Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <label>Company</label>
          <input
            type="text"
            placeholder="e.g., Google"
            value={exp.company}
            onChange={(e) => handleChange(index, 'company', e.target.value)}
          />

          <label>Job Title</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={exp.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
          />

          <label>Year</label>
          <input
            type="text"
            placeholder="e.g., 2022-2024"
            value={exp.year}
            onChange={(e) => handleChange(index, 'year', e.target.value)}
          />

          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Briefly describe your responsibilities and impact"
            value={exp.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />

          {experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(index)}
              style={{ background: '#dc3545', marginTop: '8px' }}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={addExperience}>
          + Add More Experience
        </button>
      </div>
    </div>
  );
}

export default ExperienceForm;
