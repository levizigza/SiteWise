import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PRODUCT } from "../content/framework";

const NAV = [
  ["Path", "/home"],
  ["Words", "/vocabulary"],
  ["Work", "/course"],
  ["Passport", "/record"],
  ["Me", "/profile"],
] as const;

export function Shell() {
  const location = useLocation();

  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className="sidebar">
        <div className="wordmark">
          <span className="mark" aria-hidden />
          {PRODUCT.name}
        </div>
        <nav>
          {NAV.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot faint">Educational training. Not a certification.</div>
      </aside>
      <main id="main" className="content">
        <div key={location.pathname} className="page-in">
          <Outlet />
        </div>
      </main>
      <nav className="bottom-nav" aria-label="Primary">
        {NAV.map(([label, to]) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : undefined)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
