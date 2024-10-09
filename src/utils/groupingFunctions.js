export const groupTickets = (tickets, grouping, users) => {
  switch (grouping) {
    case 'status':
      return groupByStatus(tickets);
    case 'user':
      return groupByUser(tickets, users);
    case 'priority':
      return groupByPriority(tickets);
    default:
      return { 'All Tickets': tickets };
  }
};

const groupByStatus = (tickets) => {
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const groupedTickets = tickets.reduce((acc, ticket) => {
    (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
    return acc;
  }, {});
  
  return statusOrder.reduce((acc, status) => {
    acc[status] = groupedTickets[status] || [];
    return acc;
  }, {});
};

const groupByUser = (tickets, users) => {
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const groupedTickets = tickets.reduce((acc, ticket) => {
    const userName = userMap[ticket.userId] || users[0].name; 
    (acc[userName] = acc[userName] || []).push(ticket);
    return acc;
  }, {});

  return users.reduce((acc, user) => {
    acc[user.name] = groupedTickets[user.name] || [];
    return acc;
  }, {});
};

const groupByPriority = (tickets) => {
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };
  const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];

  const groupedTickets = tickets.reduce((acc, ticket) => {
    const priorityLabel = priorityLabels[ticket.priority];
    (acc[priorityLabel] = acc[priorityLabel] || []).push(ticket);
    return acc;
  }, {});

  return priorityOrder.reduce((acc, priority) => {
    acc[priority] = groupedTickets[priority] || [];
    return acc;
  }, {});
};

export const sortTickets = (groupedTickets, sorting) => {
  const sortFunction = sorting === 'priority' ? sortByPriority : sortByTitle;
  return Object.fromEntries(
    Object.entries(groupedTickets).map(([group, tickets]) => [
      group,
      tickets.sort(sortFunction)
    ])
  );
};

const sortByPriority = (a, b) => b.priority - a.priority;
const sortByTitle = (a, b) => a.title.localeCompare(b.title);