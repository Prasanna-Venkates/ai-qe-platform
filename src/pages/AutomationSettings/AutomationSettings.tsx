import { useEffect, useState } from "react";
import "./AutomationSettings.css";
import PageSkeleton from "../../components/common/PageSkeleton";

export default function AutomationSettings() {
  const [pageLoading, setPageLoading] = useState(true);

  const [webTool, setWebTool] = useState("");
  const [webLanguage, setWebLanguage] = useState("");

  const [mobileTool, setMobileTool] = useState("");
  const [mobileLanguage, setMobileLanguage] = useState("");

  const [showToast, setShowToast] = useState(false);

  /* ================= PAGE SKELETON ================= */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  /* ================= LOAD SAVED SETTINGS ================= */
  useEffect(() => {
    const stored = localStorage.getItem("automationSettings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setWebTool(parsed.webTool || "");
      setWebLanguage(parsed.webLanguage || "");
      setMobileTool(parsed.mobileTool || "");
      setMobileLanguage(parsed.mobileLanguage || "");
    }
  }, []);

  /* ================= SAVE SETTINGS ================= */
  const handleSave = () => {
    localStorage.setItem(
      "automationSettings",
      JSON.stringify({
        webTool,
        webLanguage,
        mobileTool,
        mobileLanguage,
      })
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="automation-container">
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <h1>Automation Settings</h1>
          <p className="subtitle">
            Configure automation tools and programming languages for test generation.
          </p>

          <div className="note">
            ⚠️ Note: This is a prototype configuration. In production, these settings
            control AI-driven test script generation.
          </div>

          {/* ===== WEB AUTOMATION ===== */}
          <div className="settings-card">
            <h2>Web Automation</h2>

            <label>Automation Tool</label>
            <select value={webTool} onChange={(e) => setWebTool(e.target.value)}>
              <option value="">Select Tool</option>
              <option value="Playwright">Playwright</option>
              <option value="Selenium">Selenium</option>
              <option value="Cypress">Cypress</option>
            </select>

            <label>Programming Language</label>
            <select
              value={webLanguage}
              onChange={(e) => setWebLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          {/* ===== MOBILE AUTOMATION ===== */}
          <div className="settings-card">
            <h2>Mobile Automation</h2>

            <label>Automation Tool</label>
            <select
              value={mobileTool}
              onChange={(e) => setMobileTool(e.target.value)}
            >
              <option value="">Select Tool</option>
              <option value="Appium">Appium</option>
              <option value="Espresso">Espresso</option>
              <option value="XCUITest">XCUITest</option>
            </select>

            <label>Programming Language</label>
            <select
              value={mobileLanguage}
              onChange={(e) => setMobileLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="Java">Java</option>
              <option value="Kotlin">Kotlin</option>
              <option value="Swift">Swift</option>
            </select>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Settings
          </button>

          {/* ===== TOAST ===== */}
          {showToast && (
            <div className="toast success">
              <span>✅ Automation settings saved successfully</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
