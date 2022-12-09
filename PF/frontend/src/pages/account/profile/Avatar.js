import { CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Avatar({ avatar, firstName }) {
  const navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("avatar", selectedImage);
    fetch(`http://${window.location.hostname}:8000/api/profile/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.avatar) {
          setIsUploading(false);
          setModalVisibility(false);
          navigate(0);
        }
      });
  };

  return (
    <>
      <div
        className={
          "modal modal-bottom sm:modal-middle" +
          (modalVisibility ? " modal-open" : "")
        }
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Avatar</h3>
          <p className="py-4">Please select an image file</p>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => setModalVisibility(false)}
            >
              Cancel
            </button>
            {isUploading ? (
              <button className="btn btn-disabled">
                <div
                  className="radial-progress animate-spin mr-3"
                  style={{
                    "--value": "70",
                    "--size": "1rem",
                    "--thickness": "2px",
                  }}
                ></div>
                Uploading
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!selectedImage}
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
      <div onClick={() => setModalVisibility(true)}>
        {avatar ? (
          <div className="avatar">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="absolute w-24 h-24 rounded-full bg-black opacity-0 hover:opacity-50 transition">
              <CameraIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="w-24 h-24 bg-secondary text-secondary-content rounded-full">
              <span className="text-3xl">
                {firstName && firstName[0].toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Avatar;
