import React from 'react';
import './Header.css';

const Header = ({ 
  pendingCount, 
  completedCount, 
  filter, 
  setFilter, 
  onNavigateToAbout,
  user,
  onNavigateToSignIn,
  onNavigateToSignUp,
  onNavigateToProfile
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">
              <span className="title-icon">⧖</span>
              Reminder App
            </h1>
            <div className="stats">
              <span className="stat-item">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pending</span>
              </span>
              <span className="stat-item">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Completed</span>
              </span>
            </div>
          </div>
          
          <div className="header-right">
            <div className="filter-tabs" data-active={filter}>
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            <div className="auth-buttons">
              <button
                className="about-button"
                onClick={onNavigateToAbout}
                title="About this project"
              >
                ◉ About
              </button>
              
              {user ? (
                <div className="user-menu">
                  <button
                    className="user-button"
                    onClick={onNavigateToProfile}
                    title="View Profile"
                  >
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" />
                      ) : (
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <span className="user-name">{user.name}</span>
                  </button>
                </div>
              ) : (
                <div className="auth-menu">
                  <button
                    className="auth-button signin"
                    onClick={onNavigateToSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    className="auth-button signup"
                    onClick={onNavigateToSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
