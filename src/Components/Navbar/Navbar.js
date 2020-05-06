import React from "react";
import  {NavLink} from "react-router-dom";

export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-info">
        <div className="navbar-brand">
            Todo List App
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link"
                         to="/"
                         exact>
                    Todo List
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link"
                         to="/about"
                         >
                    About
                </NavLink>
            </li>
        </ul>
    </nav>
);
