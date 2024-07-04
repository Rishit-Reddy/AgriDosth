import SearchBar from './SearchBar'; // Import the SearchBar component

const MobileSearchBar = () => {
  return (
    <div className="sm:hidden px-4 py-2 bg-white shadow-md">
      <SearchBar /> {/* Use the SearchBar component */}
    </div>
  );
};

export default MobileSearchBar;
