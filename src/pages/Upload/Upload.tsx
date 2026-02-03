import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(""); // ✅ NEW

  const handleUpload = () => {
    // ✅ VALIDATION — BLOCK EMPTY UPLOAD
    if (files.length === 0) {
      setError("Please upload at least one requirement file to continue.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);

    // ✅ MOCK REQUIREMENTS DATA (UNCHANGED)
    const mockRequirements = [
      {
        id: "REQ-001",
        type: "FR",
        title: "User Login",
        statement: "User should be able to log in using valid credentials",
      },
      {
        id: "REQ-002",
        type: "NFR",
        title: "Performance",
        statement: "System should respond within 2 seconds",
      },
      {
        id: "REQ-003",
        type: "FR",
        title: "Logout",
        statement: "User should be able to log out securely",
      },
    ];

    localStorage.setItem(
      "uploadedRequirements",
      JSON.stringify(mockRequirements)
    );

    setTimeout(() => {
      setLoading(false);
      navigate("/projects");
    }, 1500);
  };

  /* ================= DRAG & DROP HANDLERS ================= */

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setError("");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setError("");
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Requirements</h1>

      <p className="subtitle">
        Upload requirement documents to generate AI-powered test cases
      </p>

      {/* ✅ SUPER COOL ERROR ALERT */}
      {error && (
        <div className="upload-error">
          ⚠️ {error}
        </div>
      )}

      <div
        className={`upload-box ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        📄 Drag & drop files here
        <span>or</span>

        {/* ✅ STOP EVENT BUBBLING (UNCHANGED BEHAVIOR) */}
        <button
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            handleUpload();
          }}
        >
          Upload & Continue
        </button>

        {/* HIDDEN FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileSelect}
        />
      </div>

      {/* FILE PREVIEW */}
      {files.length > 0 && (
        <div style={{ marginTop: "16px", color: "#94a3b8" }}>
          Selected files:
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {loading && (
        <div className="upload-loading">
          <div className="loader" />
          <p>Loading requirements…</p>
        </div>
      )}
    </div>
  );
}
