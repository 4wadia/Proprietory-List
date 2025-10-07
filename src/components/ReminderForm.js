import React, { useState } from 'react';
import './ReminderForm.css';
import ClockTimePicker from './ClockTimePicker';

const ReminderForm = ({ onAddReminder }) => {
  const [formData, setFormData] = useState({
    text: '',
    date: '',
    time: '',
    priority: 'medium',
    category: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onAddReminder(formData);
      setFormData({
        text: '',
        date: '',
        time: '',
        priority: 'medium',
        category: 'general'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Add New Reminder</h2>
      </div>
      
      <div className="form-group">
        <label htmlFor="text">Reminder Text</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="What do you want to be reminded of?"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <ClockTimePicker
            value={formData.time}
            onChange={(time) => setFormData(prev => ({ ...prev, time }))}
            placeholder="Select time"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
          <option value="low">◯ Low Priority</option>
          <option value="medium">◐ Medium Priority</option>
          <option value="high">● High Priority</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="general">◉ General</option>
            <option value="work">⬢ Work</option>
            <option value="personal">◈ Personal</option>
            <option value="health">⬟ Health</option>
            <option value="shopping">⬡ Shopping</option>
            <option value="finance">⬢ Finance</option>
          </select>
        </div>
      </div>

      <button type="submit" className="add-button">
        <span className="button-icon">+</span>
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;
