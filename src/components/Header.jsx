import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-left">
        <i className="fa-regular fa-file"></i>
        <h3>Report Manager</h3>
      </div>

      <Link className="dashboard" to="/">
        <i className="fa-solid fa-house"></i>
        Dashboard
      </Link>
    </header>
  );
}

export default Header;
