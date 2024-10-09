import React from 'react';
import Card from './Card';
import './Column.css';

export default function Column({ title, tickets, users, grouping }) {
  const getUserInfo = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? { name: user.name, available: user.available } : { name: '', available: false };
  };

  const getIcon = () => {
    const iconMap = {
      'Todo': 'To-do',
      'In progress': 'in-progress',
      'Done': 'Done',
      'Cancelled': 'Cancelled',
      'Backlog':'Backlog',
      'No priority': 'No-priority',
      'Urgent': 'SVG - Urgent Priority colour',
      'High': 'Img - High Priority',
      'Medium': 'Img - Medium Priority',
      'Low': 'Img - Low Priority'
    };

    return iconMap[title] ? `/images/${iconMap[title]}.svg` : null;
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getUserAvailability = () => {
    if (grouping === 'user') {
      const user = users.find(u => u.name === title);
      return user ? user.available : false;
    }
    return false;
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {grouping === 'user' ? (
            <div className="user-avatar-container">
              <div className="user-avatar" style={{ backgroundColor: getAvatarColor(title) }}>
                {getInitials(title)}
              </div>
              <span className={`availability-indicator ${getUserAvailability() ? 'available' : 'unavailable'}`}></span>
            </div>
          ) : (
            getIcon() && <img src={getIcon()} alt="" className="column-icon" />
          )}
          <h2>{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <img src="/images/add.svg" alt="Add" className="action-icon" />
          <img src="/images/3 dot menu.svg" alt="Menu" className="action-icon" />
        </div>
      </div>
      {tickets.map(ticket => {
        const userInfo = getUserInfo(ticket.userId);
        return (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            userName={userInfo.name} 
            userAvailability={userInfo.available}
            grouping={grouping} 
          />
        );
      })}
    </div>
  );
}