
import { useEffect, useState } from "react";
import API from "../services/api";

function CreateTask() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    assignedTo: ""
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get("/users/employees");
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await API.post("/tasks", form);
      alert("Task Created ✅");
    } catch {
      alert("Error creating task ❌");
    }
  };

  return (
    <div className="task-form">
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <select name="priority" onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        name="deadline"
        onChange={handleChange}
      />

      <select name="assignedTo" onChange={handleChange}>
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;