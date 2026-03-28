import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

interface tasks {
  id: number;
  created_at: string;
  title: string;
  description: string;
}

function App() {
  const [newTask, setNewTask] = useState({ title: "", description: ""});
  const [tasks, setTasks] = useState<tasks[]>([]);

  const fetchTasks = async () => {
    const {error, data} = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading tasks: ", error.message);
      return;
    }

    setTasks(data);
  }

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newTask).single();

    if (error) {
      console.error("Error adding task: ", error.message);
    }

    console.log("success");

    setNewTask({title: "", description: ""});
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task", error.message);
    }

    console.log("Successfully deleted task")
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks)
  
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => setNewTask((prev) => ({...prev, title: e.target.value}))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          onChange={(e) => setNewTask((prev) => ({...prev, description: e.target.value}))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, key) => (
        
        <li
          key={key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div>
              <button style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}>
                Edit
              </button>
              <button style={{ padding: "0.5rem 1rem" }}
              onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
