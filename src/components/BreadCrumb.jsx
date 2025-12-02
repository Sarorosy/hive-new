// src/components/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ items, theme = "light" }) {
  const baseTextClass =
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const activeTextClass =
    theme === "dark" ? "text-white" : "text-gray-900";
  const separatorClass =
    theme === "dark" ? "text-gray-500" : "text-gray-400";

  return (
    <nav className={`text-sm mb-4 ${baseTextClass}`}>
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.path ? (
              <Link
                to={item.path}
                className={`hover:underline ${baseTextClass}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={activeTextClass}>{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className={`mx-2 ${separatorClass}`}>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
