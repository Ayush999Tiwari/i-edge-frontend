import { useState, useEffect, useRef } from 'react';
import Login from './pages/Login';
import Landingpage from './pages/Landingpage'; 
import gsap from 'gsap';

// ✅ DYNAMIC API BASE: Uses env var in production, localhost in dev
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('iedge_token', data.access_token);
        setIsAuthenticated(true);
      } else {
        alert(data.detail || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (error) {
      alert('Cannot connect to backend server. Please check your connection.');
      setIsLoading(false);
    }
  };

  // ✅ FIXED: Explicitly used in JSX below to prevent TS6133 error
  const handleLogout = () => {
    localStorage.removeItem('iedge_token');
    setIsAuthenticated(false);
    window.location.reload();
  };

  // AUTO-REDIRECT ON TOKEN EXPIRY
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('iedge_token');
      if (!token) return;
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        
        if (Date.now() >= expiryTime) {
          localStorage.removeItem('iedge_token');
          setIsAuthenticated(false);
        }
      } catch {
        localStorage.removeItem('iedge_token');
        setIsAuthenticated(false);
      }
    };

    const interval = setInterval(checkTokenExpiry, 60000);
    checkTokenExpiry();
    document.addEventListener('visibilitychange', checkTokenExpiry);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', checkTokenExpiry);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('iedge_token');
    if (token) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && appRef.current) {
      gsap.to(appRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isLoading={isLoading} />;
  }

  return (
    <div ref={appRef} className="opacity-0 relative min-h-screen">
      {/* ✅ ADDED LOGOUT BUTTON TO FIX UNUSED VARIABLE BUILD ERROR */}
      <button 
        type="button"
        onClick={() => handleLogout()}
        className="fixed top-4 right-4 z-[9999] px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-xl cursor-pointer transition-colors"
      >
        Logout
      </button>
      
      <Landingpage />
    </div>
  );
}

export default App;