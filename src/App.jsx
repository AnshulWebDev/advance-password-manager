import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import { HelmetProvider } from "react-helmet-async";
import LandingPage from "./Pages/LandingPage";
import EmailVerify from "./Pages/EmailVerify";
import Auth from "./middleware/auth";
import PageNotFound from "./Pages/PageNotFound";

const App = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/otpverify" element={<EmailVerify />} />
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
