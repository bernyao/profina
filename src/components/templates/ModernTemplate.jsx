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
    <div className="modern-resume bg-white text-gray-800 font-sans" style={{ fontSize: '11px', lineHeight: '1.4', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="header-section bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
        <div className="header-content">
          <h1 className="name text-3xl font-bold mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>{name}</h1>
          <h2 className="title text-xl font-medium text-blue-100 mb-4" style={{ fontSize: '18px', fontWeight: '500' }}>{title}</h2>
          <div className="contact-info flex flex-wrap gap-6 text-sm" style={{ fontSize: '12px' }}>
            {email && <span className="flex items-center gap-1">
              <span>📧</span> {email}
            </span>}
            {phone && <span className="flex items-center gap-1">
              <span>📱</span> {phone}
            </span>}
            {location && <span className="flex items-center gap-1">
              <span>📍</span> {location}
            </span>}
          </div>
        </div>
      </div>

      <div className="content-section px-8 py-6" style={{ padding: '24px 32px' }}>
        {/* Professional Summary */}
        {summary && (
          <section className="mb-6" style={{ marginBottom: '20px' }}>
            <h3 className="section-title text-lg font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1" style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed" style={{ fontSize: '11px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6" style={{ marginBottom: '20px' }}>
            <h3 className="section-title text-lg font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1" style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Professional Experience
            </h3>
            <div className="experience-list space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp, index) => (
                <div key={index} className="experience-item border-l-4 border-blue-200 pl-4" style={{ borderLeft: '3px solid #60A5FA', paddingLeft: '16px' }}>
                  <div className="flex justify-between items-start mb-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h4 className="job-title font-bold text-gray-800" style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>{exp.position}</h4>
                    <span className="duration text-sm text-gray-600 font-medium" style={{ fontSize: '10px', fontWeight: '600' }}>{exp.duration}</span>
                  </div>
                  <div className="company text-blue-600 font-semibold mb-2" style={{ fontSize: '11px', fontWeight: '600', marginBottom: '8px' }}>{exp.company}</div>
                  {exp.description && (
                    <p className="description text-gray-700 text-sm leading-relaxed" style={{ fontSize: '10px', lineHeight: '1.4', margin: 0, wordWrap: 'break-word', overflowWrap: 'break-word' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h3 className="section-title text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2" style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Education
            </h3>
            <div className="education-list space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="education-item flex justify-between items-start">
                  <div className="education-details">
                    <h4 className="degree font-bold text-gray-800" style={{ fontSize: '13px', fontWeight: '700' }}>{edu.degree}</h4>
                    <div className="institution text-blue-600 font-semibold" style={{ fontSize: '12px', fontWeight: '600' }}>{edu.institution}</div>
                    {edu.gpa && <span className="gpa text-sm text-gray-600" style={{ fontSize: '11px' }}>GPA: {edu.gpa}</span>}
                  </div>
                  <span className="year text-sm text-gray-600 font-medium" style={{ fontSize: '11px', fontWeight: '600' }}>{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h3 className="section-title text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2" style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Technical Skills
            </h3>
            <div className="skills-container flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="skill-tag bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ fontSize: '10px', fontWeight: '600', padding: '4px 8px' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h3 className="section-title text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2" style={{ fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Key Projects
            </h3>
            <div className="projects-list space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="project-item bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="project-name font-bold text-gray-800" style={{ fontSize: '13px', fontWeight: '700' }}>{project.name}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link text-blue-600 text-sm hover:underline"
                        style={{ fontSize: '10px' }}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="project-description text-gray-700 text-sm leading-relaxed mb-2" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      {project.description}
                    </p>
                  )}
                  {project.technologies && (
                    <div className="technologies text-sm text-gray-600" style={{ fontSize: '10px' }}>
                      <span className="font-medium">Technologies: </span>
                      {project.technologies}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
