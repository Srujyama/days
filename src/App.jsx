import { useState, useEffect, useMemo } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { getTodayStr, isTaskActiveToday, isTaskDoneToday } from "./dateUtils";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const { todayTasks, upcomingTasks } = useMemo(() => {
    const today = [];
    const upcoming = [];
    for (const task of todos) {
      if (isTaskActiveToday(task)) {
        today.push(task);
      } else {
        upcoming.push(task);
      }
    }
    return { todayTasks: today, upcomingTasks: upcoming };
  }, [todos]);

  const handleAdd = async (taskData) => {
    const docData = {
      text: taskData.text,
      type: taskData.type,
      done: false,
      createdAt: serverTimestamp(),
    };

    if (taskData.type === "daily" || taskData.type === "weekly") {
      docData.lastCompletedDate = "";
    }
    if (taskData.type === "weekly") {
      docData.weekdays = taskData.weekdays;
    }
    if (taskData.type === "scheduled") {
      docData.scheduledDate = taskData.scheduledDate;
      docData.scheduledTime = taskData.scheduledTime;
    }

    await addDoc(collection(db, "todos"), docData);
  };

  const handleToggle = async (task) => {
    const type = task.type || "once";
    const done = isTaskDoneToday(task);

    if (type === "daily" || type === "weekly") {
      await updateDoc(doc(db, "todos", task.id), {
        done: !done,
        lastCompletedDate: done ? "" : getTodayStr(),
      });
    } else {
      await updateDoc(doc(db, "todos", task.id), { done: !done });
    }
  };

  const handleEdit = async (id, text) => {
    await updateDoc(doc(db, "todos", id), { text });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="app">
      <h1>days</h1>
      <p className="subtitle">stuff i need to do</p>

      <AddTask onAdd={handleAdd} />

      {todayTasks.length > 0 && (
        <section>
          <h2 className="section-title">today</h2>
          <ul className="todo-list">
            {todayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </section>
      )}

      {upcomingTasks.length > 0 && (
        <section className="upcoming">
          <h2 className="section-title">upcoming</h2>
          <ul className="todo-list">
            {upcomingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </section>
      )}

      {todos.length === 0 && (
        <p className="empty">nothing yet. add something above.</p>
      )}
    </div>
  );
}

export default App;
