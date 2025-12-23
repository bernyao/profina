// Maintained by benyao
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserResumes, deleteResume } from "../firebase/resumes";
import { signOutUser } from "../firebase/auth";
import { getUserSubscription } from "../firebase/subscriptions";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingResume, setDeletingResume] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (user) {
      loadResumes();
      loadSubscription();
    }
  }, [user]);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const result = await getUserResumes(user.uid);
      if (result.success) {
        setResumes(result.resumes);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const loadSubscription = async () => {
    try {
      const sub = await getUserSubscription(user.uid);
      setSubscription(sub);
    } catch (error) {
      console.error("Error loading subscription:", error);
    }
  };

  const refreshData = async () => {
    await loadResumes();
    await loadSubscription();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteResume = async (resumeId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this resume? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeletingResume(resumeId);
      const result = await deleteResume(resumeId);
      if (result.success) {
        setResumes((prev) => prev.filter((r) => r.id !== resumeId));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to delete resume");
    } finally {
      setDeletingResume(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      setError("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.displayName || "User"}!</h1>
          <p>Create and manage your professional resumes with AI</p>
          <div className="subscription-info">
            {subscription?.plan === "premium" &&
            subscription?.status === "active" ? (
              <>
                <div className="plan-badge premium">⭐ Premium</div>
                <span className="usage-text">Unlimited resumes</span>
              </>
            ) : (
              <>
                <div className="plan-badge free">🆓 Free</div>
                <span className="usage-text">
                  {subscription?.resumesUsed || resumes.length} /{" "}
                  {subscription?.resumesLimit || 10} resumes created
                </span>
              </>
            )}
            {subscription?.plan === "free" &&
              subscription?.resumesUsed >= subscription?.resumesLimit && (
                <Link to="/pricing" className="upgrade-link">
                  Upgrade for unlimited resumes
                </Link>
              )}
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={refreshData}
            className="refresh-btn"
            disabled={loading}
            title="Refresh data"
          >
            🔄
          </button>
          <Link to="/resume/new" className="new-resume-btn">
            <span className="plus-icon">+</span>
            New Resume
          </Link>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="resumes-section">
        <h2>Your Resumes</h2>

        {resumes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No resumes yet</h3>
            <p>Create your first AI-powered resume to get started</p>
            <Link to="/resume/new" className="cta-button">
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <div className="resume-header">
                  <h3>{resume.name || "Untitled Resume"}</h3>
                  <span className="resume-date">
                    {formatDate(resume.updatedAt)}
                  </span>
                </div>

                <div className="resume-meta">
                  <span className="template-name">
                    {resume.template || "Modern"}
                  </span>
                  <span className="resume-title">
                    {resume.title || "No title"}
                  </span>
                </div>

                <div className="resume-actions">
                  <Link
                    to={`/resume/${resume.id}`}
                    className="action-btn primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteResume(resume.id)}
                    disabled={deletingResume === resume.id}
                  >
                    {deletingResume === resume.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>{resumes.length}</h3>
          <p>Total Resumes</p>
        </div>
        <div className="stat-card">
          <h3>
            {
              resumes.filter((r) => {
                const date = r.updatedAt?.toDate
                  ? r.updatedAt.toDate()
                  : new Date(r.updatedAt);
                const now = new Date();
                const diffTime = Math.abs(now - date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length
            }
          </h3>
          <p>This Week</p>
        </div>
        <div className="stat-card">
          <h3>{10 - resumes.length}</h3>
          <p>Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
