import { useEffect, useState } from "react";

function StudioClasses({ studio }) {
  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPage = (page) => {
      fetch(
        `http://${window.location.hostname}:8000/api/studios/${studio.id}/classes/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setClasses((classes) => [...classes, ...data.results]);
          if (data.next) {
            fetchPage(page + 1);
          }
        });
    };
    fetchPage(1);
  }, [studio]);

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
        const scheduleClass = classes.find((c) => c.id === schedule.class_id);
        return (
          scheduleClass && (
            <div key={schedule.id}>
              <div className="text-lg font-semibold">{scheduleClass.name}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {scheduleClass.keywords.split(",").map((keyword) => (
                  <div key={keyword} className="badge badge-secondary">
                    {keyword}
                  </div>
                ))}
              </div>
              <div className="opacity-60">Coach: {scheduleClass.coach}</div>
              <div className="opacity-60">
                {new Date(schedule.start_time).toLocaleDateString("en-CA", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {new Date(schedule.start_time).toLocaleTimeString("en-CA", {
                  hour: "numeric",
                  minute: "numeric",
                })}
                -{" "}
                {new Date(schedule.end_time).toLocaleTimeString("en-CA", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>

              <div className="opacity-60">{scheduleClass.description}</div>
              {index !== schedules.length - 1 && <div className="divider" />}
            </div>
          )
        );
      })}
    </div>
  );
}

export default StudioClasses;
