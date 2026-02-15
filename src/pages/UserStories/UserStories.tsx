import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function UserStories() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSubmit = () => {
    setLoading(true);

    // 🔵 Save requirement for AI page
    localStorage.setItem(
      "currentRequirement",
      JSON.stringify({
        title,
        description,
        criteria
      })
    );

    // simulate processing delay
    setTimeout(() => {
      navigate(`/projects/${id}/generate-tests`);
    }, 1500);
  };

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>User Stories</h1>

      {!loading ? (
        <div style={card}>
          <h3>Add Requirement / User Story</h3>

          <input
            placeholder="User Story Title"
            style={input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="User Story Description"
            style={textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            placeholder="Acceptance Criteria"
            style={textarea}
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />

          <button style={button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <>
          <PageSkeleton />
          <p style={{ marginTop: "20px", color: "#94a3b8" }}>
            AI is analyzing requirements and generating test cases…
          </p>
        </>
      )}
    </>
  );
}

/* ===== STYLES ===== */

const card = {
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "12px",
  padding: "24px",
  maxWidth: "700px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  background: "#020617",
  border: "1px solid #1f2937",
  color: "white",
};

const textarea = {
  ...input,
  height: "80px",
};

const button = {
  background: "#3b82f6",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};
