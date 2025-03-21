import React, { useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../components/Logo/Logo';
import './Register.css';
import { registerUser } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        if(formData.password !== formData.confirmPassword) {
            throw new Error("Passwords do not match.");
        }

       await registerUser({ email: formData.email, name: formData.name, password: formData.password  })
      
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Logo variant="brand" />
      <div className="register-card">
        <div className="register-header">
          <h1>Create an Account</h1>
          <p>Sign up to get started</p>
        </div>
        
        {error && (
          <div className="error-message">
            {
                error.split('.').map((err, idx) => {
                    return <li key={idx}>{err}</li>
                })
            }
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <FiUserPlus size={18} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>
        
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;