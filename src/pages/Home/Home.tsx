import { useEffect, useState } from "react";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate dashboard loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Dashboard</h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Welcome to the AI Quality Engineering Platform
      </p>

      {/* ===== INTRO CARD (NO HOVER) ===== */}
      <div style={introCard}>
        <h2 style={{ marginBottom: "10px" }}>
          AI-Driven Quality Engineering Platform
        </h2>
        <p style={{ lineHeight: 1.6, color: "#cbd5f5" }}>
          This platform helps QA teams and developers generate intelligent test
          cases from requirements, automate test creation, and seamlessly
          integrate with popular DevOps tools like Jira, Azure DevOps, and
          GitHub.
        </p>
      </div>

      {/* ===== FEATURE CARDS (WITH HOVER) ===== */}
      <div style={grid}>
        <HoverCard
          title="📋 Requirement-Based Test Generation"
          description="Convert user stories and acceptance criteria into manual,
          automation, security, and non-functional test cases using AI."
        />

        <HoverCard
          title="🤖 Automation Ready"
          description="Generate automation-friendly test artifacts including BDD
          (Gherkin) scenarios for Selenium, Playwright, or Cypress."
        />

        <HoverCard
          title="🔗 Jira Integration"
          description="Sync user stories and requirements directly from Jira
          projects to ensure traceability and test coverage."
        />

        <HoverCard
          title="🚀 Azure DevOps Integration"
          description="Connect Azure DevOps projects to manage work items,
          pipelines, and test execution workflows."
        />

        <HoverCard
          title="🐙 GitHub Integration"
          description="Link repositories to push generated automation code and
          maintain test assets alongside application code."
        />

        <HoverCard
          title="📊 Centralized QA Dashboard"
          description="Track projects, test artifacts, integrations, and
          AI-generated outputs from a single unified dashboard."
        />
      </div>
    </>
  );
}

/* ===== REUSABLE HOVER CARD COMPONENT ===== */

function HoverCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="hover-card">
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#cbd5f5" }}>{description}</p>
    </div>
  );
}

/* ===== STYLES ===== */

const introCard = {
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "14px",
  padding: "24px",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};
