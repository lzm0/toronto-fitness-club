const dateTimeFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function formatScheduleRange(schedule) {
  const startTime = new Date(schedule.start_time);
  const endTime = new Date(schedule.end_time);
  return dateTimeFormat.formatRange(startTime, endTime);
}

export default formatScheduleRange;
