import { CameraIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function Avatar({ user }) {
  const navigate = useNavigate();

  const handleUpload = (event) => {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);
    fetch(`/api/profile/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    }).then(() => {
      navigate(0);
    });
  };

  return (
    <label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
      <div className={"avatar " + (user.avatar ? "" : "placeholder")}>
        {user.avatar ? (
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={user.avatar} alt="avatar" />
          </div>
        ) : (
          <div className="w-24 h-24 bg-secondary text-secondary-content rounded-full">
            <span className="text-3xl">
              {user.first_name && user.first_name[0].toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute w-24 h-24 rounded-full bg-black opacity-0 hover:opacity-50 transition">
          <CameraIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        </div>
      </div>
    </label>
  );
}

export default Avatar;
