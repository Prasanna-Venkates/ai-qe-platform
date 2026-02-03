import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Topbar({ onMenuClick, sidebarOpen }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <button className="hamburger" onClick={onMenuClick}>
          {sidebarOpen ? "✕" : "☰"}
        </button>
        <span className="topbar-title">Welcome</span>
      </div>

      {/* RIGHT */}
      {user && (
        <div className="topbar-user">
          <button
            className="user-button"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.username}
            <span className={`caret ${open ? "open" : ""}`}>▼</span>
          </button>

          {open && (
            <div className="topbar-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
