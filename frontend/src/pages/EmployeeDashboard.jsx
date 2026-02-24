import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const { data } = await API.get("/tasks/my");
      setTasks(data);
    } catch (err) {
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchMyTasks();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2 className="logo">Employee Panel</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h2>My Tasks</h2>
        </div>

        <div className="admin-content">
          <div className="table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;