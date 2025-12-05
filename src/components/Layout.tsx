import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <nav className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Notes
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Settings
        </NavLink>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
