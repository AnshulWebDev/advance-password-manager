import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";

const Auth = ({ Component }) => {
  const [authStatus, setAuthStatus] = useState("pending"); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookies = new Cookies();
        const token = cookies.get("admin_token") || localStorage.getItem("admin_token");
        const adminProfile = await JSON.parse(localStorage.getItem("admin_profile"));

        if (!token && !adminProfile) {
          setAuthStatus("unauthenticated");
        } else {
          const myDecodedToken = decodeToken(token);
          const isMyTokenExpired = isExpired(token);

          if (isMyTokenExpired === true && !myDecodedToken) {
            setAuthStatus("unauthenticated");
          } else {
            setAuthStatus("authenticated");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, [Component]);

  if (authStatus === "pending") {
    // Return loading indicator or anything else while authentication is being checked
    return null;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <div>
      <Component />
    </div>
  );
};

export default Auth;
