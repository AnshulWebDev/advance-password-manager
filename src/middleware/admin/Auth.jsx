import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";

const Auth = ({ Component }) => {
  const cookies = new Cookies();
  const token = cookies.get("admin_token") || localStorage.getItem("admin_token"); 
  const adminProfile = JSON.parse(localStorage.getItem("admin_profile"));
  if (!token && adminProfile == null ) {
    // console.log("no token");
    return <Navigate to={"/admin/login"} />;
  } else {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired === true && !myDecodedToken) {
      return <Navigate to={"/admin/login"} />;
    }
  }
  return (
    <div>
      <Component />
    </div>
  );
};

export default Auth;
