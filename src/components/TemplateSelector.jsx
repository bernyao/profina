import React, { useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import "./TemplateSelector.css";

const TemplateSelector = ({
  onSelect,
  onBack,
  selectedTemplate,
  resumeData,
}) => {
  const [previewTemplate, setPreviewTemplate] = useState(
    selectedTemplate || "modern"
  );

  // Use actual resume data or fallback to sample data
  const previewData = resumeData || {
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
      features: [
        "Clean layout",
        "Bold typography",
        "Color accents",
        "ATS-friendly",
      ],
      bestFor: "Tech & Creative",
    },
    {
      id: "classic",
      name: "Classic",
      description:
        "Traditional layout ideal for corporate and business environments",
      component: ClassicTemplate,
      features: [
        "Professional look",
        "Traditional format",
        "Conservative design",
        "Industry standard",
      ],
      bestFor: "Corporate & Business",
    },
    {
      id: "minimal",
      name: "Minimal",
      description:
        "Simple, elegant design that lets your experience speak for itself",
      component: MinimalTemplate,
      features: [
        "Minimal design",
        "Focus on content",
        "Clean lines",
        "Easy to read",
      ],
      bestFor: "All Industries",
    },
  ];

  const renderTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return null;

    const TemplateComponent = template.component;
    return <TemplateComponent data={previewData} />;
  };

  const handleTemplateHover = (templateId) => {
    setPreviewTemplate(templateId);
  };

  const handleTemplateSelect = (templateId) => {
    onSelect(templateId);
  };

  return (
    <div className="template-selector">
      <div className="template-selector-container">
        <div className="template-selector-header">
          <div className="header-content">
            <h1>Choose Your Template</h1>
            <p>
              Select a professional template that matches your style and
              industry
            </p>
          </div>
          <button onClick={onBack} className="btn btn-outline">
            ← Back to Form
          </button>
        </div>

        <div className="template-selector-content">
          <div className="template-gallery">
            <div className="template-gallery-header">
              <h2>Available Templates</h2>
              <p>Hover over templates to preview them</p>
            </div>

            <div className="template-options-horizontal">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${
                    selectedTemplate === template.id ? "selected" : ""
                  } ${previewTemplate === template.id ? "previewing" : ""}`}
                  onMouseEnter={() => handleTemplateHover(template.id)}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="template-preview-thumbnail">
                    <template.component data={previewData} />
                  </div>
                  <div className="template-card-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="selected-badge">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="template-preview-section">
            <div className="preview-header">
              <h2>Live Preview</h2>
              <span className="preview-template-name">
                {templates.find((t) => t.id === previewTemplate)?.name} Template
              </span>
            </div>

            <div className="template-preview-container">
              <div className="template-preview">
                {renderTemplate(previewTemplate)}
              </div>
            </div>
          </div>
        </div>

        <div className="template-selector-footer">
          <div className="template-comparison">
            <h3>All Templates Include:</h3>
            <div className="comparison-features">
              <div className="feature-item">
                <span className="feature-icon">📄</span>
                <span>ATS-Friendly Design</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>Mobile Responsive</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <span>Professional Styling</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💾</span>
                <span>PDF Export Ready</span>
              </div>
            </div>
          </div>

          <div className="template-actions">
            <button onClick={onBack} className="btn btn-outline">
              ← Back to Form
            </button>
            <button
              onClick={() =>
                handleTemplateSelect(selectedTemplate || previewTemplate)
              }
              className="btn btn-primary"
              disabled={!selectedTemplate && !previewTemplate}
            >
              Continue to Preview →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
