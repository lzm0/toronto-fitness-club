import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditButton from "../../../components/EditButton";

function UpdateCard() {
  const navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`/api/profile/card/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    }).then(() => {
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
          <h3 className="font-bold text-lg">Edit Card</h3>
          <form onSubmit={handleSave}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Card number</span>
              </label>
              <input
                type="text"
                name="card_number"
                className="input input-bordered invalid:input-error"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expiry date</span>
              </label>
              <input
                type="text"
                name="expiry_date"
                className="input input-bordered invalid:input-error"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">CVV</span>
              </label>
              <input
                type="text"
                name="cvv"
                className="input input-bordered invalid:input-error"
              />
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
      <EditButton onClick={() => setModalVisibility(true)} />
    </>
  );
}

export default UpdateCard;
