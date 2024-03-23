import "./App.css";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AllEmployees from "./pages/AllEmployee";
import Layout from "./utils/Layout";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import CreateDoctor from "./pages/CreateDoctor";
import Dcotors from "./pages/Dcotors";
import Feedbacks from "./pages/Feedbacks";
import Trainings from "./pages/Trainings";
import CreateFeedback from "./pages/CreateFeedback";
import CreateTraining from "./pages/CreateTraining";
import CheckHeart from "./pages/CheckHeart";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Layout>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </>
        ) : (
          <>
            <Route path="/doctors" element={<Dcotors />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/create/feedback" element={<CreateFeedback />} />
            <Route path="/create/training" element={<CreateTraining />} />
            <Route path="/create/doctor" element={<CreateDoctor />} />
            <Route path="/check/heart" element={<CheckHeart />} />
          </>
        )}
        <Route path="*" element={<NotFound />} /> {/* 404 route */}
      </Routes>
    </Layout>
  );
}

export default App;
