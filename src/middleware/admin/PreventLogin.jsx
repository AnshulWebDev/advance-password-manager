import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
const PreventLogin = ({ Component }) => {
  const cookies = new Cookies();
  const token = cookies.get("admin_token") || localStorage.getItem("admin_token");
  if (token) {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    console.log(myDecodedToken, isMyTokenExpired);
    if (!isMyTokenExpired || myDecodedToken) {
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
