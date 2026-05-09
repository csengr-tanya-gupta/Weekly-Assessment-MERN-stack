import React, { useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Dashboard", href: "#dashboard", icon: "D" },
  { label: "My Notes", href: "#notes", icon: "N" },
  { label: "About", href: "#about", icon: "A" },
];

const Navbar = ({ totalNotes }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div className="navbar__logo">
            <span className="navbar__logo-symbol">*</span>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">NoteFlow</span>
            <span className="navbar__brand-tagline">Employee Dashboard</span>
          </div>
        </div>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="navbar__link-item">
              <a href={link.href} className="navbar__link">
                <span className="navbar__link-icon">{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <div className="navbar__badge" title="Total notes">
            <span className="navbar__badge-dot" />
            <span className="navbar__badge-count">{totalNotes}</span>
            <span className="navbar__badge-label">Notes</span>
          </div>

          <div className="navbar__avatar" title="Employee">
            <span>E</span>
          </div>

          <button
            className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span className="navbar__link-icon">{link.icon}</span>
            {link.label}
          </a>
        ))}
        <div className="navbar__mobile-divider" />
        <div className="navbar__mobile-meta">
          <span className="navbar__badge-dot" />
          Connected to MongoDB Atlas
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
