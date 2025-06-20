import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Navbar from "./components/Navbar";
import AddProblem from "./components/AddProblem";
import MyProblems from "./components/MyProblems";
import UpdateProblem from "./components/UpdateProblem";
import ProblemDetail from "./components/ProblemDetail";
import OnlineCompiler from "./components/OnlineCompiler";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/online-compiler",
  ];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/online-compiler" element={<OnlineCompiler />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/leaderboard" element={<div>Leaderboard</div>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/add-problem"
            element={
              <ProtectedAdminRoute>
                <AddProblem />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/my-problems"
            element={
              <ProtectedAdminRoute>
                <MyProblems />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/my-problems/:id/update"
            element={
              <ProtectedAdminRoute>
                <UpdateProblem />
              </ProtectedAdminRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
