// Maintained by benyao
import React from "react";

const ClassicTemplate = ({ data }) => {
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
    <article className="classic-resume" style={{ 
      fontSize: '11px', 
      lineHeight: '1.5', 
      fontFamily: 'Times New Roman, serif',
      color: '#000',
      backgroundColor: '#fff',
      padding: '40px',
      maxWidth: '210mm',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ flex: '2' }}>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '8px',
              fontFamily: 'Times New Roman, serif'
            }}>
              {name}
            </h1>
            {summary && (
              <p style={{ 
                fontSize: '11px', 
                color: '#000',
                margin: 0,
                fontStyle: 'italic'
              }}>
                {summary}
              </p>
            )}
          </div>
          <address style={{ flex: '1', textAlign: 'right', fontSize: '11px', lineHeight: '1.6', fontStyle: 'normal' }}>
            {location && <div>{location}</div>}
            {phone && <div>{phone}</div>}
            {email && <div>{email}</div>}
          </address>
        </div>
      </header>

      <main style={{ display: 'flex', gap: '30px' }}>
        {/* Left Column */}
        <div style={{ flex: '2' }}>
          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Experience
              </h3>
              <div>
                {experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                      {exp.duration}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      lineHeight: '1.4', 
                      margin: 0, 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word',
                      fontStyle: 'italic'
                    }}>
                      <span style={{ fontStyle: 'normal' }}>{exp.company}</span>
                    </div>
                    {exp.description && (
                      <div style={{ 
                        fontSize: '11px', 
                        lineHeight: '1.4', 
                        margin: '8px 0 0 0', 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word'
                      }}>
                        {exp.description.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                          <div key={lineIndex} style={{ marginBottom: '4px' }}>
                            {line}
                          </div>
                        ))}
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
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Education
              </h3>
              <div>
                {education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                      {edu.year}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      lineHeight: '1.4', 
                      margin: 0, 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word',
                      fontStyle: 'italic'
                    }}>
                      <span style={{ fontStyle: 'normal' }}>{edu.institution}</span>
                    </div>
                    {edu.gpa && (
                      <div style={{ 
                        fontSize: '11px', 
                        lineHeight: '1.4', 
                        margin: '4px 0 0 0', 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word'
                      }}>
                        GPA: {edu.gpa}
                      </div>
                    )}
                    {edu.description && (
                      <div style={{ 
                        fontSize: '11px', 
                        lineHeight: '1.4', 
                        margin: '4px 0 0 0', 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word'
                      }}>
                        {edu.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Projects
              </h3>
              <div>
                {projects.map((project, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        color: '#000'
                      }}>
                        {project.name}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '10px', color: '#0066cc', textDecoration: 'none' }}
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <div style={{ 
                        fontSize: '11px', 
                        lineHeight: '1.4', 
                        margin: '4px 0 0 0', 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word'
                      }}>
                        {project.description.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                          <div key={lineIndex} style={{ marginBottom: '4px' }}>
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                    {project.technologies && (
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#666',
                        margin: '4px 0 0 0', 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word'
                      }}>
                        Technologies: {project.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: '1' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#0066cc',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Skills
              </h3>
              <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
                {skills.map((skill, index) => (
                  <div key={index} style={{ marginBottom: '4px' }}>
                    • {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </article>
  );
};

export default ClassicTemplate;
