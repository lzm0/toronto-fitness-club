import { useCallback, useEffect, useState } from "react";
import ScheduleActionButton from "./ScheduleActionButton";
import ScheduleDetail from "./ScheduleDetail";

function StudioClasses({ studio, searchParams }) {
  const [schedules, setSchedules] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = useCallback(
    (page) => {
      fetch(
        `/api/studios/${studio.id}/schedules/?page=${page}${
          Object.keys(searchParams).length > 0
            ? `&${new URLSearchParams(searchParams)}`
            : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (page === 1) {
            setSchedules(data.results);
          } else {
            setSchedules((schedules) => [...schedules, ...data.results]);
          }
          if (data.next) {
            setNextPage(page + 1);
          } else {
            setNextPage(null);
          }
          setIsLoading(false);
        });
    },
    [studio, searchParams]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        nextPage &&
        window.innerHeight + document.documentElement.scrollTop + 200 >=
          document.documentElement.offsetHeight
      ) {
        setIsLoading(true);
        fetchPage(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPage, isLoading, nextPage]);

  return (
    <div className="flex flex-col">
      {schedules.length > 0 ? (
        schedules.map((schedule, index) => {
          return (
            schedule.fitness_class && (
              <div key={schedule.id}>
                <div className="flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-end">
                  <ScheduleDetail schedule={schedule} />
                  <ScheduleActionButton studio={studio} schedule={schedule} />
                </div>
                {index !== schedules.length - 1 && (
                  <div className="divider"></div>
                )}
              </div>
            )
          );
        })
      ) : (
        <div className="italic p-8 text-center">
          Sorry, we couldn't find any class schedules for this studio.
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center">
          <div className="loading btn btn-ghost">Loading</div>
        </div>
      )}
    </div>
  );
}

export default StudioClasses;
