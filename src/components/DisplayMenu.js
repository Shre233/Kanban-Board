import React, { useState } from 'react';
import './DisplayMenu.css';

export default function DisplayMenu({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-menu">
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/images/Display.svg" alt="Display" className="display-icon" />
        Display
        <img src="/images/down.svg" alt="Expand" className="expand-icon" />
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-option">
            <label htmlFor="grouping">Grouping</label>
            <select id="grouping" value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-option">
            <label htmlFor="ordering">Ordering</label>
            <select id="ordering" value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}