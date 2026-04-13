import { useState } from "react";

const TYPES = ["once", "daily", "weekly", "scheduled"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("once");
  const [weekdays, setWeekdays] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const toggleDay = (dayIndex) => {
    setWeekdays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const task = { text: trimmed, type };

    if (type === "weekly") {
      if (weekdays.length === 0) return;
      task.weekdays = weekdays;
    }

    if (type === "scheduled") {
      if (!scheduledDate) return;
      task.scheduledDate = scheduledDate;
      task.scheduledTime = scheduledTime || null;
    }

    onAdd(task);
    setText("");
    setType("once");
    setWeekdays([]);
    setScheduledDate("");
    setScheduledTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="add-main">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="add something..."
          autoFocus
        />
        <button type="submit">+</button>
      </div>

      <div className="add-options">
        <div className="type-picker">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`type-btn ${type === t ? "active" : ""}`}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {type === "weekly" && (
          <div className="weekday-picker">
            {DAYS.map((label, i) => (
              <button
                key={i}
                type="button"
                className={`day-btn ${weekdays.includes(i) ? "active" : ""}`}
                onClick={() => toggleDay(i)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {type === "scheduled" && (
          <div className="schedule-picker">
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        )}
      </div>
    </form>
  );
}

export default AddTask;
