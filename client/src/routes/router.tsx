import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
import CourseListPage from "../pages/CourseListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />
  },
  {
    path: "/student/courses",
    element: <CourseListPage />
  }
]);