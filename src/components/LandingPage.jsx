import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp, signInWithGoogle } from "../firebase/auth";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(
          formData.email,
          formData.password,
          formData.displayName
        );
      }

      if (result.success) {
        setShowAuth(false);
        setFormData({ email: "", password: "", displayName: "" });
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetStarted = () => {
    setIsLogin(false);
    setShowAuth(true);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();
      if (result.success) {
        setShowAuth(false);
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // This component is only shown when user is not logged in
  // If user is logged in, they'll be redirected to dashboard

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Build Your Perfect{" "}
              <span className="brand-name">Resume with AI</span>
            </h1>
            <p className="hero-subtitle">
              Create professional resumes in minutes with our AI-powered
              builder. Choose from modern templates, get intelligent
              suggestions, and export to PDF.
            </p>
            <div className="hero-actions">
              <button className="cta-button primary" onClick={handleGetStarted}>
                Get Started Free
              </button>
              <button
                className="cta-button secondary"
                onClick={() =>
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="resume-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-title">Resume Preview</div>
              </div>
              <div className="preview-content">
                <div className="preview-line long"></div>
                <div className="preview-line medium"></div>
                <div className="preview-line short"></div>
                <div className="preview-line long"></div>
                <div className="preview-line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Why Choose Profina?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>AI-Powered Enhancement</h3>
              <p>
                Get intelligent suggestions to improve your resume content. Our
                AI helps you write more professional and ATS-friendly
                descriptions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 13H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 9H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Professional Templates</h3>
              <p>
                Choose from Modern, Classic, and Minimal templates. All designed
                to be ATS-friendly and visually appealing.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>One-Click Export</h3>
              <p>
                Export your resume as a high-quality PDF instantly. Perfect
                formatting every time, ready to send to employers.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Save Time</h3>
              <p>
                What used to take hours now takes minutes. Focus on your job
                search while we handle the resume formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Input Your Information</h3>
              <p>
                Fill in your personal details, experience, education, and skills
                using our intuitive form.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Enhances Content</h3>
              <p>
                Our AI analyzes your content and suggests improvements to make
                your resume more professional and ATS-friendly.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Choose Template</h3>
              <p>
                Select from our professional templates that best match your
                industry and personal style.
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Export & Apply</h3>
              <p>
                Download as PDF and start applying to jobs with confidence. Win
                more interviews!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="templates-section">
        <div className="container">
          <h2>Professional Templates</h2>
          <div className="templates-grid">
            <div className="template-card">
              <div className="template-preview modern">
                <div className="template-header">
                  <div className="template-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="template-content">
                  <div className="template-line long"></div>
                  <div className="template-line medium"></div>
                  <div className="template-line short"></div>
                  <div className="template-line long"></div>
                </div>
              </div>
              <h3>Modern</h3>
              <p>
                Clean, contemporary design perfect for tech and creative
                professionals.
              </p>
            </div>
            <div className="template-card">
              <div className="template-preview classic">
                <div className="template-header">
                  <div className="template-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="template-content">
                  <div className="template-line long"></div>
                  <div className="template-line medium"></div>
                  <div className="template-line short"></div>
                  <div className="template-line long"></div>
                </div>
              </div>
              <h3>Classic</h3>
              <p>
                Traditional layout ideal for corporate and business
                environments.
              </p>
            </div>
            <div className="template-card">
              <div className="template-preview minimal">
                <div className="template-header">
                  <div className="template-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="template-content">
                  <div className="template-line long"></div>
                  <div className="template-line medium"></div>
                  <div className="template-line short"></div>
                  <div className="template-line long"></div>
                </div>
              </div>
              <h3>Minimal</h3>
              <p>
                Simple, elegant design that lets your experience speak for
                itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Build Your Resume?</h2>
          <p>
            Join thousands of professionals who are already using Profina to
            create winning resumes.
          </p>
          <button
            className="cta-button primary large"
            onClick={handleGetStarted}
          >
            Start Building Your Resume Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Profina</h3>
              <p>
                AI-powered resume builder for professionals and job seekers.
              </p>
            </div>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#" onClick={handleGetStarted}>
                Get Started
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Profina. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <div className="auth-modal-header">
              <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
              <button
                onClick={() => setShowAuth(false)}
                className="auth-modal-close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="form-input"
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter your password"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="cta-button primary full-width"
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="google-signin-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="auth-modal-footer">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="auth-toggle"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
