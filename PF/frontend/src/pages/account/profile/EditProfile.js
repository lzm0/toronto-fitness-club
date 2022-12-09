import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ username, email, firstName, lastName, phoneNumber }) {
  const navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`http://${window.location.hostname}:8000/api/profile/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setModalVisibility(false);
        navigate(0);
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
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form onSubmit={handleSave}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered invalid:input-error"
                defaultValue={username}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered invalid:input-error"
                defaultValue={email}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                type="text"
                name="first_name"
                className="input input-bordered invalid:input-error"
                defaultValue={firstName}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last name</span>
              </label>
              <input
                type="text"
                name="last_name"
                className="input input-bordered invalid:input-error"
                defaultValue={lastName}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <label className="input-group">
                <span>+1</span>
                <input
                  type="tel"
                  name="phone_number"
                  className="input input-bordered invalid:input-error"
                  defaultValue={phoneNumber}
                />
              </label>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setModalVisibility(false)}
              >
                Cancel
              </button>
              <input type="submit" value="Save" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
      <button className="btn gap-2" onClick={() => setModalVisibility(true)}>
        <PencilIcon className="w-4 h-4" />
        Edit Profile
      </button>
    </>
  );
}

export default EditProfile;
