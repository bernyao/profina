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
    <div className="classic-resume bg-white text-gray-800" style={{ fontSize: '11px', lineHeight: '1.5', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6" style={{ borderBottom: '3px solid #374151' }}>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
        <h2 className="text-lg text-gray-600 mb-3">{title}</h2>
        <div className="flex justify-center gap-6 text-sm">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
        </div>
      </div>

      <div className="px-6 pb-6" style={{ padding: '24px 32px' }}>
        {/* Professional Summary */}
        {summary && (
          <section className="mb-6" style={{ marginBottom: '20px' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide" style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify" style={{ fontSize: '11px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Professional Experience
            </h3>
            <div className="space-y-5">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-base">{exp.position}</h4>
                    <span className="text-sm text-gray-600 font-medium">{exp.duration}</span>
                  </div>
                  <div className="text-gray-600 font-medium mb-2 italic">{exp.company}</div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                    <div className="text-gray-600 font-medium">{edu.institution}</div>
                    {edu.gpa && <span className="text-sm text-gray-600">GPA: {edu.gpa}</span>}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="text-gray-700 text-sm">
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Key Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800">{project.name}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed text-justify mb-1">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Technologies Used: </span>
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

export default ClassicTemplate;
