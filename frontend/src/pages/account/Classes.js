import { useEffect, useState } from "react";
import formatScheduleRange from "../../helper/ScheduleFormatter";
import ScheduleActionButton from "../studios/ScheduleActionButton";
import ScheduleDetail from "../studios/ScheduleDetail";

function Classes() {
  const [schedules, setSchedules] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetch(`/api/profile/schedules/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }, []);

  const goToNextPage = () => {
    fetch(nextPage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  };

  const goToPreviousPage = () => {
    fetch(previousPage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  };

  return (
    <>
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Classes</h1>
          {schedules.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Studio</th>
                      <th>Name</th>
                      <th>Timeslot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules &&
                      schedules.map((schedule) => (
                        <tr
                          key={schedule.id}
                          className="hover"
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setModalVisibility(true);
                          }}
                        >
                          <td>{schedule.studio.name}</td>
                          <td>{schedule.fitness_class.name}</td>
                          <td>{formatScheduleRange(schedule)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {(previousPage || nextPage) && (
                <div className="btn-group grid grid-cols-2 rounded-full overflow-hidden">
                  <button
                    className="btn btn-sm"
                    disabled={!previousPage}
                    onClick={goToPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-sm"
                    disabled={!nextPage}
                    onClick={goToNextPage}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="italic p-8 text-center">
              You have not signed up for any classes yet.
            </div>
          )}
        </div>
      </div>
      {selectedSchedule && (
        <div
          className={
            "modal modal-bottom sm:modal-middle" +
            (modalVisibility ? " modal-open" : "")
          }
        >
          <div className="modal-box overflow-visible">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setModalVisibility(false)}
            >
              ✕
            </button>
            <ScheduleDetail schedule={selectedSchedule} />
            <div className="modal-action"></div>
            <ScheduleActionButton
              studio={selectedSchedule.studio}
              schedule={selectedSchedule}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Classes;
