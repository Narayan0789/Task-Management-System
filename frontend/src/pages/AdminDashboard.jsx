import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import CreateTask from "../components/CreateTask";
import AllTasks from "../components/AllTasks";
import API from "../services/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchStats();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Stats fetch error:", error);
    }
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="logo">Task Manager</h2>

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          ➕ Create Task
        </button>

        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          📋 All Tasks
        </button>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Section */}
      <div className="admin-main">
        <div className="admin-header">
          <h2>
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "create" && "Create New Task"}
            {activeTab === "tasks" && "All Tasks"}
          </h2>
        </div>

        <div className="admin-content">

          {/* Dashboard Cards */}
          {activeTab === "dashboard" && (
            <div className="cards">
              <div className="card">
                <h4>Total Tasks</h4>
                <p>{stats.totalTasks}</p>
              </div>
              <div className="card">
                <h4>Completed</h4>
                <p>{stats.completed}</p>
              </div>
              <div className="card">
                <h4>Pending</h4>
                <p>{stats.pending}</p>
              </div>
              <div className="card">
                <h4>Total Users</h4>
                <p>{stats.totalUsers}</p>
              </div>
            </div>
          )}

          {activeTab === "create" && <CreateTask />}
          {activeTab === "tasks" && <AllTasks />}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;