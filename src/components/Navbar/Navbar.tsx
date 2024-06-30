import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { signOut } from '../../redux/auth/authSlice';

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
            <div className="relative w-full">
              <input
                type="text"
                className="h-10 w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md text-sm leading-5 bg-white focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                placeholder={t('components.searchbar.search')}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-500 focus:outline-none bg-gray-100 rounded-full hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
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
