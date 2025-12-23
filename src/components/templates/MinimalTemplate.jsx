// Maintained by benyao
import React from "react";

const MinimalTemplate = ({ data }) => {
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
    <article className="minimal-resume" style={{ 
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
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {name}
        </h1>
        <address style={{ fontSize: '11px', color: '#000', marginBottom: '20px', fontStyle: 'normal' }}>
          {email && <span style={{ marginRight: '20px' }}>{email}</span>}
          {phone && <span style={{ marginRight: '20px' }}>{phone}</span>}
          {location && <span>{location}</span>}
        </address>
      </header>

      <main>
        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #000',
              paddingBottom: '4px'
            }}>
              Education
            </h3>
            <div>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        color: '#000',
                        marginBottom: '2px'
                      }}>
                        {edu.institution}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#000',
                        fontStyle: 'italic',
                        marginBottom: '4px'
                      }}>
                        {edu.degree}
                      </div>
                      {edu.gpa && (
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#666',
                          marginBottom: '4px'
                        }}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                      {edu.description && (
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#666'
                        }}>
                          {edu.description}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '11px', color: '#000', fontWeight: '600' }}>
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #000',
              paddingBottom: '4px'
            }}>
              Work Experience
            </h3>
            <div>
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        color: '#000',
                        marginBottom: '2px'
                      }}>
                        {exp.company}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#000',
                        fontStyle: 'italic',
                        marginBottom: '8px'
                      }}>
                        {exp.position}
                      </div>
                      {exp.description && (
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.4' }}>
                          {exp.description.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                            <li key={lineIndex} style={{ marginBottom: '2px' }}>
                              {line}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <span style={{ fontSize: '11px', color: '#000', fontWeight: '600' }}>
                      {exp.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills and Proficiencies */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #000',
              paddingBottom: '4px'
            }}>
              Skills and Proficiencies
            </h3>
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Programming languages:</span> {skills.slice(0, Math.ceil(skills.length / 2)).join(', ')}
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Experience With:</span> {skills.slice(Math.ceil(skills.length / 2)).join(', ')}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#000',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #000',
              paddingBottom: '4px'
            }}>
              Projects
            </h3>
            <div>
              {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
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
                        {project.link}
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.4' }}>
                      {project.description.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                        <li key={lineIndex} style={{ marginBottom: '2px' }}>
                          {line}
                        </li>
                      ))}
                    </ul>
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
      </main>
    </article>
  );
};

export default MinimalTemplate;
