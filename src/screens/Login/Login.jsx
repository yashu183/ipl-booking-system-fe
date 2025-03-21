import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLogin } from "react-icons/md";
import { loginUser } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const loginUserResponse = await loginUser({ email, password });
        const token = loginUserResponse.token;
        // store it in localStorage
        localStorage.setItem('token', token);
        // navigate to Home on successful login
        navigate("/");
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="login-container">
            <Logo variant="brand" />
            <div className="login-card">
                <div className="login-header">
                <h1>Welcome Back</h1>
                <p>Sign in to your account</p>
                </div>
                
                {error && (
                    // <ErrorCard 
                    //     message={error} 
                    //     onClose={() => setError(null)} 
                    // />
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`submit-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? (
                    <>
                        <div className="spinner"></div>
                        <span>Signing in...</span>
                    </>
                    ) : (
                    <>
                        <MdLogin size={18} />
                        <span>Sign in</span>
                    </>
                    )}
                </button>
                </form>
                
                <div className="login-footer">
                <p>
                    Don't have an account?{' '}
                    <span className="register-link" onClick={() => navigate('/register')}>Sign up</span> 
                </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;