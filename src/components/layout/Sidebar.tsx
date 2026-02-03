import { NavLink } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* MOBILE CLOSE */}
      <button className="sidebar-close" onClick={onClose}>
        ✕
      </button>

      <h2 className="sidebar-title">AI QE Platform</h2>

      <nav className="sidebar-nav">
        {/*UPLOAD (FIRST STEP) */}
        <NavLink to="/upload" onClick={onClose}>
          Upload
        </NavLink>

        {/* REQUIREMENTS VIEWER */}
        <NavLink to="/requirements" onClick={onClose}>
          Requirements
        </NavLink>

        {/* TEST CASE EXPLORER */}
        <NavLink to="/test-cases" onClick={onClose}>
          Test Cases
        </NavLink>

        {/* TRACEABILITY MATRIX (CORE FEATURE) */}
        <NavLink to="/traceability" onClick={onClose}>
          Traceability Matrix
        </NavLink>

        {/* EXISTING */}
        <NavLink to="/home" onClick={onClose}>
          Dashboard
        </NavLink>

        <NavLink to="/projects" onClick={onClose}>
          Projects
        </NavLink>

        <NavLink to="/automation-settings" onClick={onClose}>
          Automation Settings
        </NavLink>

        <NavLink to="/jira" onClick={onClose}>
          Jira Integration
        </NavLink>

        <NavLink to="/azure-devops" onClick={onClose}>
          Azure DevOps Integration
        </NavLink>

        <NavLink to="/github" onClick={onClose}>
          GitHub Integration
        </NavLink>
      </nav>
    </aside>
  );
}
