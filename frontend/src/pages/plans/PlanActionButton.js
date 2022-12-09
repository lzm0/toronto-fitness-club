import { CheckCircleIcon } from "@heroicons/react/20/solid";

function PlanActionButton({ plan, myPlan }) {
  return myPlan && myPlan.plan === plan.id ? (
    <button className="btn btn-ghost btn-xs rounded-full">
      <div className="flex flex-row items-center">
        <CheckCircleIcon className="w-5 h-5 text-green-500 -translate-x-1/3 " />
        Subscribed
      </div>
    </button>
  ) : (
    <button className="btn btn-primary btn-xs rounded-full">
      {myPlan && myPlan.plan ? "Change Plan" : "Subscribe"}
    </button>
  );
}

export default PlanActionButton;
