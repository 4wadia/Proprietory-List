import React, { useState, useEffect } from 'react';
import './ClockTimePicker.css';

const ClockTimePicker = ({ value, onChange, placeholder = "Select time" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      setSelectedHour(hour > 12 ? hour - 12 : hour === 0 ? 12 : hour);
      setSelectedMinute(minute);
      setIsAM(period === 'AM' || hour < 12);
    }
  }, [value]);

  const formatTime = (hour, minute, isAM) => {
    const paddedHour = hour.toString().padStart(2, '0');
    const paddedMinute = minute.toString().padStart(2, '0');
    const period = isAM ? 'AM' : 'PM';
    return `${paddedHour}:${paddedMinute} ${period}`;
  };

  const handleTimeSelect = () => {
    const time24 = isAM 
      ? (selectedHour === 12 ? 0 : selectedHour)
      : (selectedHour === 12 ? 12 : selectedHour + 12);
    
    const formattedTime = `${time24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleNow = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    setSelectedHour(displayHour);
    setSelectedMinute(minute);
    setIsAM(hour < 12);
    
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="clock-time-picker">
      <button
        className="time-picker-trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="clock-icon">⧖</span>
        <span className="time-display">
          {value ? value : placeholder}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>◉</span>
      </button>

      {isOpen && (
        <div className="time-picker-dropdown">
          <div className="time-picker-header">
            <h4>Select Time</h4>
            <button className="now-button" onClick={handleNow}>
              Now
            </button>
          </div>

          <div className="time-picker-body">
            <div className="time-selectors">
              <div className="hour-selector">
                <label>Hour</label>
                <div className="number-input">
                  <button
                    className="number-btn"
                    onClick={() => setSelectedHour(prev => prev === 1 ? 12 : prev - 1)}
                  >
                    ◉
                  </button>
                  <span className="number-display">{selectedHour}</span>
                  <button
                    className="number-btn"
                    onClick={() => setSelectedHour(prev => prev === 12 ? 1 : prev + 1)}
                  >
                    ◉
                  </button>
                </div>
              </div>

              <div className="minute-selector">
                <label>Minute</label>
                <div className="number-input">
                  <button
                    className="number-btn"
                    onClick={() => setSelectedMinute(prev => prev === 0 ? 59 : prev - 1)}
                  >
                    ◉
                  </button>
                  <span className="number-display">{selectedMinute.toString().padStart(2, '0')}</span>
                  <button
                    className="number-btn"
                    onClick={() => setSelectedMinute(prev => prev === 59 ? 0 : prev + 1)}
                  >
                    ◉
                  </button>
                </div>
              </div>

              <div className="period-selector">
                <label>Period</label>
                <div className="period-buttons">
                  <button
                    className={`period-btn ${isAM ? 'active' : ''}`}
                    onClick={() => setIsAM(true)}
                  >
                    AM
                  </button>
                  <button
                    className={`period-btn ${!isAM ? 'active' : ''}`}
                    onClick={() => setIsAM(false)}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            <div className="time-preview">
              <span className="preview-time">
                {formatTime(selectedHour, selectedMinute, isAM)}
              </span>
            </div>
          </div>

          <div className="time-picker-footer">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleTimeSelect}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockTimePicker;
