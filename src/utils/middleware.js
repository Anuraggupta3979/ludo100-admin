import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const IsTokenValid = () => {
  const navigate = useNavigate();
  let currentTime = new Date().getTime();
  let expireTime = Cookies.get("expireTime");
  if (currentTime > expireTime) {
    navigate("/login");
    return false;
  } else {
    return true;
  }
};
