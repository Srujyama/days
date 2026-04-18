import { useState } from "react";
import { isTaskDoneToday, formatWeekdays, formatScheduledDate } from "./dateUtils";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const done = isTaskDoneToday(task);
  const type = task.type || "once";

  const startEdit = () => {
    setEditing(true);
    setEditText(task.text);
  };

  const saveEdit = () => {
    const text = editText.trim();
    if (!text) return;
    onEdit(task.id, text);
    setEditing(false);
  };

  const badge = () => {
    switch (type) {
      case "daily":
        return <span className="badge badge-daily">↻ daily</span>;
      case "every":
        return <span className="badge badge-every">↻ every {task.intervalDays}d</span>;
      case "weekly":
        return <span className="badge badge-weekly">↻ {formatWeekdays(task.weekdays)}</span>;
      case "scheduled":
        return (
          <span className="badge badge-scheduled">
            {formatScheduledDate(task.scheduledDate)}
            {task.scheduledTime ? ` ${task.scheduledTime}` : ""}
          </span>
        );
      default:
        return null;
    }
  };

  if (editing) {
    return (
      <li>
        <div className="edit-row">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
          />
          <button className="save-btn" onClick={saveEdit}>save</button>
          <button className="cancel-btn" onClick={() => setEditing(false)}>×</button>
        </div>
      </li>
    );
  }

  return (
    <li className={done ? "done" : ""}>
      <button className="check-btn" onClick={() => onToggle(task)}>
        {done ? "✓" : "○"}
      </button>
      <span className="todo-text" onClick={startEdit}>{task.text}</span>
      {badge()}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>×</button>
    </li>
  );
}

export default TaskItem;
