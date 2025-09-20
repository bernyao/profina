import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { getResume, createResume, updateResume } from "../firebase/resumes";
import ResumeForm from "./ResumeForm";
import TemplateSelector from "./TemplateSelector";
import ResumePreview from "./ResumePreview";
import "./ResumeBuilder.css";

const ResumeBuilder = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("form"); // form, template, preview
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template: "modern",
  });

  useEffect(() => {
    // Check if template is specified in URL
    const templateParam = searchParams.get("template");
    if (templateParam) {
      setResumeData((prev) => ({ ...prev, template: templateParam }));
      setCurrentStep("form");
    }

    if (id && id !== "new") {
      loadResume();
    } else {
      setLoading(false);
    }
  }, [id, searchParams]);

  const loadResume = async () => {
    try {
      setLoading(true);
      const result = await getResume(id);
      if (result.success) {
        setResume(result.resume);
        setResumeData(result.resume);
        setCurrentStep("preview"); // Go directly to preview for existing resumes
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResume = async (data) => {
    try {
      setResumeData(data);

      if (id && id !== "new") {
        // Update existing resume
        const result = await updateResume(id, data);
        if (!result.success) {
          setError(result.error);
          return;
        }
      } else {
        // Create new resume
        const result = await createResume(user.uid, data);
        if (result.success) {
          navigate(`/resume/${result.id}`);
          return;
        } else {
          setError(result.error);
          return;
        }
      }
    } catch (err) {
      setError("Failed to save resume");
    }
  };

  const handleTemplateSelect = (template) => {
    const updatedData = { ...resumeData, template };
    setResumeData(updatedData);
    handleSaveResume(updatedData);
    setCurrentStep("preview");
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  const handleBackToTemplates = () => {
    setCurrentStep("template");
  };

  const handleNext = () => {
    if (currentStep === "form") {
      setCurrentStep("template");
    }
  };

  if (loading) {
    return (
      <div className="resume-builder-loading">
        <div className="loading-spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resume-builder-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading Resume</h2>
          <p>{error}</p>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-builder">
      {/* Progress Steps */}
      <div className="progress-steps">
        <div className="progress-container">
          <div
            className="step"
            data-step="1"
            data-active={currentStep === "form"}
          >
            <div className="step-circle">
              <span>1</span>
            </div>
            <div className="step-content">
              <h3>Personal Information</h3>
              <p>Add your details and experience</p>
            </div>
          </div>

          <div
            className="step-connector"
            data-active={
              currentStep === "template" || currentStep === "preview"
            }
          ></div>

          <div
            className="step"
            data-step="2"
            data-active={
              currentStep === "template" || currentStep === "preview"
            }
          >
            <div className="step-circle">
              <span>2</span>
            </div>
            <div className="step-content">
              <h3>Choose Template</h3>
              <p>Select your preferred design</p>
            </div>
          </div>

          <div
            className="step-connector"
            data-active={currentStep === "preview"}
          ></div>

          <div
            className="step"
            data-step="3"
            data-active={currentStep === "preview"}
          >
            <div className="step-circle">
              <span>3</span>
            </div>
            <div className="step-content">
              <h3>Preview & Export</h3>
              <p>Review and download your resume</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="resume-builder-content">
        <div className="content-container">
          {currentStep === "form" && (
            <ResumeForm
              data={resumeData}
              onSave={handleSaveResume}
              onNext={handleNext}
            />
          )}

          {currentStep === "template" && (
            <TemplateSelector
              onSelect={handleTemplateSelect}
              onBack={handleBackToForm}
              selectedTemplate={resumeData.template}
              resumeData={resumeData}
            />
          )}

          {currentStep === "preview" && (
            <ResumePreview
              data={resumeData}
              onBack={handleBackToTemplates}
              onEdit={handleBackToForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
