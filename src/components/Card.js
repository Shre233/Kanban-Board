import React from 'react';
import './Card.css';

export default function Card({ ticket, userName, grouping, userAvailability }) {
  const getPriorityIcon = (priority) => {
    const priorityMap = {
      0: 'No-priority',
      1: 'Img - Low Priority',
      2: 'Img - Medium Priority',
      3: 'Img - High Priority',
      4: 'SVG - Urgent Priority colour'
    };
    return `/images/${priorityMap[priority]}.svg`;
  };

  const getStatusIcon = (status) => {
    const statusMap = {
      'Todo': 'To-do',
      'In progress': 'in-progress',
      'Done': 'Done',
      'Cancelled': 'Cancelled',
      'Backlog': 'Backlog',
    };
    return `/images/${statusMap[status]}.svg`;
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar-container">
            <div 
              className="user-avatar" 
              style={{ backgroundColor: getAvatarColor(userName) }}
            >
              {getInitials(userName)}
            </div>
            <span className={`availability-indicator ${userAvailability ? 'available' : 'unavailable'}`}></span>
          </div>
        )}
      </div>  
      <div className="card-content">
        {grouping !== 'status' && (
          <img src={getStatusIcon(ticket.status)} alt={ticket.status} className="status-icon" />
        )}
        <h3 className="card-title">{ticket.title}</h3>
      </div>
      <div className="card-footer">
        {grouping !== 'priority' && (
          <img src={getPriorityIcon(ticket.priority)} alt="Priority" className="priority-icon" />
        )}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            <img src="/images/grey-dot.svg" alt="Tag" className="tag-icon" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}