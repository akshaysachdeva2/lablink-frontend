
import { useEffect, useState } from 'react';
import type { AuthUser } from '../types';

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import {
  Activity,
  ArrowRight,
  CalendarDays,
  Menu,
  UserRound,
  X,
  LogOut,
} from 'lucide-react';

// Read the logged-in user from localStorage
function readUser(): AuthUser | null {
  try {
    const saved = localStorage.getItem('lablink_user');
    return saved ? (JSON.parse(saved) as AuthUser) : null;
  } catch {
    return null;
  }
}

// Main website layout
export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(readUser);

  const navigate = useNavigate();

  // Keep navbar synchronized with login and logout
  useEffect(() => {
    const syncUser = () => {
      setUser(readUser());
    };

    window.addEventListener('lablink-auth-changed', syncUser);
    window.addEventListener('storage', syncUser);

    return () => {
      window.removeEventListener('lablink-auth-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  // Sign out
  const logout = () => {
    localStorage.removeItem('lablink_token');
    localStorage.removeItem('lablink_user');

    window.dispatchEvent(new Event('lablink-auth-changed'));

    setMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">

          {/* Logo */}
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Activity size={21} />
            </span>
            <span>
              lab<span>link</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="mobile-menu"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Navigation */}
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <NavLink
              to="/tests"
              onClick={() => setMenuOpen(false)}
            >
              Find a test
            </NavLink>

            <a
              href="/#how-it-works"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </a>

            <NavLink
              to="/bookings"
              onClick={() => setMenuOpen(false)}
            >
              My bookings
            </NavLink>

            <NavLink
              to="/report-summary"
              onClick={() => setMenuOpen(false)}
            >
              AI report summary
            </NavLink>
          </nav>

          {/* Account actions */}
          <div className="nav-actions">
            {user ? (
              <>
                <Link
                  className="signin-link"
                  to="/bookings"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserRound size={17} />
                  Hi, {user.name.split(' ')[0]}
                </Link>

                <button
                  type="button"
                  className="signin-link"
                  onClick={logout}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                className="signin-link"
                to="/signin"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound size={17} />
                Sign in
              </Link>
            )}

            <Link
              className="btn btn-primary nav-cta"
              to="/tests"
              onClick={() => setMenuOpen(false)}
            >
              Book a test <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <Activity size={20} />
            </span>
            <span>
              lab<span>link</span>
            </span>
          </Link>

          <p>Better health decisions start with better access.</p>

          <span>© 2026 LabLink. Demo experience.</span>
        </div>
      </footer>
    </div>
  );
}

// Reusable page title
export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

// Booking icon
export function BookingIcon() {
  return <CalendarDays size={17} />;
}
