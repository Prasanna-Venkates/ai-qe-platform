import { useEffect, useMemo, useState } from "react";
import "./TraceabilityMatrix.css";

interface Requirement {
  id: string;
  title: string;
  type: "FR" | "NFR";
}

interface TestCase {
  id: string;
  requirementId: string;
}

export default function TraceabilityMatrix() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  /* ================= LOAD MOCK DATA ================= */

  useEffect(() => {
    const storedReq = localStorage.getItem("uploadedRequirements");

    if (storedReq) {
      setRequirements(JSON.parse(storedReq));
    }

    // 🔹 SAME MOCK TEST CASES STRUCTURE AS TestCases.tsx
    const mockTests: TestCase[] = [
      { id: "TEST-001", requirementId: "REQ-001" },
      { id: "TEST-002", requirementId: "REQ-001" },
      { id: "TEST-003", requirementId: "REQ-002" },
    ];

    setTestCases(mockTests);
  }, []);

  /* ================= DERIVED DATA ================= */

  const matrix = useMemo(() => {
    return requirements.map((req) => {
      const linked = testCases.filter(
        (tc) => tc.requirementId === req.id
      );
      return {
        ...req,
        tests: linked,
      };
    });
  }, [requirements, testCases]);

  const coverage = useMemo(() => {
    if (requirements.length === 0) return 0;
    const covered = matrix.filter((r) => r.tests.length > 0).length;
    return Math.round((covered / requirements.length) * 100);
  }, [matrix, requirements.length]);

  /* ================= UI ================= */

  return (
    <div className="traceability-page">
      <h1>Traceability Matrix</h1>

      <p className="subtitle">
        Requirement-to-test coverage visualization
      </p>

      {/* ===== COVERAGE SUMMARY ===== */}
      <div className="coverage-box">
        <strong>Coverage:</strong> {coverage}%
        {coverage < 100 && (
          <span className="coverage-warning">
            ⚠️ Uncovered requirements detected
          </span>
        )}
      </div>

      {/* ===== MATRIX TABLE ===== */}
      <table className="trace-table">
        <thead>
          <tr>
            <th>Requirement ID</th>
            <th>Type</th>
            <th>Title</th>
            <th>Linked Test Cases</th>
          </tr>
        </thead>

        <tbody>
          {matrix.map((row) => {
            const uncovered = row.tests.length === 0;

            return (
              <tr
                key={row.id}
                className={uncovered ? "uncovered" : ""}
              >
                <td>{row.id}</td>

                <td>
                  <span className={`type-tag ${row.type}`}>
                    {row.type}
                  </span>
                </td>

                <td>{row.title}</td>

                <td>
                  {row.tests.length === 0 ? (
                    <span className="no-tests">
                      ❌ No tests linked
                    </span>
                  ) : (
                    <>
                      <button
                        className="expand-btn"
                        onClick={() =>
                          setExpanded(
                            expanded === row.id ? null : row.id
                          )
                        }
                      >
                        {expanded === row.id
                          ? "Hide"
                          : "View"}{" "}
                        ({row.tests.length})
                      </button>

                      {expanded === row.id && (
                        <ul className="test-list">
                          {row.tests.map((t) => (
                            <li key={t.id}>{t.id}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
