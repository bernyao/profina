// Maintained by benyao
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import { generateResumePDF, downloadPDF } from "../services/pdfService";
import "./ResumePreview.css";

const ResumePreview = ({ data, onBack, onEdit }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfObject, setPdfObject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportError, setExportError] = useState("");
  const resumeRef = useRef(null);

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const renderTemplate = () => {
    switch (data.template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setExportError("");

    try {
      // Get the template component
      const templateComponent = renderTemplate();

      // Generate PDF
      const pdf = await generateResumePDF(data, templateComponent);

      // Store the PDF object for download
      setPdfObject(pdf);

      // Create blob URL for preview
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("PDF generation error:", error);
      setExportError(
        `Failed to generate PDF: ${
          error.message || "Unknown error"
        }. Please try again.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (pdfObject) {
      downloadPDF(pdfObject, `${data.name || "resume"}-resume.pdf`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <div className="preview-title">
          <h1>Resume Preview</h1>
          <p>Review your resume and export when ready</p>
        </div>

        <div className="preview-actions">
          <button onClick={onEdit} className="btn btn-outline">
            Edit Resume
          </button>

          <button onClick={onBack} className="btn btn-outline">
            Change Template
          </button>

          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="btn btn-primary"
          >
            {isGenerating ? "Generating..." : "Generate PDF"}
          </button>

          {pdfUrl && (
            <>
              <button onClick={handleDownload} className="btn btn-success">
                Download PDF
              </button>

              <button onClick={handlePrint} className="btn btn-secondary">
                Print
              </button>
            </>
          )}
        </div>
      </div>

      {exportError && (
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <span>{exportError}</span>
        </div>
      )}

      <div className="preview-content">
        <div className="preview-container">
          <div className="resume-paper" ref={resumeRef}>
            {renderTemplate()}
          </div>
        </div>

        {pdfUrl && (
          <div className="pdf-preview">
            <h3>PDF Preview</h3>
            <iframe
              src={pdfUrl}
              width="100%"
              height="600"
              style={{ border: "none", borderRadius: "8px" }}
              title="PDF Preview"
            />
          </div>
        )}
      </div>

      <div className="preview-footer">
        <div className="template-info">
          <span className="template-badge">
            {data.template?.charAt(0).toUpperCase() + data.template?.slice(1)}{" "}
            Template
          </span>
          <span className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="preview-tips">
          <h4>💡 Tips for a great resume:</h4>
          <ul>
            <li>Keep it to 1-2 pages maximum</li>
            <li>Use action verbs to describe your achievements</li>
            <li>Include quantifiable results where possible</li>
            <li>Proofread for spelling and grammar errors</li>
            <li>Save as PDF for best compatibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
