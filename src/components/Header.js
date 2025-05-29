import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark text-light">
        <div className="container-fluid">
          <NavLink
            to="/albums"
            className="fs-3 text-light fw-bold"
            style={{ textDecoration: "none" }}
          >
            SimbaPix
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end align-items-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/albums" className="nav-link">
                  Albums
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/share-albums" className="nav-link">
                  Shared Albums
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
