import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";
import TaskCreate from "./pages/TaskCreate";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Task Tracker</h1>
        <nav className="nav-bar">
          <Link className="nav-link" to={"/"}>Home Page</Link>
          <span className="separator">|</span>
          <Link className="nav-link" to={"/tasks"}>Task List Page</Link>
          <span className="separator">|</span>
          <Link className="nav-link" to={"/create-task"}>Create New Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/create-task" element={<TaskCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
