import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { signOut } from '../../redux/auth/authSlice';
import SearchBar from './SearchBar'; // Import the SearchBar component

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center px-3">
            <h3 className="text-2xl font-bold text-blue-600">{t('common.title')}</h3>
          </div>
          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 justify-center sm:justify-start px-4">
            <SearchBar /> {/* Use the SearchBar component */}
          </div>
          {/* Right Section */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
            <button className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
              {t('components.navbar.cart')}
            </button>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
                  {user.displayName || t('components.navbar.profile')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
                  {t('common.Signout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
                  {t('common.Login')}
                </Link >
                <Link to="/signup" className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
                  {t('common.Sign Up')}
                </Link>
              </>
            )}
          </div>
          {/* Hamburger Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
              {t('components.navbar.cart')}
            </button>
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
                  {user.displayName || t('components.navbar.profile')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
                  {t('common.Signout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
                  {t('common.Login')}
                </Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
                  {t('common.Sign Up')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
