import React, { useState, useRef, useEffect } from "react";
import Logo from '../Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserId, getUserRole } from "../../utils/utils.service";
import './Header.css';
import { getUserById } from "../../services/api.service";

const Header = () => {
    const location = useLocation();
    const { pathname } = location;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        try {
            const userId = getUserId();
            const getUser = async () => {
                const user = await getUserById(userId);
                setUser(user);
            }
            getUser();
        }
        catch(error) {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className="header">
            <div className="header-wrapper">
                <Logo />
                <nav className="nav">
                    <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link to="/history" className={`nav-link ${pathname === '/history' ? 'active' : ''}`}>Booking History</Link>
                    {getUserRole() == "ADMIN" && (<Link to="/bookings" className={`nav-link ${pathname === '/bookings' ? 'active' : ''}`}>View All Bookings</Link>)}
                    <div className="user-menu" ref={dropdownRef}>
                        <a 
                            href="#" 
                            className="user-avatar"
                            onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen(!dropdownOpen);
                            }}
                        >
                            { user && user.name.split(" ").map((word) => word[0].toUpperCase()).join('') }
                        </a>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button 
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;