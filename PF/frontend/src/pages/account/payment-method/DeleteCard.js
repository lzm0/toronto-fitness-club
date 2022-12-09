import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../../components/DeleteButton";

function DeleteCard() {
  const navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`http://${window.location.hostname}:8000/api/profile/card/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
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
          <h3 className="font-bold text-lg">Remove Card</h3>
          <p>Are you sure you want to remove this card?</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setModalVisibility(false)}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      <DeleteButton onClick={() => setModalVisibility(true)} />
    </>
  );
}

export default DeleteCard;
