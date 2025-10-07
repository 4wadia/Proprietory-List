import React, { useState, useEffect } from 'react';
import './App.css';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import NotificationToast from './components/NotificationToast';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState('app'); // 'app', 'about', 'signin', 'signup', 'profile'
  const [user, setUser] = useState(null); // User authentication state

  // Load user and reminders from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders and user to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Check for due reminders and show notifications
  useEffect(() => {
    const checkDueReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (!reminder.completed && reminder.date && reminder.time) {
          const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
          const timeDiff = reminderDateTime.getTime() - now.getTime();
          
          // Show notification 5 minutes before due time
          if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
            showNotification(`${reminder.text} is due soon!`, 'warning');
          }
        }
      });
    };

    const interval = setInterval(checkDueReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const addReminder = (reminder) => {
    const newReminder = {
      id: Date.now(),
      text: reminder.text,
      date: reminder.date,
      time: reminder.time,
      priority: reminder.priority,
      category: reminder.category || 'general',
      completed: false,
      createdAt: new Date().toISOString()
    };
    setReminders([newReminder, ...reminders]);
    showNotification('Reminder added successfully!', 'success');
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        const updatedReminder = { ...reminder, completed: !reminder.completed };
        showNotification(
          updatedReminder.completed ? 'Reminder completed!' : 'Reminder marked as pending',
          updatedReminder.completed ? 'success' : 'info'
        );
        return updatedReminder;
      }
      return reminder;
    }));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    showNotification('Reminder deleted!', 'warning');
  };

  const editReminder = (id, updatedReminder) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
    ));
    showNotification('Reminder updated!', 'info');
  };

  const filteredReminders = reminders.filter(reminder => {
    // Filter by status
    const statusMatch = (() => {
      switch (filter) {
        case 'pending':
          return !reminder.completed;
        case 'completed':
          return reminder.completed;
        default:
          return true;
      }
    })();

    // Filter by category
    const categoryMatch = selectedCategory === 'all' || reminder.category === selectedCategory;

    // Filter by search term
    const searchMatch = reminder.text.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && categoryMatch && searchMatch;
  });

  const pendingCount = reminders.filter(reminder => !reminder.completed).length;
  const completedCount = reminders.filter(reminder => reminder.completed).length;

  // Authentication handlers
  const handleSignIn = (userData) => {
    setUser(userData);
    setCurrentPage('app');
    showNotification(`Welcome back, ${userData.name}!`, 'success');
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setCurrentPage('app');
    showNotification(`Welcome to Reminder App, ${userData.name}!`, 'success');
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('app');
    showNotification('You have been signed out', 'info');
  };

  // Get unique categories from reminders
  const categories = ['all', ...new Set(reminders.map(r => r.category).filter(Boolean))];

  // Render different pages based on currentPage state
  if (currentPage === 'signin') {
    return (
      <div className="App">
        <SignIn 
          onSignIn={handleSignIn}
          onNavigateToSignUp={() => setCurrentPage('signup')}
          onBackToApp={() => setCurrentPage('app')}
        />
        <NotificationToast notifications={notifications} setNotifications={setNotifications} />
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="App">
        <SignUp 
          onSignUp={handleSignUp}
          onNavigateToSignIn={() => setCurrentPage('signin')}
          onBackToApp={() => setCurrentPage('app')}
        />
        <NotificationToast notifications={notifications} setNotifications={setNotifications} />
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <div className="App">
        <Profile 
          user={user}
          onSignOut={handleSignOut}
          onBackToApp={() => setCurrentPage('app')}
        />
        <NotificationToast notifications={notifications} setNotifications={setNotifications} />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="App">
        <About onBackToApp={() => setCurrentPage('app')} />
        <NotificationToast notifications={notifications} setNotifications={setNotifications} />
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        pendingCount={pendingCount}
        completedCount={completedCount}
        filter={filter}
        setFilter={setFilter}
        onNavigateToAbout={() => setCurrentPage('about')}
        user={user}
        onNavigateToSignIn={() => setCurrentPage('signin')}
        onNavigateToSignUp={() => setCurrentPage('signup')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
      
      <main className="main-content">
        <div className="container">
          <div className="controls-section">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          <ReminderForm onAddReminder={addReminder} />
          <ReminderList
            reminders={filteredReminders}
            onToggleReminder={toggleReminder}
            onDeleteReminder={deleteReminder}
            onEditReminder={editReminder}
            searchTerm={searchTerm}
          />
        </div>
      </main>

      <NotificationToast notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}

export default App;
