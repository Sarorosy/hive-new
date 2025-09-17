// src/components/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="text-sm  mb-4">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.path ? (
              <Link to={item.path} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
