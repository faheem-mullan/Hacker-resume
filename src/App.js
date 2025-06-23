import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState([{ school: '', degree: '', year: '' }]);
  const [experience, setExperience] = useState([{ company: '', title: '', year: '', description: '' }]);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = () => {
    const preview = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-btn');
    const resumeTitle = document.getElementById('resume-title');

    // Hide UI elements
    downloadBtn.style.display = 'none';
    if (resumeTitle) resumeTitle.style.display = 'none';

    // Apply light mode + white background for PDF only
    preview.classList.add('light-mode-export');

    html2canvas(preview, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff', // Force white background
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;
      const marginX = (pdfWidth - imgScaledWidth) / 2;
      const marginY = 10;

      pdf.addImage(imgData, 'PNG', marginX, marginY, imgScaledWidth, imgScaledHeight);
      pdf.save(`${name.trim().replaceAll(' ', '_')}_Resume.pdf`);

      // Restore everything
      preview.classList.remove('light-mode-export');
      downloadBtn.style.display = 'block';
      if (resumeTitle) resumeTitle.style.display = 'block';
    });
  };

  return (
    <div className={`resume-container ${darkMode ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '6px 14px', cursor: 'pointer' }}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h2>Resume Form</h2>

        {/* Upload Photo First */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Job Title" value={job} onChange={(e) => setJob(e.target.value)} />
        <textarea
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          rows={3}
        />
        <textarea
          placeholder="Professional Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
        />

        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => {
                const updated = [...education];
                updated[index].school = e.target.value;
                setEducation(updated);
              }}
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const updated = [...education];
                updated[index].degree = e.target.value;
                setEducation(updated);
              }}
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const updated = [...education];
                updated[index].year = e.target.value;
                setEducation(updated);
              }}
            />
          </div>
        ))}
        <button onClick={() => setEducation([...education, { school: '', degree: '', year: '' }])}>
          Add More Education
        </button>

        <h3>Work Experience</h3>
        {experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].company = e.target.value;
                setExperience(updated);
              }}
            />
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].title = e.target.value;
                setExperience(updated);
              }}
            />
            <input
              type="text"
              placeholder="Year (e.g. 2022 - 2024)"
              value={exp.year}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].year = e.target.value;
                setExperience(updated);
              }}
            />
            <textarea
              placeholder="Brief Description"
              value={exp.description}
              onChange={(e) => {
                const updated = [...experience];
                updated[index].description = e.target.value;
                setExperience(updated);
              }}
            />
          </div>
        ))}
        <button onClick={() => setExperience([...experience, { company: '', title: '', year: '', description: '' }])}>
          Add More Experience
        </button>
      </div>

      {/* Preview Section */}
      <div id="resume-preview" className="preview-section">
        <div style={{ maxWidth: '100%', height: '100%', padding: '20px' }}>
          <h2 id="resume-title" style={{ marginTop: 0 }}>Resume Preview</h2>

          {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}

          <h3>{name || 'Your Name'}</h3>
          <p><strong>{job || 'Your Job Title'}</strong></p>

          <div>
            <strong>Skills:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {skills.split(',').map((skill, idx) => (
                <span key={idx} className="skill-badge">{skill.trim()}</span>
              ))}
            </div>
          </div>

          <p>{summary || 'Write a short summary about yourself...'}</p>

          {/* Education */}
          <div className="section-card resume-section">
            <h3>Education</h3>
            {education.map((edu, index) => (
              <p key={index}>
                <strong>{edu.degree || 'Degree'}</strong> at {edu.school || 'School'} ({edu.year || 'Year'})
              </p>
            ))}
          </div>

          {/* Experience */}
          <div className="section-card resume-section">
            <h3>Work Experience</h3>
            {experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <strong>{exp.title || 'Job Title'}</strong> at {exp.company || 'Company'} ({exp.year || 'Year'})
                <p>{exp.description || 'Work description here...'}</p>
              </div>
            ))}
          </div>

          {/* Download Button (Visible only on screen) */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button id="download-btn" onClick={handleDownloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
