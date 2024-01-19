import { Cookies } from "react-cookie";
import { isExpired } from "react-jwt";
import { Navigate } from "react-router-dom";
const PreventLogin = ({ Component }) => {
  const cookies = new Cookies();
  const token =
    cookies.get("admin_token") || localStorage.getItem("admin_token");
  if (token) {
    const isMyTokenExpired = isExpired(token);
    if (!isMyTokenExpired) {
      return <Navigate to={"/admin/dashboard"} />;
    }
  }
  return (
    <div>
      <Component />
    </div>
  );
};

export default PreventLogin;
