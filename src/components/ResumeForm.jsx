// Maintained by benyao
import React, { useState, useEffect } from "react";
import { enhanceText, generateResumeSummary } from "../services/aiService";
import {
  enhanceText as simpleEnhanceText,
  generateResumeSummary as simpleGenerateSummary,
} from "../services/aiServiceSimple";
import "./ResumeForm.css";

const ResumeForm = ({ data, onSave, onNext }) => {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [subField]: value } : item
      ),
    }));
  };

  const addArrayItem = (field, template) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleAIAssist = async (field, action = "improve") => {
    // Handle nested fields like experience.0.description or projects.1.description
    let currentValue = "";
    if (field.includes(".")) {
      const parts = field.split(".");
      if (parts[0] === "experience" || parts[0] === "projects") {
        const arrayIndex = parseInt(parts[1]);
        const subField = parts[2];
        currentValue = formData[parts[0]][arrayIndex][subField] || "";
      }
    } else {
      currentValue = formData[field] || "";
    }

    if (!currentValue || currentValue.trim() === "") return;

    setAiLoading(true);
    setActiveField(field);

    try {
      const result = await enhanceText(currentValue, action);
      if (result.success) {
        updateFieldValue(field, result.enhancedText);
      } else if (result.fallback) {
        updateFieldValue(field, result.fallback);
      } else {
        // Fallback to simple AI service
        const simpleResult = await simpleEnhanceText(currentValue, action);
        if (simpleResult.success) {
          updateFieldValue(field, simpleResult.enhancedText);
        } else if (simpleResult.fallback) {
          updateFieldValue(field, simpleResult.fallback);
        }
      }
    } catch (error) {
      console.error("AI assist error:", error);
      // Final fallback to simple text enhancement
      const simpleResult = await simpleEnhanceText(currentValue, action);
      if (simpleResult.success) {
        updateFieldValue(field, simpleResult.enhancedText);
      } else if (simpleResult.fallback) {
        updateFieldValue(field, simpleResult.fallback);
      }
    } finally {
      setAiLoading(false);
      setActiveField(null);
    }
  };

  const updateFieldValue = (field, value) => {
    if (field.includes(".")) {
      const parts = field.split(".");
      if (parts[0] === "experience" || parts[0] === "projects") {
        const arrayIndex = parseInt(parts[1]);
        const subField = parts[2];
        handleArrayChange(parts[0], arrayIndex, subField, value);
      }
    } else {
      handleInputChange(field, value);
    }
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const result = await generateResumeSummary(formData);
      if (result.success) {
        handleInputChange("summary", result.summary);
      } else if (result.fallback) {
        handleInputChange("summary", result.fallback);
      } else {
        // Fallback to simple AI service
        const simpleResult = await simpleGenerateSummary(formData);
        if (simpleResult.success) {
          handleInputChange("summary", simpleResult.summary);
        } else if (simpleResult.fallback) {
          handleInputChange("summary", simpleResult.fallback);
        }
      }
    } catch (error) {
      console.error("Summary generation error:", error);
      // Final fallback to simple summary generation
      const simpleResult = await simpleGenerateSummary(formData);
      if (simpleResult.success) {
        handleInputChange("summary", simpleResult.summary);
      } else if (simpleResult.fallback) {
        handleInputChange("summary", simpleResult.fallback);
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleNext = () => {
    onSave(formData);
    onNext();
  };

  const AIButton = ({ field, action = "improve", children }) => (
    <button
      type="button"
      onClick={() => handleAIAssist(field, action)}
      disabled={aiLoading && activeField === field}
      className={`ai-button ${
        aiLoading && activeField === field ? "loading" : ""
      }`}
    >
      {aiLoading && activeField === field ? (
        <div className="spinner"></div>
      ) : (
        children
      )}
    </button>
  );

  return (
    <div className="resume-form">
      <div className="resume-form-container">
        <div className="resume-form-header">
          <div className="resume-form-title">
            <h1>Resume Information</h1>
            <p>Fill in your details. Our AI will help enhance your content.</p>
          </div>
          <div className="resume-form-actions">
            <button onClick={handleSave} className="btn btn-outline">
              Save Draft
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Next: Choose Template
            </button>
          </div>
        </div>

        <div className="resume-form-content">
          {/* Personal Information */}
          <section className="form-section">
            <h2 className="form-section-title">Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="form-input"
                  placeholder="Software Engineer"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="form-input"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Professional Summary</h2>
              <div className="form-section-actions">
                <button
                  onClick={handleGenerateSummary}
                  disabled={aiLoading}
                  className="btn btn-outline btn-sm"
                >
                  {aiLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    "Generate with AI"
                  )}
                </button>
              </div>
            </div>
            <div className="form-group">
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="form-input form-textarea"
                rows={4}
                placeholder="Write a compelling summary of your professional background..."
              />
              <div className="ai-buttons-container">
                <AIButton field="summary" action="improve">
                  Improve
                </AIButton>
                <AIButton field="summary" action="expand">
                  Expand
                </AIButton>
                <AIButton field="summary" action="shorten">
                  Shorten
                </AIButton>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Work Experience</h2>
              <div className="form-section-actions">
                <button
                  onClick={() =>
                    addArrayItem("experience", {
                      position: "",
                      company: "",
                      duration: "",
                      description: "",
                    })
                  }
                  className="add-button"
                >
                  + Add Experience
                </button>
              </div>
            </div>
            <div className="array-section">
              {formData.experience.map((exp, index) => (
                <div key={index} className="array-item">
                  <div className="array-item-header">
                    <h3 className="array-item-title">
                      Experience #{index + 1}
                    </h3>
                    <button
                      onClick={() => removeArrayItem("experience", index)}
                      className="array-item-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="array-item-content">
                    <div className="array-item-grid">
                      <div className="form-group">
                        <label className="form-label">Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="Tech Company Inc."
                        />
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="Jan 2020 - Present"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="form-input form-textarea"
                          rows={3}
                          placeholder="Describe your key achievements and responsibilities..."
                        />
                        <div className="ai-buttons-container">
                          <AIButton
                            field={`experience.${index}.description`}
                            action="improve"
                          >
                            Improve
                          </AIButton>
                          <AIButton
                            field={`experience.${index}.description`}
                            action="expand"
                          >
                            Expand
                          </AIButton>
                          <AIButton
                            field={`experience.${index}.description`}
                            action="shorten"
                          >
                            Shorten
                          </AIButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Education</h2>
              <div className="form-section-actions">
                <button
                  onClick={() =>
                    addArrayItem("education", {
                      degree: "",
                      institution: "",
                      year: "",
                      gpa: "",
                    })
                  }
                  className="add-button"
                >
                  + Add Education
                </button>
              </div>
            </div>
            <div className="array-section">
              {formData.education.map((edu, index) => (
                <div key={index} className="array-item">
                  <div className="array-item-header">
                    <h3 className="array-item-title">Education #{index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem("education", index)}
                      className="array-item-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="array-item-content">
                    <div className="array-item-grid">
                      <div className="form-group">
                        <label className="form-label">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              index,
                              "degree",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="University of California"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              index,
                              "year",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="2020"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GPA (Optional)</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) =>
                            handleArrayChange(
                              "education",
                              index,
                              "gpa",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="3.8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Skills</h2>
              <div className="form-section-actions">
                <button
                  onClick={() => addArrayItem("skills", "")}
                  className="add-button"
                >
                  + Add Skill
                </button>
              </div>
            </div>
            <div className="array-section">
              {formData.skills.map((skill, index) => (
                <div key={index} className="array-item">
                  <div className="array-item-content">
                    <div className="form-group">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...formData.skills];
                          newSkills[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            skills: newSkills,
                          }));
                        }}
                        className="form-input"
                        placeholder="JavaScript, React, Node.js"
                      />
                    </div>
                    <button
                      onClick={() => removeArrayItem("skills", index)}
                      className="array-item-remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="form-section">
            <div className="form-section-header">
              <h2 className="form-section-title">Projects</h2>
              <div className="form-section-actions">
                <button
                  onClick={() =>
                    addArrayItem("projects", {
                      name: "",
                      description: "",
                      technologies: "",
                      link: "",
                    })
                  }
                  className="add-button"
                >
                  + Add Project
                </button>
              </div>
            </div>
            <div className="array-section">
              {formData.projects.map((project, index) => (
                <div key={index} className="array-item">
                  <div className="array-item-header">
                    <h3 className="array-item-title">Project #{index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem("projects", index)}
                      className="array-item-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="array-item-content">
                    <div className="form-group">
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="form-input"
                        placeholder="E-commerce Website"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="form-input form-textarea"
                        rows={3}
                        placeholder="Describe your project..."
                      />
                      <div className="ai-buttons-container">
                        <AIButton
                          field={`projects.${index}.description`}
                          action="improve"
                        >
                          Improve
                        </AIButton>
                        <AIButton
                          field={`projects.${index}.description`}
                          action="expand"
                        >
                          Expand
                        </AIButton>
                        <AIButton
                          field={`projects.${index}.description`}
                          action="shorten"
                        >
                          Shorten
                        </AIButton>
                      </div>
                    </div>
                    <div className="array-item-grid">
                      <div className="form-group">
                        <label className="form-label">Technologies</label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) =>
                            handleArrayChange(
                              "projects",
                              index,
                              "technologies",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Link (Optional)</label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) =>
                            handleArrayChange(
                              "projects",
                              index,
                              "link",
                              e.target.value
                            )
                          }
                          className="form-input"
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="form-footer">
          <div className="form-footer-actions">
            <button onClick={handleSave} className="btn btn-outline">
              Save Draft
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Next: Choose Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
