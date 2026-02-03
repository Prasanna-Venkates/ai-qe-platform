import { useEffect, useState } from "react";
import "./Integrations.css";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function GitHubIntegration() {
  const [pageLoading, setPageLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [token, setToken] = useState("");

  /* ================= PAGE SKELETON ================= */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ================= LOAD SAVED STATE ================= */
  useEffect(() => {
    const saved = localStorage.getItem("githubConnected");
    const config = localStorage.getItem("githubConfig");

    if (saved === "true" && config) {
      const parsed = JSON.parse(config);
      setRepoUrl(parsed.repoUrl);
      setConnected(true);
    }
  }, []);

  /* ================= CONNECT (MOCK) ================= */
  const handleConnect = () => {
    if (!repoUrl || !token) {
      alert("Please fill all GitHub details");
      return;
    }

    // ✅ MOCK SUCCESSFUL CONNECTION
    localStorage.setItem("githubConnected", "true");
    localStorage.setItem(
      "githubConfig",
      JSON.stringify({ repoUrl })
    );

    setConnected(true);
  };

  /* ================= EDIT / RECONNECT ================= */
  const handleReconnect = () => {
    localStorage.removeItem("githubConnected");
    localStorage.removeItem("githubConfig");
    setConnected(false);
    setToken("");
  };

  /* ================= UI ================= */
  return (
    <div className="integration-container">
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <h1>GitHub Integration</h1>
          <p className="subtitle">
            Connect your GitHub repository to sync code, pull requests, and test
            automation.
          </p>

          {/* 🔔 PROTOTYPE NOTE */}
          <p className="integration-note">
            ⚠️ Note: This is a prototype integration. In production, GitHub APIs are
            accessed via backend services to securely handle tokens and avoid CORS
            and security issues. This demo uses a mocked connection flow.
          </p>

          {!connected ? (
            <div className="integration-card">
              <input
                type="text"
                placeholder="Repository URL (e.g. https://github.com/org/repo)"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />

              <input
                type="password"
                placeholder="Personal Access Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />

              <button onClick={handleConnect}>Connect GitHub</button>
            </div>
          ) : (
            <>
              <div className="success-box">
                ✅ GitHub repository connected successfully (Mock).
                <br />
                Repository:{" "}
                <strong>{repoUrl.split("/").pop()}</strong>
              </div>

              <br />

              <button
                onClick={handleReconnect}
                style={{
                  padding: "10px 16px",
                  background: "#1f2937",
                  border: "1px solid #3b82f6",
                  borderRadius: "6px",
                  color: "#3b82f6",
                  cursor: "pointer",
                }}
              >
                Edit / Reconnect GitHub
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
