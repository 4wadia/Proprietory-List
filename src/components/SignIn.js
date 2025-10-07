import React, { useState } from 'react';
import './Auth.css';

const SignIn = ({ onSignIn, onNavigateToSignUp, onBackToApp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn({
        email: formData.email,
        name: formData.email.split('@')[0],
        avatar: null
      });
    }, 1500);
  };

  const handleDemoSignIn = () => {
    onSignIn({
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: null
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <button className="back-button" onClick={onBackToApp}>
            ← Back to App
          </button>
          <div className="auth-logo">
            <span className="logo-icon">⧖</span>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>
        </div>

        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <span className="input-icon">◉</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="input-icon">◈</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="auth-button primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="auth-button demo" onClick={handleDemoSignIn}>
              <span className="demo-icon">◐</span>
              Sign in as Demo User
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button className="link-button" onClick={onNavigateToSignUp}>
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
