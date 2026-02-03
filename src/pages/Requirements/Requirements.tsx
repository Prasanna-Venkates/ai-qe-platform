import { useEffect, useMemo, useState } from "react";
import "./Requirements.css";

interface Requirement {
  id: string;
  type: "FR" | "NFR";
  title: string;
  statement: string;
  linkedTests: number;
}

export default function Requirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [filter, setFilter] = useState<"ALL" | "FR" | "NFR">("ALL");
  const [search, setSearch] = useState("");

  /* ================= LOAD MOCK DATA ================= */

  useEffect(() => {
    const stored = localStorage.getItem("uploadedRequirements");

    if (stored) {
      const parsed = JSON.parse(stored);

      const enriched: Requirement[] = parsed.map((r: any) => ({
        ...r,
        linkedTests: Math.floor(Math.random() * 5), // mock linkage
      }));

      setRequirements(enriched);
    }
  }, []);

  /* ================= FILTER + SEARCH ================= */

  const visibleRequirements = useMemo(() => {
    return requirements.filter((req) => {
      const matchesType =
        filter === "ALL" ? true : req.type === filter;

      const matchesSearch =
        req.title.toLowerCase().includes(search.toLowerCase()) ||
        req.statement.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [requirements, filter, search]);

  return (
    <div className="requirements-page">
      <h1>Requirements Viewer</h1>

      <p className="subtitle">
        AI-enhanced, context-rich requirements extracted from uploaded documents
      </p>

      {/* ===== CONTROLS ===== */}
      <div className="requirements-controls">
        <input
          placeholder="Search requirements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            All
          </button>
          <button
            className={filter === "FR" ? "active" : ""}
            onClick={() => setFilter("FR")}
          >
            Functional
          </button>
          <button
            className={filter === "NFR" ? "active" : ""}
            onClick={() => setFilter("NFR")}
          >
            Non-Functional
          </button>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div className="requirements-list">
        {visibleRequirements.length === 0 && (
          <p className="empty">No requirements found</p>
        )}

        {visibleRequirements.map((req) => (
          <div key={req.id} className="requirement-card">
            <div className="card-header">
              <span className="req-id">{req.id}</span>
              <span className={`type-tag ${req.type}`}>
                {req.type}
              </span>
            </div>

            <h3>{req.title}</h3>

            <p className="statement" title={req.statement}>
              {req.statement}
            </p>

            <div className="card-footer">
              <span className="test-badge">
                🧪 {req.linkedTests} linked tests
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
