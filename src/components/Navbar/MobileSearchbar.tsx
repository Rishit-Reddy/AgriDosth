import { useTranslation } from "react-i18next";


const MobileSearchBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="sm:hidden px-4 py-2 bg-white shadow-md">
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
  );
};

export default MobileSearchBar;
