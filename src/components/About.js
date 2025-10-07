import React from 'react';
import './About.css';

const About = ({ onBackToApp }) => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <button className="back-button" onClick={onBackToApp}>
            ← Back to App
          </button>
          <h1>About Reminder App</h1>
          <p className="about-subtitle">A modern, intuitive reminder application built with React</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Project Overview</h2>
            <p>
              Reminder App is a sophisticated, user-friendly reminder management system designed to help 
              individuals and teams stay organized and never miss important tasks. Built with modern web 
              technologies, it combines elegant design with powerful functionality to create an exceptional 
              user experience.
            </p>
            <p>
              Our application emphasizes simplicity without sacrificing features, making it accessible to 
              users of all technical backgrounds while providing the tools needed for effective task management.
            </p>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">◉</div>
                <h3>Smart Reminders</h3>
                <p>Create, edit, and manage reminders with intelligent categorization and priority levels.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⬢</div>
                <h3>Category Organization</h3>
                <p>Organize reminders by categories: Work, Personal, Health, Shopping, Finance, and more.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">◉</div>
                <h3>Advanced Search</h3>
                <p>Find reminders instantly with real-time search functionality and highlighted results.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">◐</div>
                <h3>Smart Notifications</h3>
                <p>Receive timely notifications and due date alerts to stay on top of your tasks.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">●</div>
                <h3>Priority System</h3>
                <p>Mark reminders with high, medium, or low priority to focus on what matters most.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">◈</div>
                <h3>Local Storage</h3>
                <p>Your data is stored locally in your browser, ensuring privacy and offline access.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <h4>Frontend</h4>
                <ul>
                  <li>React 18 - Modern component-based architecture</li>
                  <li>JavaScript ES6+ - Latest language features</li>
                  <li>CSS3 - Advanced styling with gradients and animations</li>
                  <li>Responsive Design - Mobile-first approach</li>
                </ul>
              </div>
              <div className="tech-item">
                <h4>Features</h4>
                <ul>
                  <li>Local Storage API - Client-side data persistence</li>
                  <li>Modern CSS Grid & Flexbox - Layout management</li>
                  <li>CSS Animations - Smooth transitions and effects</li>
                  <li>Progressive Web App Ready - Modern web standards</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Design Philosophy</h2>
            <div className="design-principles">
              <div className="principle">
                <h3>Minimal & Clean</h3>
                <p>We believe in the power of simplicity. Our interface is designed to be intuitive and uncluttered, allowing users to focus on what matters most - their tasks.</p>
              </div>
              <div className="principle">
                <h3>Accessible</h3>
                <p>Built with accessibility in mind, our app works seamlessly across different devices, screen sizes, and user capabilities.</p>
              </div>
              <div className="principle">
                <h3>Performance First</h3>
                <p>Optimized for speed and efficiency, ensuring smooth interactions and fast loading times across all devices.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Project Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">6</div>
                <div className="stat-label">React Components</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">CSS Modules</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Responsive Design</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">External Dependencies</div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Development Journey</h2>
            <p>
              This project was built as a demonstration of modern React development practices, focusing on 
              component composition, state management, and user experience design. Every feature was carefully 
              crafted to provide maximum value while maintaining clean, maintainable code.
            </p>
            <p>
              The development process emphasized iterative improvement, user feedback integration, and 
              performance optimization. The result is a production-ready application that showcases 
              the potential of modern web technologies.
            </p>
          </section>

          <section className="about-section">
            <h2>Future Enhancements</h2>
            <div className="roadmap">
              <div className="roadmap-item">
                <h3>Phase 1</h3>
                <ul>
                  <li>Dark mode theme support</li>
                  <li>Export/Import functionality</li>
                  <li>Keyboard shortcuts</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <h3>Phase 2</h3>
                <ul>
                  <li>Collaborative features</li>
                  <li>Cloud synchronization</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <h3>Phase 3</h3>
                <ul>
                  <li>Mobile app development</li>
                  <li>AI-powered suggestions</li>
                  <li>Integration APIs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Open Source</h2>
            <p>
              This project is open source and available on GitHub. We welcome contributions from the 
              community and believe in the power of collaborative development. Whether you're fixing bugs, 
              adding features, or improving documentation, every contribution helps make this project better.
            </p>
            <div className="github-info">
              <p>Visit our repository to contribute, report issues, or suggest new features.</p>
            </div>
          </section>

          <section className="about-section">
            <h2>Contact & Support</h2>
            <p>
              We're committed to providing the best possible user experience. If you have questions, 
              suggestions, or need support, we're here to help.
            </p>
            <div className="contact-info">
              <p>Built with ❤️ using React and modern web technologies</p>
              <p>Version 1.0.0 | Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
