import React from 'react';
import Column from './Column';
import { groupTickets, sortTickets } from '../utils/groupingFunctions';
import './Board.css';

export default function Board({ tickets, users, grouping, sorting }) {
  const groupedTickets = groupTickets(tickets, grouping, users);
  const sortedGroupedTickets = sortTickets(groupedTickets, sorting);

  return (
    <div className="board-container">
      <div className="board">
        {Object.entries(sortedGroupedTickets).map(([group, groupTickets]) => (
          <Column key={group} title={group} tickets={groupTickets} users={users} grouping={grouping} />
        ))}
      </div>
      <div className="board-footer">
        Made By Shreyansh
      </div>
    </div>
  );
}