import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/layout/MainLayout";

/* ================= SKELETON LOADER ================= */
import PageSkeleton from "../components/common/PageSkeleton";

/* ================= LAZY IMPORTS ================= */

// Public
const Login = lazy(() => import("../pages/Login/Login"));

// Core
const Home = lazy(() => import("../pages/Home/Home"));
const Projects = lazy(() => import("../pages/Projects/Projects"));
const UserStories = lazy(() => import("../pages/UserStories/UserStories"));
const GenerateTests = lazy(
  () => import("../pages/GenerateTests/GenerateTests")
);

// Upload (first step)
const Upload = lazy(() => import("../pages/Upload/Upload"));

// Requirements Viewer (CORE FEATURE)
const Requirements = lazy(
  () => import("../pages/Requirements/Requirements")
);

// Test Case Explorer (CORE FEATURE)
const TestCases = lazy(
  () => import("../pages/TestCases/TestCases")
);

// ✅ NEW — Traceability Matrix (CORE FEATURE)
const TraceabilityMatrix = lazy(
  () => import("../pages/TraceabilityMatrix/TraceabilityMatrix")
);

// Automation
const AutomationSettings = lazy(
  () => import("../pages/AutomationSettings/AutomationSettings")
);

// Integrations
const JiraIntegration = lazy(
  () => import("../pages/Integrations/JiraIntegration")
);
const AzureDevOps = lazy(
  () => import("../pages/Integrations/AzureDevOps")
);
const GitHubIntegration = lazy(
  () => import("../pages/Integrations/GitHubIntegration")
);

/* ================= ROUTES ================= */

const AppRoutes = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/upload" replace /> : <Login />}
        />

        {/* ================= UPLOAD ================= */}
        <Route
          path="/upload"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Upload />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= REQUIREMENTS ================= */}
        <Route
          path="/requirements"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Requirements />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= TEST CASE EXPLORER ================= */}
        <Route
          path="/test-cases"
          element={
            isLoggedIn ? (
              <MainLayout>
                <TestCases />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= TRACEABILITY MATRIX ================= */}
        <Route
          path="/traceability"
          element={
            isLoggedIn ? (
              <MainLayout>
                <TraceabilityMatrix />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= CORE ================= */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Home />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/projects"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Projects />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/projects/:id"
          element={
            isLoggedIn ? (
              <MainLayout>
                <UserStories />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/projects/:id/generate-tests"
          element={
            isLoggedIn ? (
              <MainLayout>
                <GenerateTests />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= AUTOMATION SETTINGS ================= */}
        <Route
          path="/automation-settings"
          element={
            isLoggedIn ? (
              <MainLayout>
                <AutomationSettings />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= INTEGRATIONS ================= */}
        <Route
          path="/jira"
          element={
            isLoggedIn ? (
              <MainLayout>
                <JiraIntegration />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/azure-devops"
          element={
            isLoggedIn ? (
              <MainLayout>
                <AzureDevOps />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/github"
          element={
            isLoggedIn ? (
              <MainLayout>
                <GitHubIntegration />
              </MainLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
