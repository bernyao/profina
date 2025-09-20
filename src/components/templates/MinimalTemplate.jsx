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
    <div className="minimal-resume bg-white text-gray-700" style={{ fontSize: '11px', lineHeight: '1.6', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-8" style={{ padding: '20px 0' }}>
        <h1 className="text-2xl font-light text-gray-800 mb-1">{name}</h1>
        <h2 className="text-sm text-gray-500 mb-4">{title}</h2>
        <div className="text-xs text-gray-500 space-y-1">
          {email && <div>{email}</div>}
          {phone && <div>{phone}</div>}
          {location && <div>{location}</div>}
        </div>
      </div>

      <div className="px-6 pb-6" style={{ padding: '24px 32px' }}>
        {/* Professional Summary */}
        {summary && (
          <section className="mb-8" style={{ marginBottom: '20px' }}>
            <h3 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wider" style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '1px' }}>
              Summary
            </h3>
            <p className="text-gray-600 leading-relaxed text-justify" style={{ fontSize: '11px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider">
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-800">{exp.position}</h4>
                    <span className="text-xs text-gray-500">{exp.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{exp.company}</div>
                  {exp.description && (
                    <p className="text-gray-600 text-xs leading-relaxed text-justify">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                    {edu.gpa && <span className="text-xs text-gray-500">GPA: {edu.gpa}</span>}
                  </div>
                  <span className="text-xs text-gray-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider">
              Skills
            </h3>
            <div className="text-gray-600 text-xs leading-relaxed">
              {skills.join(" • ")}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider">
              Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-800">{project.name}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-xs hover:underline"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-600 text-xs leading-relaxed text-justify mb-1">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && (
                    <div className="text-xs text-gray-500">
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

export default MinimalTemplate;
