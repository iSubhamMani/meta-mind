import { addUserToState, removeUserFromState } from "@/redux/userSlice";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import PageLoad from "./PageLoad";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUserToState(user));
        setLoading(false);
        navigate("/home");
      } else {
        dispatch(removeUserFromState());
        setLoading(false);
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      {loading && <PageLoad />}
      {!loading && <Outlet />}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Auth;
