import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Subscription() {
  const [planId, setPlanId] = useState(null);
  const [planStartDate, setPlanStartDate] = useState(null);
  const [plan, setPlan] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/profile/plan/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlanId(data.plan);
        setPlanStartDate(data.plan_start_date);
      });
  }, []);

  useEffect(() => {
    if (planId) {
      fetch(
        `http://${window.location.hostname}:8000/api/subscriptions/plans/${planId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then(setPlan);
    }
  }, [planId]);

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title">Subscription</h1>
        {plan ? (
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="uppercase text-sm font-semibold opacity-60">
                Plan Name
              </h3>
              {plan.name}
            </div>
            <div>
              <h3 className="uppercase text-sm font-semibold opacity-60">
                Price
              </h3>
              ${plan.price} per {plan.is_yearly ? "year" : "month"}
            </div>
            <div>
              <h3 className="uppercase text-sm font-semibold opacity-60">
                Start Date
              </h3>
              {planStartDate}
            </div>
          </div>
        ) : (
          <div>You are not subscribed to any plan</div>
        )}
        <div className="card-actions justify-end">
          <Link to="/plans">
            <button className="btn btn-sm rounded-full btn-outline gap-1 self-end">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              {planId ? "Change" : "Subscribe"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
