import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user, onSignOut, onBackToApp }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    notifications: user?.notifications || true,
    theme: user?.theme || 'beige'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Simulate saving profile
    setIsEditing(false);
    // Here you would typically update the user data
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      notifications: user?.notifications || true,
      theme: user?.theme || 'beige'
    });
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '◈' },
    { id: 'settings', label: 'Settings', icon: '◉' },
    { id: 'stats', label: 'Statistics', icon: '◐' },
    { id: 'preferences', label: 'Preferences', icon: '⬢' }
  ];

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <button className="back-button" onClick={onBackToApp}>
            ← Back to App
          </button>
          <h1>My Profile</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="avatar-container">
                <div className="avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" />
                  ) : (
                    <span className="avatar-initials">{getInitials(user?.name)}</span>
                  )}
                </div>
                <button className="avatar-edit" onClick={() => setIsEditing(true)}>
                  ✎
                </button>
              </div>
              <h2>{user?.name || 'User'}</h2>
              <p>{user?.email || 'user@example.com'}</p>
              <div className="member-since">
                Member since {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Total Reminders</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'profile' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h3>Personal Information</h3>
                    {!isEditing && (
                      <button className="edit-button" onClick={() => setIsEditing(true)}>
                        ✎ Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="form-section">
                    <div className="form-group">
                      <label>Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="profile-input"
                        />
                      ) : (
                        <div className="profile-field">{profileData.name}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="profile-input"
                        />
                      ) : (
                        <div className="profile-field">{profileData.email}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Bio</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about yourself..."
                          className="profile-textarea"
                          rows="4"
                        />
                      ) : (
                        <div className="profile-field">
                          {profileData.bio || 'No bio added yet'}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="form-actions">
                        <button className="save-button" onClick={handleSave}>
                          ✓ Save Changes
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                          ✕ Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h3>Account Settings</h3>
                  </div>

                  <div className="settings-section">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Notifications</h4>
                        <p>Receive email notifications for reminders</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name="notifications"
                          checked={profileData.notifications}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Email Updates</h4>
                        <p>Receive weekly summary emails</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Data Export</h4>
                        <p>Download your reminder data</p>
                      </div>
                      <button className="action-button">Export Data</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h3>Your Statistics</h3>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">●</div>
                      <div className="stat-info">
                        <div className="stat-value">0</div>
                        <div className="stat-label">Total Reminders</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">✓</div>
                      <div className="stat-info">
                        <div className="stat-value">0</div>
                        <div className="stat-label">Completed</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">◐</div>
                      <div className="stat-info">
                        <div className="stat-value">0</div>
                        <div className="stat-label">In Progress</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⧖</div>
                      <div className="stat-info">
                        <div className="stat-value">0%</div>
                        <div className="stat-label">Completion Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h3>Preferences</h3>
                  </div>

                  <div className="preferences-section">
                    <div className="preference-group">
                      <h4>Theme</h4>
                      <div className="theme-options">
                        <label className="theme-option">
                          <input
                            type="radio"
                            name="theme"
                            value="beige"
                            checked={profileData.theme === 'beige'}
                            onChange={handleChange}
                          />
                          <span className="theme-preview beige"></span>
                          <span className="theme-label">Beige</span>
                        </label>
                      </div>
                    </div>

                    <div className="preference-group">
                      <h4>Default View</h4>
                      <select className="preference-select" defaultValue="all">
                        <option value="all">All Reminders</option>
                        <option value="pending">Pending Only</option>
                        <option value="completed">Completed Only</option>
                      </select>
                    </div>

                    <div className="preference-group">
                      <h4>Reminder Categories</h4>
                      <div className="category-preferences">
                        {['Work', 'Personal', 'Health', 'Shopping', 'Finance'].map(category => (
                          <label key={category} className="category-checkbox">
                            <input type="checkbox" defaultChecked />
                            <span className="checkbox-mark"></span>
                            {category}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-footer">
          <button className="signout-button" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
