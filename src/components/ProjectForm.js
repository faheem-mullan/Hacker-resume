import React from 'react';

function ProjectForm({ projects, setProjects }) {
  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([...projects, { name: '', link: '', description: '' }]);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div className="form-section">
      <h2>Projects</h2>
      {projects.map((proj, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <label>Project Name</label>
          <input
            type="text"
            placeholder="e.g., HackerResume Builder"
            value={proj.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />

          <label>Project Link</label>
          <input
            type="text"
            placeholder="e.g., https://github.com/username/project"
            value={proj.link}
            onChange={(e) => handleChange(index, 'link', e.target.value)}
          />

          <label>Short Description</label>
          <textarea
            rows={3}
            placeholder="Brief summary of what the project does..."
            value={proj.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />

          {projects.length > 1 && (
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
          + Add More Projects
        </button>
      </div>
    </div>
  );
}

export default ProjectForm;
