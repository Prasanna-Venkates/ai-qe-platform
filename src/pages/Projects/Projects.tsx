import "./Projects.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSkeleton from "../../components/common/PageSkeleton";

interface Project {
  id: number;
  name: string;
  description: string;
  domain?: string;
  techStack?: string[];
  createdAt?: number;
}

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); // ✅ NEW

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [techStack, setTechStack] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /* ================= LOAD PROJECTS ================= */

  useEffect(() => {
    // ✅ Simulate API delay (for skeleton demo)
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("projects");

      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        const defaults: Project[] = [
          {
            id: 1,
            name: "AI QE Platform",
            description: "Quality engineering automation using AI.",
          },
          {
            id: 2,
            name: "Payment Gateway",
            description: "Test automation for payment workflows.",
          },
          {
            id: 3,
            name: "E-Commerce App",
            description: "End-to-end testing for ecommerce platform.",
          },
        ];
        setProjects(defaults);
        localStorage.setItem("projects", JSON.stringify(defaults));
      }

      setLoading(false); // ✅ STOP skeleton
    }, 800); // 👈 adjust if needed

    return () => clearTimeout(timer);
  }, []);

  /* ================= SAVE ================= */

  const persist = (data: Project[]) => {
    setProjects(data);
    localStorage.setItem("projects", JSON.stringify(data));
  };

  /* ================= ADD / UPDATE ================= */

  const handleSave = () => {
    if (!name || !description) return;

    const parsedTechStack = techStack
      ? techStack.split(",").map((t) => t.trim())
      : undefined;

    if (editingId) {
      const updated = projects.map((p) =>
        p.id === editingId
          ? { ...p, name, description, domain, techStack: parsedTechStack }
          : p
      );
      persist(updated);
      setSuccessMessage("Project updated successfully ✅");
    } else {
      persist([
        ...projects,
        {
          id: Date.now(),
          name,
          description,
          domain,
          techStack: parsedTechStack,
          createdAt: Date.now(),
        },
      ]);
      setSuccessMessage("Project created successfully 🚀");
    }

    resetForm();
  };

  /* ================= EDIT ================= */

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
    setDomain(project.domain || "");
    setTechStack(project.techStack?.join(", ") || "");
    setShowForm(true);
  };

  /* ================= DELETE ================= */

  const confirmDelete = () => {
    if (deleteId === null) return;

    persist(projects.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    setSuccessMessage("Project deleted successfully 🗑️");
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setDomain("");
    setTechStack("");
    setShowForm(false);
  };

  /* ================= SKELETON ================= */

  if (loading) {
    return <PageSkeleton />; // ✅ THIS IS THE KEY
  }

  /* ================= UI ================= */

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p className="projects-note">
            Note: Initial projects are preloaded for demo purposes. Newly created
            projects are stored dynamically and include metadata like domain,
            tech stack, and created date.
          </p>
        </div>

        <button className="add-project-btn" onClick={() => setShowForm(true)}>
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="add-project-form">
          <input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Domain (e.g. Banking, E-Commerce)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <input
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />

          <div className="form-actions">
            <button onClick={handleSave}>
              {editingId ? "Update Project" : "Create Project"}
            </button>
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="meta">
              <div>
                <strong>Domain:</strong> {project.domain || "N/A"}
              </div>
              <div>
                <strong>Tech Stack:</strong>{" "}
                {project.techStack?.join(", ") || "N/A"}
              </div>
              <div className="created-date">
                Created on{" "}
                {project.createdAt
                  ? new Date(project.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            <div className="card-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(project);
                }}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(project.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteId !== null && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete Project?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="danger" onClick={confirmDelete}>
                Delete
              </button>
              <button onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {successMessage && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Success</h3>
            <p>{successMessage}</p>

            <div className="modal-actions">
              <button onClick={() => setSuccessMessage(null)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
