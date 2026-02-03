import { useEffect, useState } from "react";
import "./Integrations.css";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function AzureDevOps() {
  const [pageLoading, setPageLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const [form, setForm] = useState({
    organizationUrl: "",
    projectName: "",
    pat: "",
  });

  /* ================= PAGE SKELETON ================= */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ================= LOAD SAVED STATE ================= */
  useEffect(() => {
    const saved = localStorage.getItem("azureConnected");
    const config = localStorage.getItem("azureConfig");

    if (saved === "true" && config) {
      const parsed = JSON.parse(config);
      setForm({
        organizationUrl: parsed.organizationUrl,
        projectName: parsed.projectName,
        pat: "",
      });
      setConnected(true);
    }
  }, []);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= CONNECT (MOCK) ================= */
  const handleConnect = () => {
    if (!form.organizationUrl || !form.projectName || !form.pat) {
      alert("Please fill all Azure DevOps details");
      return;
    }

    // ✅ MOCK SUCCESSFUL CONNECTION
    localStorage.setItem("azureConnected", "true");
    localStorage.setItem(
      "azureConfig",
      JSON.stringify({
        organizationUrl: form.organizationUrl,
        projectName: form.projectName,
      })
    );

    setConnected(true);
  };

  /* ================= EDIT / RECONNECT ================= */
  const handleEdit = () => {
    localStorage.removeItem("azureConnected");
    localStorage.removeItem("azureConfig");
    setConnected(false);
    setForm({ ...form, pat: "" });
  };

  /* ================= UI ================= */
  return (
    <div className="integration-container">
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <h1>Azure DevOps Integration</h1>
          <p className="subtitle">
            Connect Azure DevOps to sync work items, pipelines, and test plans.
          </p>

          {/* 🔔 PROTOTYPE NOTE */}
          <p className="integration-note">
            ⚠️ Note: This is a prototype integration. In production, Azure DevOps
            APIs are accessed via backend services to securely handle PAT tokens and
            avoid CORS and security issues. This demo uses a mocked connection flow.
          </p>

          {!connected ? (
            <div className="integration-card">
              <input
                name="organizationUrl"
                placeholder="Organization URL (https://dev.azure.com/org)"
                value={form.organizationUrl}
                onChange={handleChange}
              />

              <input
                name="projectName"
                placeholder="Project Name"
                value={form.projectName}
                onChange={handleChange}
              />

              <input
                name="pat"
                type="password"
                placeholder="Personal Access Token (PAT)"
                value={form.pat}
                onChange={handleChange}
              />

              <button onClick={handleConnect}>
                Connect Azure DevOps
              </button>
            </div>
          ) : (
            <>
              <div className="success-box">
                ✅ Azure DevOps is connected successfully (Mock).
                <br />
                <small>
                  Project: <b>{form.projectName}</b>
                </small>
              </div>

              <div style={{ marginTop: "20px", maxWidth: "500px" }}>
                <button
                  onClick={handleEdit}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#1f2937",
                    color: "#3b82f6",
                    border: "1px solid #3b82f6",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Edit / Reconnect Azure DevOps
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
