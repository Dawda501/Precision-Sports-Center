import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import preLogo from '/public/pre-logo.png';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur bg-white/70 dark:bg-black/30 border-b border-border sticky top-0 z-40 shadow-sm"
    >
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center relative">
          <img
            src={preLogo}
            alt="Precision Sports Logo"
            className="h-[80px] w-200 object-contain -my-2 relative top-[2px]"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={item.path}
                className={`relative group transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-foreground/90 hover:text-primary'
                }`}
              >
                {item.label}
                {/* Active underline */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                    isActive(item.path)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Cart + Auth Buttons */}
        <div className="flex items-center gap-5 font-medium">
          <Link
            to="/cart"
            className={`relative group transition-all duration-300 ${
              isActive('/cart')
                ? 'text-primary'
                : 'text-foreground/90 hover:text-primary'
            }`}
          >
            Cart
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                isActive('/cart')
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>

          {user ? (
            <button
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="relative group text-foreground/90 hover:text-primary transition-all duration-300"
            >
              Logout
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
            </button>
          ) : (
            <Link
              to="/login"
              className={`relative group transition-all duration-300 ${
                isActive('/login')
                  ? 'text-primary'
                  : 'text-foreground/90 hover:text-primary'
              }`}
            >
              Login
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                  isActive('/login')
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
