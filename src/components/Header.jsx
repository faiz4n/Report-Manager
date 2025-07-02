import { Link } from "react-router-dom";

function Header({ resetForm }) {
  return (
    <header>
      <div className="header-left">
        <i className="fa-regular fa-file"></i>
        <h3>Report Manager</h3>
      </div>

      <div>
        <Link role="button" to="/" onClick={resetForm} className="dashboard">
          <i className="fa-solid fa-house"></i>
          Dashboard
        </Link>
      </div>
    </header>
  );
}

export default Header;
