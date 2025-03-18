import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <Router>
      <div>
        <h1>Task Tracker</h1>
        <nav>
          <Link to={"/"}>Home Page</Link> |
          <Link to={"/tasks"}>Task List Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
