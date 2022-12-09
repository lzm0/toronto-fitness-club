import { useEffect, useState } from "react";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/profile/schedules/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.results);
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
        setClasses(data.results);
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
        setClasses(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title">Classes</h1>
        {classes.length > 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {classes &&
                    classes.map((fitnessClass) => {
                      const date = new Date(fitnessClass.start_time);
                      const end = new Date(fitnessClass.end_time);
                      return (
                        <tr key={fitnessClass.id}>
                          <td>
                            {new Intl.DateTimeFormat("en-CA", {
                              dateStyle: "full",
                            }).format(date)}
                          </td>
                          <td>
                            {new Intl.DateTimeFormat("en-CA", {
                              timeStyle: "short",
                            }).format(date)}
                          </td>
                          <td>
                            {new Intl.DateTimeFormat("en-CA", {
                              timeStyle: "short",
                            }).format(end)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
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
          </div>
        ) : (
          <div className="italic p-8 text-center">No classes enrolled.</div>
        )}
      </div>
    </div>
  );
}

export default Classes;
