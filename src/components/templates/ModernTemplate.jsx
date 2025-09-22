import React from "react";

const ModernTemplate = ({ data }) => {
  const {
    name = "",
    title = "",
    summary = "",
    email = "",
    phone = "",
    location = "",
    experience = [],
    education = [],
    skills = [],
    projects = []
  } = data;

  return (
    <article className="modern-resume" style={{ 
      fontSize: '11px', 
      lineHeight: '1.4', 
      fontFamily: 'Arial, sans-serif',
      color: '#000',
      backgroundColor: '#fff',
      padding: '40px',
      maxWidth: '210mm',
      margin: '0 auto'
    }}>
      {/* Header */}
      <header className="header-section" style={{ marginBottom: '30px' }}>
        <div className="greeting" style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#dc2626', 
          textAlign: 'left',
          marginBottom: '8px'
        }}>
          Hello
        </div>
        <h1 className="name" style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '16px'
        }}>
          I'm {name}
        </h1>
        <address className="contact-info" style={{ fontSize: '10px', lineHeight: '1.6', fontStyle: 'normal' }}>
          {location && <div>{location}</div>}
          {phone && <div>{phone}</div>}
          {email && <div>{email}</div>}
        </address>
      </header>

      <main className="content-section">
        {/* Professional Summary */}
        {summary && (
          <section style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Technical Skills
            </h3>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {skills.join(', ')}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Experience
            </h3>
            <div className="experience-list">
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                    {exp.duration}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>{exp.company}</span>
                    {exp.location && <span style={{ fontSize: '11px', color: '#000' }}>, {exp.location}</span>}
                    <span style={{ fontSize: '11px', color: '#000', fontStyle: 'italic' }}> - {exp.position}</span>
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: '11px', lineHeight: '1.4', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {exp.description.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                          <li key={lineIndex} style={{ marginBottom: '4px' }}>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Education
            </h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                    {edu.year}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>{edu.institution}</span>
                    {edu.location && <span style={{ fontSize: '11px', color: '#000' }}>, {edu.location}</span>}
                    <span style={{ fontSize: '11px', color: '#000', fontStyle: 'italic' }}> - {edu.degree}</span>
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: '11px', lineHeight: '1.4', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      {edu.description}
                    </p>
                  )}
                  {edu.gpa && (
                    <p style={{ fontSize: '11px', lineHeight: '1.4', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 className="section-title" style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Projects
            </h3>
            <div className="projects-list">
              {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000' }}>{project.name}</span>
                    {project.link && (
                      <span style={{ fontSize: '10px', color: '#666', marginLeft: '8px' }}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
                          View Project →
                        </a>
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <div style={{ fontSize: '11px', lineHeight: '1.4', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      {project.description}
                    </div>
                  )}
                  {project.technologies && (
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                      Technologies: {project.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </article>
  );
};

export default ModernTemplate;
