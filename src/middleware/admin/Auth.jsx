import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Auth = ({ Component = () => null }) => {
  const cookies = new Cookies();
  const token =
    cookies.get("admin_token") || localStorage.getItem("admin_token");
  const adminProfile = JSON.parse(localStorage.getItem("admin_profile"));
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/adminProfile`,
          "",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setData(response.data.data);
          // console.log(response.data.data);
        })
        .catch(function (error) {
          if (
            error.response.data.message === "session expired, Login again" ||
            error.response.data.message === "Token Is missing" ||
            error.response.data.message === "Token Is Invalid"
          ) {
            cookies.remove("admin_token");
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_profile");
          }
          // console.error(error.response.data.message);
        });
      setLoading(false);
    };

    fetchData();
  }, []);
  if (!token && !adminProfile) {
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
