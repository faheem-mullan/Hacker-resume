
import React from 'react';

function ResumeForm({
  name,
  setName,
  job,
  setJob,
  skills,
  setSkills,
  summary,
  setSummary,
  contact,
  setContact,
  education,
  setEducation,
  experience,
  setExperience,
  projects,
  setProjects,
  handleImageUpload
}) {
  return (
    <div className="form-section">
      <h2>Resume Form</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Job Title" value={job} onChange={(e) => setJob(e.target.value)} />
      <textarea placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} rows={3} />
      <textarea placeholder="Professional Summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} />
      <input type="text" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
      <input type="text" placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
      <input type="text" placeholder="LinkedIn" value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} />
      <input type="text" placeholder="GitHub" value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} />
    </div>
  );
}

export default ResumeForm;
