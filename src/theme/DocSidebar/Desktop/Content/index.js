import React, { useState } from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

export default function ContentWrapper(props) {
  const [filterText, setFilterText] = useState("");
  const location = useLocation();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setFilterText(val);
    const query = val.toLowerCase().trim();
    if (typeof document !== "undefined") {
      const items = document.querySelectorAll(
        ".theme-doc-sidebar-menu .menu__list-item",
      );
      items.forEach((item) => {
        if (!query) {
          item.style.display = "";
        } else {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? "" : "none";
        }
      });
    }
  };

  return (
    <div className="momah-sidebar-wrapper">
      {/* Fast search container */}
      <div className="sidebar-fast-search-container">
        <div className="sidebar-fast-search">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="sidebar-search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Fast search..."
            value={filterText}
            onChange={handleSearchChange}
            className="sidebar-fast-search-input"
            aria-label="Fast search documentation menu"
          />
        </div>
      </div>

      {/* Primary navigation quick links */}
      <div className="sidebar-quick-nav">
        <Link
          to="/docs/intro"
          className={`sidebar-quick-link ${location.pathname.startsWith("/docs") ? "sidebar-quick-link--active" : ""}`}
        >
          <span className="quick-nav-icon">
            <svg
              width="15"
              height="13"
              viewBox="10 10 80 66"
              fill="none"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 12 18.5 C 12 14 15.5 11 20 13 L 45 25 C 47.5 26.2 49 28.5 49 31 L 49 68 C 49 72.5 44.5 75.5 40.5 73.5 L 16.5 62 C 13.5 60.5 12 58 12 55 Z M 22 25 L 39 33.5 L 39 62.5 L 22 53.5 Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 88 18.5 C 88 14 84.5 11 80 13 L 55 25 C 52.5 26.2 51 28.5 51 31 L 51 68 C 51 72.5 55.5 75.5 59.5 73.5 L 83.5 62 C 86.5 60.5 88 58 88 55 Z M 78 25 L 61 33.5 L 61 62.5 L 78 53.5 Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="quick-nav-label">Documentation</span>
        </Link>
        <Link
          to="/components"
          className={`sidebar-quick-link ${location.pathname.startsWith("/components") ? "sidebar-quick-link--active" : ""}`}
        >
          <span className="quick-nav-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </span>
          <span className="quick-nav-label">Components</span>
        </Link>
        <a
          href="https://github.com/bahaayoussof/momah-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-quick-link"
        >
          <span className="quick-nav-icon">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </span>
          <span className="quick-nav-label">GitHub</span>
        </a>
      </div>

      <div className="sidebar-divider" />

      {/* Docusaurus standard content */}
      <Content {...props} />
    </div>
  );
}
