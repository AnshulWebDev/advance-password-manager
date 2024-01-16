import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const cookies = new Cookies();
  const token = cookies.get("token") || localStorage.getItem("token");
  if (!token) {
    console.log("no token");
    return <Navigate to={"/login"} />;
  } else {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired === true && !myDecodedToken) {
      return <Navigate to={"/login"} />;
    }
  }
  return <div></div>;
};

export default Auth;
