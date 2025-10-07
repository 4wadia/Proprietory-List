import React from 'react';
import ReminderItem from './ReminderItem';
import './ReminderList.css';

const ReminderList = ({ reminders, onToggleReminder, onDeleteReminder, onEditReminder, searchTerm }) => {
  if (reminders.length === 0) {
    return (
      <div className="reminder-list">
        <div className="empty-state">
          <div className="empty-icon">○</div>
          <h3>No reminders yet</h3>
          <p>Add your first reminder to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reminder-list">
      <div className="list-header">
        <h2>Your Reminders</h2>
        <span className="reminder-count">{reminders.length} reminder{reminders.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="reminders-container">
        {reminders.map(reminder => (
          <ReminderItem
            key={reminder.id}
            reminder={reminder}
            onToggle={onToggleReminder}
            onDelete={onDeleteReminder}
            onEdit={onEditReminder}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default ReminderList;
