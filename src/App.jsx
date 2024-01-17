import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import { HelmetProvider } from "react-helmet-async";
import EmailVerify from "./Pages/EmailVerify";
import Auth from "./middleware/auth";
import PageNotFound from "./Pages/PageNotFound";
import PreventLogin from "./middleware/preventLogin";
import EmailOtpDetect from "./middleware/EmailOtpDetect";
import Main from "./Pages/Home/Main";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import AdminDashboard from "./Admin/Dashboard";
import AdminLogin from "./Admin/Login";
import AdminAuth from "./middleware/admin/Auth";
import AdminPreventLogin from "./middleware/admin/PreventLogin";
const App = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<PreventLogin Component={Login} />} />
        <Route
          path="/register"
          element={<PreventLogin Component={Register} />}
        />
        <Route
          path="/register/otpverify"
          element={<EmailOtpDetect Component={EmailVerify} />}
        />
        <Route path="/dashboard" element={<Auth Component={Dashboard} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/admin/dashboard"
          element={<AdminAuth Component={AdminDashboard} />}
        />
        <Route
          path="/admin/login"
          element={<AdminPreventLogin Component={AdminLogin} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
