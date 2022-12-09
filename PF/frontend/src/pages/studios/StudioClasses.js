import { useEffect, useState } from "react";
import ScheduleActionButton from "./ScheduleActionButton";

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
        const startTime = new Date(schedule.start_time);
        const endTime = new Date(schedule.end_time);
        const dateTimeFormat = new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        const timeslot = dateTimeFormat.formatRange(startTime, endTime);
        return (
          schedule.fitness_class && (
            <div key={schedule.id}>
              <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-end">
                <div>
                  <div className="text-lg font-semibold">
                    {schedule.fitness_class.name}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {schedule.fitness_class.keywords
                      .split(",")
                      .map((keyword) => (
                        <div key={keyword} className="badge badge-secondary">
                          {keyword}
                        </div>
                      ))}
                  </div>
                  <div className="opacity-60">
                    Coach: {schedule.fitness_class.coach}
                  </div>
                  <div className="opacity-60">
                    Capacity: {schedule.fitness_class.capacity}
                  </div>
                  <div className="opacity-60">{timeslot}</div>
                  <div className="opacity-60">
                    {schedule.fitness_class.description}
                  </div>
                </div>
                <ScheduleActionButton
                  studio={studio}
                  schedule={schedule}
                  timeslot={timeslot}
                />
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
