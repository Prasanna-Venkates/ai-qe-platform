import { useEffect, useState } from "react";
import "./Integrations.css";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function JiraIntegration() {
  const [pageLoading, setPageLoading] = useState(true);

  const [jiraUrl, setJiraUrl] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PAGE SKELETON ================= */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ================= LOAD SAVED STATE ================= */
  useEffect(() => {
    const saved = localStorage.getItem("jiraConnected");
    const config = localStorage.getItem("jiraConfig");

    if (saved === "true" && config) {
      const parsed = JSON.parse(config);
      setJiraUrl(parsed.jiraUrl);
      setEmail(parsed.email);
      setConnected(true);
    }
  }, []);

  /* ================= MOCK CONNECT ================= */
  const handleConnect = async () => {
    setError("");

    if (!jiraUrl || !email || !token) {
      setError("Please fill all Jira details");
      return;
    }

    setLoading(true);

    // ✅ MOCK DELAY (simulating API call)
    setTimeout(() => {
      localStorage.setItem("jiraConnected", "true");
      localStorage.setItem(
        "jiraConfig",
        JSON.stringify({ jiraUrl, email })
      );

      setConnected(true);
      setLoading(false);
    }, 1200);
  };

  /* ================= EDIT / RECONNECT ================= */
  const handleEdit = () => {
    localStorage.removeItem("jiraConnected");
    localStorage.removeItem("jiraConfig");
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
          <h1>Jira Integration</h1>

          <p className="subtitle">
            Connect your Jira account to sync user stories and test cases.
          </p>

          {/* ✅ IMPORTANT NOTE */}
          <p className="integration-note">
            ⚠️ Note: This is a prototype integration.  
            Real Jira APIs are accessed via backend services in production to avoid
            CORS and security issues. This demo uses a mocked connection flow.
          </p>

          {!connected ? (
            <div className="integration-card">
              <input
                placeholder="Jira URL (e.g. https://your-domain.atlassian.net)"
                value={jiraUrl}
                onChange={(e) => setJiraUrl(e.target.value)}
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="API Token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />

              {error && <p style={{ color: "#ef4444" }}>{error}</p>}

              <button onClick={handleConnect} disabled={loading}>
                {loading ? "Connecting..." : "Connect Jira"}
              </button>
            </div>
          ) : (
            <>
              <div className="success-box">
                ✅ Jira is connected successfully (Mock).
              </div>

              <div style={{ marginTop: "20px", maxWidth: "500px" }}>
                <button
                  onClick={handleEdit}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#1f2937",
                    border: "1px solid #3b82f6",
                    borderRadius: "6px",
                    color: "#3b82f6",
                    cursor: "pointer",
                  }}
                >
                  Edit / Reconnect Jira
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
