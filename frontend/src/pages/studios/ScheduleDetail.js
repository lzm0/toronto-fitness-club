import {
  CalendarDaysIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import formatScheduleRange from "../../helper/ScheduleFormatter";

function ScheduleDetail({ schedule }) {
  return (
    schedule && (
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold">
          {schedule.fitness_class.name}
        </div>
        <div className="flex flex-wrap gap-1 my-1">
          {schedule.fitness_class.keywords.split(",").map((keyword) => (
            <div key={keyword} className="badge badge-secondary">
              {keyword}
            </div>
          ))}
        </div>
        <div className="opacity-60 flex gap-2 items-center">
          <UserIcon className="w-5 h-5" />
          Coach: {schedule.fitness_class.coach}
        </div>
        <div className="opacity-60 flex gap-2 items-center">
          <UserGroupIcon className="w-5 h-5" />
          Capacity: {schedule.fitness_class.capacity}
        </div>
        <div className="opacity-60 flex gap-2 items-center">
          <CalendarDaysIcon className="w-5 h-5" />
          {formatScheduleRange(schedule)}
        </div>
        <div>{schedule.fitness_class.description}</div>
      </div>
    )
  );
}

export default ScheduleDetail;
