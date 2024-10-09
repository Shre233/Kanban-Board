import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import DisplayMenu from './components/DisplayMenu';
import useKanbanData from './hooks/useKanbanData';
import './App.css';

export default function App() {
  const [grouping, setGrouping] = useState(() => {
    const savedGrouping = localStorage.getItem('kanbanGrouping');
    return savedGrouping || 'status';
  });
  const [sorting, setSorting] = useState(() => {
    const savedSorting = localStorage.getItem('kanbanSorting');
    return savedSorting || 'priority';
  });
  const { tickets, users, loading, error } = useKanbanData();

  useEffect(() => {
    localStorage.setItem('kanbanGrouping', grouping);
    localStorage.setItem('kanbanSorting', sorting);
  }, [grouping, sorting]);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('kanbanGrouping', newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
    localStorage.setItem('kanbanSorting', newSorting);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <DisplayMenu
          grouping={grouping}
          sorting={sorting}
          onGroupingChange={handleGroupingChange}
          onSortingChange={handleSortingChange}
        />
      </header>
      <main className="app-content">
        <Board tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
      </main>
    </div>
  );
}