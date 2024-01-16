import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import { HelmetProvider } from "react-helmet-async";
import LandingPage from "./Pages/LandingPage";
import EmailVerify from "./Pages/EmailVerify";
import Auth from "./middleware/auth";
import PageNotFound from "./Pages/PageNotFound";
import PreventLogin from "./middleware/preventLogin";
import EmailOtpDetect from "./middleware/EmailOtpDetect";
const App = () => {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
