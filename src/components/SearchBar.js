import { useRef } from "react";

function SearchBar({ setSearchValue }) {
  // Taking a value to from the input
  const searchBoxRef = useRef(null);

  //
  function handleSearchValue() {
    // Storing refs value from the input field
    const searchBox = searchBoxRef.current;
    // Updating the state with current user input
    setSearchValue(searchBox.value);
    // Clear input box after searching
    searchBox.value = "";
  }

  return (
    <div>
      <input
        ref={searchBoxRef} // ref to access input value
        type="text"
        placeholder="Search for any IP address or domain | e.g. google.com"
        // onKeyDown={onSearchValue}
        onKeyDown={(e) => (e.key === "Enter" ? handleSearchValue() : null)}
      ></input>
      <span>
        <button className="search-btn" onClick={handleSearchValue}>
          &gt;
        </button>
      </span>
    </div>
  );
}

export default SearchBar;
