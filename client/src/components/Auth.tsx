import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        navigate("/home");
      } else {
        setLoading(false);
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && <Outlet />}
    </>
  );
};

export default Auth;
