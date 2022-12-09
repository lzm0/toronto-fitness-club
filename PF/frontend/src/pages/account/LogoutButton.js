import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(0);
  };

  return (
    <button className="btn btn-ghost" onClick={logout}>
      <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1" />
      Log out
    </button>
  );
}

export default LogoutButton;
