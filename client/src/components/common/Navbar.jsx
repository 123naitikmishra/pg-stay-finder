import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, Menu, User, Heart, LogOut, Compass, Shield, Plus, X, ChevronDown, Check
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, login, logout, switchRole } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Search local states
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (!searchCity && !searchType) return;
    navigate(`/listings?city=${searchCity}&type=${searchType}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const roles = ["Guest", "User", "Owner", "Admin"];

  const handleRoleSwitch = async (role) => {
    if (role === "Guest") {
      await logout();
      navigate('/');
    } else {
      await switchRole(role);
    }
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 text-white font-bold text-xl">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
              StayFinder
            </span>
          </Link>

          {/* Quick Search Bar */}
          {location.pathname !== '/' && (
            <form onSubmit={handleQuickSearch} className="hidden md:flex items-center bg-white border border-slate-200 rounded-full py-1.5 px-3 shadow-sm hover:shadow-md smooth-transition max-w-md w-full mx-4">
              <input 
                type="text"
                placeholder="Where to?" 
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full text-xs font-semibold px-2 text-slate-700 bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-slate-400"
              />
              <span className="w-[1px] h-4 bg-slate-200"></span>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-xs font-semibold px-2 text-slate-700 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <option value="">Any Stay</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Flat">Flat</option>
                <option value="Room">Room</option>
              </select>
              <button type="submit" className="p-2 bg-primary-500 rounded-full text-white hover:bg-primary-600 smooth-transition">
                <Search size={14} />
              </button>
            </form>
          )}

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
            <Link to="/listings" className="hover:text-primary-500 transition-colors">Explore</Link>
            <Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link>
          </div>

          {/* Auth & Profile Actions */}
          <div className="flex items-center space-x-4">
            {currentUser && (
              <Link to="/favorites" className="p-2 hover:bg-slate-50 rounded-full text-slate-600 hover:text-primary-500 smooth-transition relative">
                <Heart size={20} />
                {currentUser.favorites?.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                )}
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 border border-slate-200 rounded-full p-1.5 hover:shadow-md smooth-transition bg-white"
              >
                <Menu size={18} className="text-slate-500 ml-1" />
                <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-slate-500" />
                  )}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-150">
                  {currentUser ? (
                    <>
                      {/* User Header */}
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary-50 text-[10px] font-bold text-primary-600 rounded-md">
                          Role: {currentUser.role}
                        </span>
                      </div>
                      
                      {/* Menu links */}
                      <div className="py-1">
                        <Link to={currentUser.role === 'Owner' ? '/owner-dashboard' : currentUser.role === 'Admin' ? '/admin-dashboard' : '/user-dashboard'} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={() => setDropdownOpen(false)}>
                          Dashboard
                        </Link>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={() => setDropdownOpen(false)}>
                          My Profile
                        </Link>
                        {currentUser.role === 'Owner' && (
                          <Link to="/owner-dashboard?add=true" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium" onClick={() => setDropdownOpen(false)}>
                            List a Property
                          </Link>
                        )}
                      </div>

                      {/* Developer Role Switcher */}
                      <div className="border-t border-slate-100 py-1 bg-slate-50">
                        <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Test Roles
                        </div>
                        {roles.map((role) => (
                          <button
                            key={role}
                            onClick={() => handleRoleSwitch(role)}
                            className="w-full flex items-center justify-between px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100 text-left"
                          >
                            <span>{role} Mode</span>
                            {(currentUser.role === role || (role === "Guest" && !currentUser)) && (
                              <Check size={12} className="text-primary-500" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 py-1">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium text-left"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="py-1">
                        <Link to="/login" className="block px-4 py-2 text-sm text-slate-800 font-bold hover:bg-slate-50" onClick={() => setDropdownOpen(false)}>
                          Log In
                        </Link>
                        <Link to="/signup" className="block px-4 py-2 text-sm text-slate-600 font-semibold hover:bg-slate-50" onClick={() => setDropdownOpen(false)}>
                          Sign Up
                        </Link>
                      </div>
                      
                      {/* Developer Role Switcher for guests */}
                      <div className="border-t border-slate-100 py-1 bg-slate-50">
                        <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Quick Demo Signin
                        </div>
                        <button onClick={() => { login("user@example.com", "any"); setDropdownOpen(false); }} className="w-full px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100 text-left block">
                          Log in as User
                        </button>
                        <button onClick={() => { login("owner@example.com", "any"); setDropdownOpen(false); }} className="w-full px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100 text-left block">
                          Log in as Owner
                        </button>
                        <button onClick={() => { login("admin@example.com", "any"); setDropdownOpen(false); }} className="w-full px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100 text-left block">
                          Log in as Admin
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-50 rounded-full text-slate-600"
            >
              <Menu size={22} />
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white py-4 px-6 absolute left-0 right-0 shadow-lg z-40">
          <form onSubmit={handleQuickSearch} className="flex flex-col space-y-2 mb-4">
            <input 
              type="text"
              placeholder="Search City (e.g. Bengaluru)"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Any Stay Type</option>
              <option value="PG">PG</option>
              <option value="Hostel">Hostel</option>
              <option value="Flat">Flat</option>
              <option value="Room">Room</option>
            </select>
            <button type="submit" className="w-full py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center space-x-2">
              <Search size={16} />
              <span>Search stays</span>
            </button>
          </form>

          <div className="flex flex-col space-y-3 font-semibold text-slate-700">
            <Link to="/listings" className="py-2 border-b border-slate-50" onClick={() => setMobileMenuOpen(false)}>Explore Properties</Link>
            <Link to="/about" className="py-2 border-b border-slate-50" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="py-2 border-b border-slate-50" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            {!currentUser && (
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-sm" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                <Link to="/signup" className="flex-1 py-2 text-center bg-primary-500 text-white rounded-xl text-sm" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
