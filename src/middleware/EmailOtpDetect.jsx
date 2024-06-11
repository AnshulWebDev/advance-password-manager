import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
const EmailOtpDetect = ({ Component }) => {
  const cookies = new Cookies();
  const data = cookies.get("data") || localStorage.getItem("data");
  const token = cookies.get("token") || localStorage.getItem("token");
  if (!data) {
    return <Navigate to={"/register"} />;
  } else if (token) {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired === true && !myDecodedToken) {
      return <Navigate to={"/login"} />;
    } else {
      return <Navigate to={"/vault"} />;
    }
  } else if (data) {
    const myDecodedData = decodeToken(data);
    const isMyDataExpired = isExpired(data);
    if (isMyDataExpired === true && !myDecodedData) {
      return <Navigate to={"/register"} />;
    }
  }
  return (
    <div>
      <Component />
    </div>
  );
};

export default EmailOtpDetect;
