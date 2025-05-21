import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { auth } from "../../../utils/firebase"; //  modular import
import { signOut } from "firebase/auth";
import { logout } from "../../../store/features/auth/authSlice.js";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); //  modular signOut
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
