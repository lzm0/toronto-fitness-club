import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatScheduleRange from "../../helper/ScheduleFormatter";

function setClass(studio_id, class_id, enrolled) {
  return fetch(`/api/studios/${studio_id}/classes/${class_id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ enrolled }),
  });
}

function setSchedule(studio_id, schedule_id, enrolled) {
  return fetch(`/api/studios/${studio_id}/schedules/${schedule_id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ enrolled }),
  });
}

function ScheduleActionButton({ studio, schedule }) {
  const navigate = useNavigate();

  const [modalVisibility, setModalVisibility] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleScheduleAction = async () => {
    if (schedule.enrolled) {
      await setSchedule(studio.id, schedule.id, false);
      if (checked) {
        await setClass(studio.id, schedule.fitness_class.id, false);
      }
    } else {
      if (checked) {
        await setClass(studio.id, schedule.fitness_class.id, true);
      } else {
        await setSchedule(studio.id, schedule.id, true);
      }
    }
    navigate(0);
  };

  return (
    studio &&
    schedule && (
      <>
        <div onClick={() => setModalVisibility(true)} className="flex">
          {schedule.enrolled ? (
            <button className="grow btn btn-sm rounded-full btn-outline btn-primary">
              <XMarkIcon className="w-5 h-5" />
              Drop
            </button>
          ) : (
            <button className="grow btn btn-sm rounded-full btn-primary">
              <PlusIcon className="w-5 h-5" />
              Enrol
            </button>
          )}
        </div>
        <div
          className={
            "modal modal-bottom sm:modal-middle overflow-visible" +
            (modalVisibility ? " modal-open" : "")
          }
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {schedule.enrolled ? "Drop class" : "Enroll class"}
            </h3>
            <p className="py-4">{`Are you sure you want to ${
              schedule.enrolled ? "drop " : "enroll "
            } ${schedule.fitness_class.name} at ${
              studio.name
            } for the timeslot ${formatScheduleRange(schedule)}?`}</p>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <span className="label-text">
                  {schedule.enrolled ? "Drop" : "Enroll"} all future occurences
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  className="checkbox checkbox-primary"
                  onChange={() => setChecked(!checked)}
                />
              </label>
            </div>
            <div className="modal-action">
              <div
                className="btn btn-ghost"
                onClick={() => {
                  setModalVisibility(false);
                  setChecked(false);
                }}
              >
                Cancel
              </div>
              <div className="btn btn-primary" onClick={handleScheduleAction}>
                Confirm
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ScheduleActionButton;
