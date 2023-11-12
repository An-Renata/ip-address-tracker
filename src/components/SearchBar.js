function SearchBar({ onSearchValue, onSearchValueByClick }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        onKeyDown={onSearchValue}
      ></input>
      <span>
        <button className="search-btn">&gt;</button>
      </span>
    </div>
  );
}

export default SearchBar;
