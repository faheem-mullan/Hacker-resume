import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');

  const handleDownloadPDF = () => {
    const preview = document.getElementById('resume-preview');

    const downloadBtn = document.getElementById('download-btn');
    const resumeTitle = document.getElementById('resume-title');

    // Hide elements not for PDF
    downloadBtn.style.display = 'none';
    if (resumeTitle) resumeTitle.style.display = 'none';

    html2canvas(preview, { scale: 2 }).then((canvas) => {
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

      // Restore elements
      downloadBtn.style.display = 'block';
      if (resumeTitle) resumeTitle.style.display = 'block';
    });
  };

  return (
    <div className="resume-container">
      {/* Form Section */}
      <div className="form-section">
        <h2>Resume Form</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
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

        <button
          id="download-btn"
          onClick={handleDownloadPDF}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Preview Section */}
      <div id="resume-preview" className="preview-section">
        <div style={{ maxWidth: '100%', height: '100%' }}>
          <h2 id="resume-title" style={{ marginTop: 0 }}>Resume Preview</h2>

          <h3>{name || 'Your Name'}</h3>
          <p><strong>{job || 'Your Job Title'}</strong></p>

          <div>
            <strong>Skills:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {skills
                .split(',')
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0)
                .map((skill, idx) => (
                  <span key={idx} className="skill-badge">{skill}</span>
                ))}
            </div>
          </div>

          <p>{summary || 'Write a short summary about yourself...'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
