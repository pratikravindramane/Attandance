import "./App.css";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AllEmployees from "./pages/AllEmployee";
import Layout from "./utils/Layout";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Layout>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </>
        ) : (
          <>
            <Route path="/employees" element={<AllEmployees />} />
          </>
        )}
        <Route path="*" element={<NotFound />} /> {/* 404 route */}
      </Routes>
    </Layout>
  );
}

export default App;
