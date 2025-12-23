// Maintained by benyao
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import "./TemplatesPage.css";

const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewMode, setPreviewMode] = useState(false);

  // Sample resume data for preview
  const sampleData = {
    name: "John Smith",
    title: "Senior Software Engineer",
    summary:
      "Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers.",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    experience: [
      {
        position: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2020 - Present",
        description:
          "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored 3 junior developers and conducted code reviews.",
      },
      {
        position: "Software Engineer",
        company: "StartupXYZ",
        duration: "2018 - 2020",
        description:
          "Developed React-based web applications and Node.js backend services. Collaborated with cross-functional teams to deliver features on time and within budget.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2018",
        gpa: "3.8",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "Git",
      "Agile",
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform with React frontend and Node.js backend, handling 10K+ daily transactions.",
        technologies: "React, Node.js, MongoDB, Stripe API",
        link: "https://github.com/johnsmith/ecommerce",
      },
      {
        name: "Task Management App",
        description:
          "Developed a collaborative task management application with real-time updates using WebSockets.",
        technologies: "React, Socket.io, Express.js, PostgreSQL",
      },
    ],
  };

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description:
        "Clean, contemporary design perfect for tech and creative professionals",
      component: ModernTemplate,
    },
    {
      id: "classic",
      name: "Classic",
      description:
        "Traditional layout ideal for corporate and business environments",
      component: ClassicTemplate,
    },
    {
      id: "minimal",
      name: "Minimal",
      description:
        "Simple, elegant design that lets your experience speak for itself",
      component: MinimalTemplate,
    },
  ];

  const renderTemplate = () => {
    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return null;

    const TemplateComponent = template.component;
    return <TemplateComponent data={sampleData} />;
  };

  return (
    <div className="templates-page">
      <div className="templates-container">
        <div className="templates-header">
          <h1>Choose Your Resume Template</h1>
          <p>
            Select a professional template that best represents your style and
            industry
          </p>
        </div>

        <div className="templates-content">
          <div className="templates-sidebar">
            <div className="template-list">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-option ${
                    selectedTemplate === template.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="template-preview-small">
                    <template.component data={sampleData} />
                  </div>
                  <div className="template-info">
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="templates-main">
            <div className="template-preview-container">
              <div className="preview-header">
                <div className="preview-controls">
                  <button
                    className={`preview-btn ${!previewMode ? "active" : ""}`}
                    onClick={() => setPreviewMode(false)}
                  >
                    Live Preview
                  </button>
                  <button
                    className={`preview-btn ${previewMode ? "active" : ""}`}
                    onClick={() => setPreviewMode(true)}
                  >
                    PDF Preview
                  </button>
                </div>
                <div className="preview-actions">
                  <Link
                    to={`/resume/new?template=${selectedTemplate}`}
                    className="use-template-btn"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>

              <div className="template-preview">{renderTemplate()}</div>
            </div>
          </div>
        </div>

        <div className="templates-footer">
          <div className="template-features">
            <div className="feature">
              <div className="feature-icon">📄</div>
              <h3>Professional Design</h3>
              <p>
                All templates are designed by professionals and ATS-friendly
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <h3>Customizable</h3>
              <p>
                Easily customize colors, fonts, and layout to match your style
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Looks great on all devices and screen sizes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
