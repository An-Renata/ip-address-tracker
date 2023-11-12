function Header({ children }) {
  return (
    <header className="header-container">
      <h1>IP address Tracker</h1>
      <div>{children}</div>
    </header>
  );
}

export default Header;
