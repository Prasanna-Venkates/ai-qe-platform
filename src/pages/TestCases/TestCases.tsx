import { useEffect, useMemo, useState } from "react";
import "./TestCases.css";

interface TestCase {
  id: string;
  requirementId: string;
  title: string;
  type: "Positive" | "Negative" | "Boundary";
  steps: string[];
  expected: string[];
}

interface Requirement {
  id: string;
  title: string;
  statement: string;
  type: "FR" | "NFR";
}

export default function TestCases() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const [selectedReq, setSelectedReq] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | "Positive" | "Negative" | "Boundary"
  >("ALL");

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidePanelReq, setSidePanelReq] = useState<Requirement | null>(null);

  /* ================= LOAD MOCK DATA ================= */

  useEffect(() => {
    const storedReq = localStorage.getItem("uploadedRequirements");

    if (storedReq) {
      setRequirements(JSON.parse(storedReq));
    }

    const mockTests: TestCase[] = [
      {
        id: "TEST-001",
        requirementId: "REQ-001",
        title: "Login with valid credentials",
        type: "Positive",
        steps: [
          "Navigate to login page",
          "Enter valid username and password",
          "Click Login",
        ],
        expected: ["User is redirected to dashboard"],
      },
      {
        id: "TEST-002",
        requirementId: "REQ-001",
        title: "Login with invalid password",
        type: "Negative",
        steps: [
          "Navigate to login page",
          "Enter valid username and invalid password",
          "Click Login",
        ],
        expected: ["Error message is displayed"],
      },
      {
        id: "TEST-003",
        requirementId: "REQ-002",
        title: "System response time under load",
        type: "Boundary",
        steps: [
          "Simulate 1000 concurrent users",
          "Trigger login requests",
        ],
        expected: ["Response time is under 2 seconds"],
      },
    ];

    setTestCases(mockTests);
  }, []);

  /* ================= FILTER LOGIC ================= */

  const visibleTests = useMemo(() => {
    return testCases.filter((tc) => {
      const matchesReq =
        selectedReq === "ALL" || tc.requirementId === selectedReq;

      const matchesType =
        typeFilter === "ALL" || tc.type === typeFilter;

      return matchesReq && matchesType;
    });
  }, [testCases, selectedReq, typeFilter]);

  /* ================= UI ================= */

  return (
    <div className="testcases-page">
      <h1>Test Case Explorer</h1>

      <p className="subtitle">
        Structured, AI-generated test cases with requirement traceability
      </p>

      {/* ===== FILTERS ===== */}
      <div className="tc-filters">
        <select
          value={selectedReq}
          onChange={(e) => setSelectedReq(e.target.value)}
        >
          <option value="ALL">All Requirements</option>
          {requirements.map((r) => (
            <option key={r.id} value={r.id}>
              {r.id}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as any)
          }
        >
          <option value="ALL">All Types</option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
          <option value="Boundary">Boundary</option>
        </select>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="tc-layout">
        <div className="tc-list">
          {visibleTests.map((tc) => (
            <div key={tc.id} className="tc-card">
              <div className="tc-header">
                <span className="tc-id">{tc.id}</span>

                <span
                  className="tc-req-link"
                  onClick={() =>
                    setSidePanelReq(
                      requirements.find(
                        (r) => r.id === tc.requirementId
                      ) || null
                    )
                  }
                >
                  {tc.requirementId}
                </span>

                <span className={`tc-type ${tc.type}`}>
                  {tc.type}
                </span>
              </div>

              <h3>{tc.title}</h3>

              <button
                className="expand-btn"
                onClick={() =>
                  setExpandedId(
                    expandedId === tc.id ? null : tc.id
                  )
                }
              >
                {expandedId === tc.id
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {expandedId === tc.id && (
                <div className="tc-details">
                  <strong>Steps:</strong>
                  <ul>
                    {tc.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>

                  <strong>Expected Result:</strong>
                  <ul>
                    {tc.expected.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== SIDE PANEL ===== */}
        {sidePanelReq && (
          <div className="tc-side-panel">
            <button
              className="close-panel"
              onClick={() => setSidePanelReq(null)}
            >
              ✕
            </button>

            <h2>{sidePanelReq.id}</h2>
            <span className={`type-tag ${sidePanelReq.type}`}>
              {sidePanelReq.type}
            </span>

            <h3>{sidePanelReq.title}</h3>
            <p>{sidePanelReq.statement}</p>
          </div>
        )}
      </div>
    </div>
  );
}
