import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ onClick, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      if (onClick) onClick();
      navigate("/login");
    });
  };

  return (
    <button {...props} onClick={logoutHandler}>
      Logout
    </button>
  );
}

export default LogoutBtn;
