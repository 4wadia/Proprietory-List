import React, { useState } from 'react';
import './ReminderItem.css';
import ClockTimePicker from './ClockTimePicker';

const ReminderItem = ({ reminder, onToggle, onDelete, onEdit, searchTerm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reminder.text);
  const [editDate, setEditDate] = useState(reminder.date || '');
  const [editTime, setEditTime] = useState(reminder.time || '');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(reminder.id, { 
        text: editText,
        date: editDate,
        time: editTime
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setEditText(reminder.text);
    setEditDate(reminder.date || '');
    setEditTime(reminder.time || '');
    setIsEditing(false);
  };

  const formatDateTime = () => {
    if (reminder.date || reminder.time) {
      const date = reminder.date ? new Date(reminder.date).toLocaleDateString() : '';
      const time = reminder.time ? reminder.time : '';
      return [date, time].filter(Boolean).join(' at ');
    }
    return 'No date/time set';
  };

  const getPriorityClass = () => {
    return `priority-${reminder.priority}`;
  };

  const getPriorityIcon = () => {
    switch (reminder.priority) {
      case 'high': return '●';
      case 'medium': return '◐';
      case 'low': return '◯';
      default: return '○';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return '⬢';
      case 'personal': return '◈';
      case 'health': return '⬟';
      case 'shopping': return '⬡';
      case 'finance': return '⬢';
      case 'general': return '◉';
      default: return '◉';
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : part
    );
  };

  return (
    <div className={`reminder-item ${reminder.completed ? 'completed' : ''} ${getPriorityClass()}`}>
      <div className="reminder-content">
        <div className="reminder-main">
          <button
            className="toggle-button"
            onClick={() => onToggle(reminder.id)}
            aria-label={reminder.completed ? 'Mark as pending' : 'Mark as completed'}
          >
            {reminder.completed ? '●' : '○'}
          </button>

          <div className="reminder-text">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <div className="edit-date-time">
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="edit-date"
                  />
                  <ClockTimePicker
                    value={editTime}
                    onChange={setEditTime}
                    placeholder="Time"
                  />
                </div>
              </div>
            ) : (
              <span className={reminder.completed ? 'completed-text' : ''}>
                {highlightSearchTerm(reminder.text, searchTerm)}
              </span>
            )}
          </div>

          <div className="reminder-meta">
            <span className="priority">
              {getPriorityIcon()}
            </span>
            <span className="category">
              {getCategoryIcon(reminder.category)}
            </span>
            <span className="datetime">
              {formatDateTime()}
            </span>
          </div>
        </div>

        <div className="reminder-actions">
          {isEditing ? (
            <>
              <button
                className="action-button save"
                onClick={handleEdit}
                title="Save changes"
              >
                ✓
              </button>
              <button
                className="action-button cancel"
                onClick={handleCancelEdit}
                title="Cancel editing"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <button
                className="action-button edit"
                onClick={handleEdit}
                title="Edit reminder"
              >
                ✎
              </button>
              <button
                className="action-button delete"
                onClick={() => onDelete(reminder.id)}
                title="Delete reminder"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;
