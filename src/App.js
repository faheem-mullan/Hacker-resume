import React, { useState, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import ProjectForm from './components/ProjectForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';

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
  const [projects, setProjects] = useState([{ name: '', link: '', description: '' }]);
  const [contact, setContact] = useState({ email: '', phone: '', linkedin: '', github: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setName(parsed.name || '');
      setJob(parsed.job || '');
      setSkills(parsed.skills || '');
      setSummary(parsed.summary || '');
      setEducation(parsed.education || []);
      setExperience(parsed.experience || []);
      setProfileImage(parsed.profileImage || null);
      setContact(parsed.contact || {});
      setProjects(parsed.projects || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'resumeData',
      JSON.stringify({ name, job, skills, summary, education, experience, profileImage, contact, projects })
    );
  }, [name, job, skills, summary, education, experience, profileImage, contact, projects]);

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

    downloadBtn.style.display = 'none';
    if (resumeTitle) resumeTitle.style.display = 'none';
    preview.classList.add('light-mode-export');

    html2canvas(preview, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
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

      preview.classList.remove('light-mode-export');
      downloadBtn.style.display = 'block';
      if (resumeTitle) resumeTitle.style.display = 'block';
    });
  };

  return (
    <div className={`resume-container ${darkMode ? 'dark' : ''}`}>
      
      <div className="top-bar">
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      </div>

  
      <div className="main-content">
       
        <div id="resume-preview" className="preview-section">
          <div style={{ padding: '20px' }}>
            <h2 id="resume-title">Resume Preview</h2>
            {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
            <h3>{name || 'Your Name'}</h3>
            <p><strong>{job || 'Your Job Title'}</strong></p>

            <div style={{ marginBottom: '12px' }}>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>LinkedIn: {contact.linkedin}</p>
              <p>GitHub: {contact.github}</p>
            </div>

            <div>
              <strong>Skills:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {skills.split(',').map((skill, idx) => (
                  <span key={idx} className="skill-badge">{skill.trim()}</span>
                ))}
              </div>
            </div>

            <p>{summary || 'Write a short summary about yourself...'}</p>

            <div className="section-card resume-section">
              <h3>Education</h3>
              {education.map((edu, index) => (
                <p key={index}><strong>{edu.degree || 'Degree'}</strong> at {edu.school || 'School'} ({edu.year || 'Year'})</p>
              ))}
            </div>

            <div className="section-card resume-section">
              <h3>Work Experience</h3>
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <p><strong>{exp.title || 'Job Title'}</strong> at {exp.company || 'Company'} ({exp.year || 'Year'})</p>
                  <p>{exp.description || 'Work description here...'}</p>
                </div>
              ))}
            </div>

            <div className="section-card resume-section">
              <h3>Projects</h3>
              {projects.map((proj, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <strong>{proj.name || 'Project Name'}</strong>
                  {proj.link && <> – <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a></>}
                  <p>{proj.description || 'Project description goes here...'}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button id="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
            </div>
          </div>
        </div>

      
        <div className="form-wrapper">
          <ResumeForm
            name={name}
            setName={setName}
            job={job}
            setJob={setJob}
            skills={skills}
            setSkills={setSkills}
            summary={summary}
            setSummary={setSummary}
            contact={contact}
            setContact={setContact}
            handleImageUpload={handleImageUpload}
          />
          <EducationForm education={education} setEducation={setEducation} />
          <ExperienceForm experience={experience} setExperience={setExperience} />
          <ProjectForm projects={projects} setProjects={setProjects} />
        </div>
      </div> 
    </div>
  );
}

export default App;
<footer style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.9rem', color: '#777' }}>
  © {new Date().getFullYear()} Faheem Sharaf · Built with React · <a href="https://github.com/faheem-mullan/VitaResume" target="_blank" rel="noopener noreferrer">Source Code</a>
</footer>
