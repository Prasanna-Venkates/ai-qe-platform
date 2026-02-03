import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // 🔹 UI STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    if (isSignup) {
      signup(username, password);
      setIsSignup(false);
      setPassword("");
    } else {
      const success = login(username, password);
      if (success) {
        navigate("/home", { replace: true });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const next = !prev;

      if (next) {
        setIsTypingPassword(false);
      } else {
        setIsTypingPassword(true);
      }

      return next;
    });
  };

  return (
    <div className="login-page">
      <div
        className={`ai-mascot ${
          isTypingPassword && !showPassword ? "hide-eyes" : ""
        }`}
      >
        <div className="face">
          <div className="eyes">
            <span></span>
            <span></span>
          </div>
          <div className="hands"></div>
        </div>
      </div>

      <div className="login-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onFocus={() => !showPassword && setIsTypingPassword(true)}
            onBlur={() => setIsTypingPassword(false)}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="toggle-text">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsSignup(true)}>Sign Up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
