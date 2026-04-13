const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getTodayStr() {
  return new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
}

export function getDayOfWeek() {
  return new Date().getDay(); // 0=Sun, 6=Sat
}

export function isTaskActiveToday(task) {
  const type = task.type || "once";
  const today = getTodayStr();
  const dow = getDayOfWeek();

  switch (type) {
    case "once":
      return true;
    case "daily":
      return true;
    case "weekly":
      return (task.weekdays || []).includes(dow);
    case "scheduled":
      return task.scheduledDate <= today;
    default:
      return true;
  }
}

export function isTaskDoneToday(task) {
  const type = task.type || "once";
  const today = getTodayStr();

  switch (type) {
    case "daily":
    case "weekly":
      return task.lastCompletedDate === today;
    case "once":
    case "scheduled":
    default:
      return !!task.done;
  }
}

export function formatWeekdays(weekdays) {
  if (!weekdays || weekdays.length === 0) return "";
  if (weekdays.length === 7) return "every day";
  return weekdays
    .slice()
    .sort((a, b) => a - b)
    .map((d) => DAY_NAMES[d])
    .join(", ");
}

export function formatScheduledDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
