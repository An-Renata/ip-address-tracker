function Header({ children }) {
  return (
    <div className="header-container">
      <header>
        <h1>IP address Tracker</h1>
        <div>{children}</div>
      </header>
    </div>
  );
}

export default Header;
