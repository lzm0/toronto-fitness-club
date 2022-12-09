import { useEffect, useState } from "react";
import ScheduleActionButton from "./ScheduleActionButton";
import ScheduleDetail from "./ScheduleDetail";

function StudioClasses({ studio }) {
  const [schedules, setSchedules] = useState([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `http://${window.location.hostname}:8000/api/studios/${studio.id}/schedules/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setSchedules(data.results));
  }, [studio]);

  return (
    <div className="flex flex-col gap-2">
      {schedules.map((schedule, index) => {
        return (
          schedule.fitness_class && (
            <div key={schedule.id}>
              <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-end">
                <ScheduleDetail schedule={schedule} />
                <ScheduleActionButton studio={studio} schedule={schedule} />
              </div>
              {index !== schedules.length - 1 && <div className="divider" />}
            </div>
          )
        );
      })}
    </div>
  );
}

export default StudioClasses;
