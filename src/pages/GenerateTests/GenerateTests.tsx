import { useEffect, useRef, useState } from "react";
import "./GenerateTests.css";
import PageSkeleton from "../../components/common/PageSkeleton";
import { useGenerateTests } from "../../hooks/useGenerateTests";

const tabs = [
  "Manual Test Cases",
  "Automation (BDD)",
  "Security Tests",
  "Non-Functional Tests",
];

const streamingMessages = [
  "Initializing AI QE Engine...",
  "Loading project context...",
  "Parsing user stories...",
  "Analyzing acceptance criteria...",
  "Generating manual test cases...",
  "Generating BDD scenarios...",
  "Generating security test cases...",
  "Generating non-functional tests...",
  "Finalizing test artifacts...",
  "AI generation completed successfully ✅",
];

export default function GenerateTests() {
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const logIndex = useRef(0);

  const { generate, tests } = useGenerateTests();

  /* ================= PAGE LOAD ================= */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ================= START GENERATION ================= */
  const startGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    setHasGenerated(true);
    logIndex.current = 0;

    const stored = localStorage.getItem("currentRequirement");

    let promptText = "Login feature";

    if (stored) {
      const req = JSON.parse(stored);

      promptText = `
Title: ${req.title}

Description:
${req.description}

Acceptance Criteria:
${req.criteria}
`;
    }

    await generate(promptText);
  };

  /* ================= PROGRESS ================= */
  useEffect(() => {
    if (!isGenerating) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 400);

    return () => clearInterval(progressTimer);
  }, [isGenerating]);

  /* ================= STREAMING LOGS ================= */
  useEffect(() => {
    if (!isGenerating) return;

    const logTimer = setInterval(() => {
      if (logIndex.current < streamingMessages.length) {
        setLogs((prev) => [...prev, streamingMessages[logIndex.current]]);
        logIndex.current++;
      }
    }, 700);

    return () => clearInterval(logTimer);
  }, [isGenerating]);

  /* ================= UI ================= */
  return (
    <div className="generate-container">
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <h1>Generated Test Artifacts</h1>
          <p className="subtitle">
            AI-generated test cases based on your requirements
          </p>

          {!isGenerating && progress === 0 && (
            <>
              <p className="generate-note">
                Click the <strong>Generate Tests</strong> button to start
                AI-driven test generation.
              </p>

              <button className="generate-btn" onClick={startGeneration}>
                Generate Tests
              </button>
            </>
          )}

          {isGenerating && (
            <div className="generation-panel">
              <div className="loader" />

              <div className="progress-wrapper">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{progress}%</span>
              </div>

              <div className="logs">
                {logs.map((log, index) => (
                  <div key={index} className="log-line">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {progress === 100 && (
            <>
              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? "active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                {renderContent(activeTab, tests, hasGenerated)}
              </div>

              {/* 🔵 Demo note */}
              <div style={demoNote}>
                <strong>Demo Mode:</strong>  
                AI responses are simulated for demo stability.  
                The architecture uses a real service layer and can be switched  
                to live OpenAI APIs via environment configuration.
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ================= TAB CONTENT ================= */

function renderContent(
  tab: string,
  tests: string[],
  hasGenerated: boolean
) {
  switch (tab) {
    case "Manual Test Cases":
      return (
        <pre>
          {tests.length
            ? tests.join("\n")
            : hasGenerated
            ? "AI generated no results."
            : "Click Generate Tests to produce AI test cases."}
        </pre>
      );

    case "Automation (BDD)":
      return (
        <pre>{`Feature: User Login

Scenario: Successful login
  Given user is on login page
  When user enters valid credentials
  Then user should be redirected to dashboard`}</pre>
      );

    case "Security Tests":
      return (
        <pre>{`1. Verify SQL injection protection
2. Verify brute-force attack prevention
3. Verify password encryption`}</pre>
      );

    case "Non-Functional Tests":
      return (
        <pre>{`1. Verify login response time under load
2. Verify concurrent user handling
3. Verify system availability`}</pre>
      );

    default:
      return null;
  }
}

/* ================= DEMO NOTE STYLE ================= */

const demoNote = {
  marginTop: "30px",
  padding: "12px 16px",
  borderRadius: "8px",
  background: "#020617",
  border: "1px solid #1f2937",
  color: "#94a3b8",
  fontSize: "13px",
};
