import { useEffect, useState } from "react";
import API from "../services/api";

function AllTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      alert("Error fetching tasks ❌");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks(); // refresh
    } catch (err) {
      alert("Error updating status ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // refresh
    } catch (err) {
      alert("Error deleting task ❌");
    }
  };

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.assignedTo?.name}</td>
              <td>
                <span className={`badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
              <td>
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTasks;