// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { signOut } from '../../redux/auth/authSlice';
import SearchBar from './SearchBar'; // Import the SearchBar component
import WeatherWidget from './WeatherWidget';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsLanguageMenuOpen(false);
    
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center px-3">
            <Link to="/">
              <h3 className="text-2xl font-bold text-blue-600">{t('common.title')}</h3>
            </Link>
          </div>
          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 justify-center sm:justify-start px-4">
            <SearchBar /> {/* Use the SearchBar component */}
          </div>
          {/* Right Section */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
            <Link to="/cart" className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
              {t('components.navbar.cart')}
            </Link>
            {user ? (
              <>
                <Link to="/profileupdate" className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
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
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="text-gray-700 text-base font-medium rounded-md focus:outline-none focus:text-gray-900">
                {t('common.language')}
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.english')}</button>
                  <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.telugu')}</button>
                  <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.hindi')}</button>
                  <button onClick={() => changeLanguage('ta')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.tamil')}</button>
                  <button onClick={() => changeLanguage('kn')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.kannada')}</button>
                  <button onClick={() => changeLanguage('ml')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.malayalam')}</button>
                </div>
              )}
            </div>
            <WeatherWidget />
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
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
              {t('components.navbar.cart')}
            </Link>
            {user ? (
              <>
                <Link to="/profileupdate" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
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
            {/* Mobile Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-gray-900">
                {t('common.language')}
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.english')}</button>
                  <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.telugu')}</button>
                  <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.hindi')}</button>
                  <button onClick={() => changeLanguage('ta')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.tamil')}</button>
                  <button onClick={() => changeLanguage('kn')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.kannada')}</button>
                  <button onClick={() => changeLanguage('ml')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('common.malayalam')}</button>
                </div>
              )}
            </div>
            <WeatherWidget />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
