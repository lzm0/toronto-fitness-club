import { useEffect, useState } from "react";
import PlanActionButton from "./PlanActionButton";
import { useNavigate } from "react-router-dom";

function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [myPlan, setMyPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/subscriptions/plans/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPlans(data.results));
    fetch(`http://${window.location.hostname}:8000/api/profile/plan/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setMyPlan);
  }, []);

  const handlePlanSelect = () => {
    if (selectedPlan.id === myPlan.plan) {
      fetch(`http://${window.location.hostname}:8000/api/profile/plan/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
      }).then(() => navigate(0));
    } else {
      fetch(`http://${window.location.hostname}:8000/api/profile/plan/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ plan: selectedPlan.id }),
      }).then(() => navigate(0));
    }
  };

  return (
    <div className="hero grow">
      <div
        className={
          "modal modal-bottom sm:modal-middle" +
          (modalVisibility ? " modal-open" : "")
        }
      >
        {selectedPlan && selectedPlan.id === myPlan.plan ? (
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Unsubscribe from {selectedPlan?.name.toLowerCase()}
            </h3>
            <p>Are you sure you want to unsubscribe from this plan?</p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setModalVisibility(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handlePlanSelect}>
                Unsubscribe
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Subscribe to {selectedPlan?.name.toLowerCase()}
            </h3>
            <p>Are you sure you want to subscribe to this plan?</p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setModalVisibility(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handlePlanSelect}>
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col hero-content text-center gap-8">
        <h1 className="text-4xl font-bold">Membership Plans</h1>
        <div className="stats">
          {plans.map((plan) => (
            <div
              className="stat flex flex-col place-items-center"
              key={plan.id}
            >
              <div className="stat-title">{plan.name}</div>
              <div className="stat-value">${plan.price}</div>
              <div
                className="stat-actions"
                onClick={() => {
                  setModalVisibility(true);
                  setSelectedPlan(plan);
                }}
              >
                <PlanActionButton plan={plan} myPlan={myPlan} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plans;
