import { Link } from "react-router-dom";

function HeroSection({ cards }) {
  return (
    <div className="container">
      <div className="hero-text">
        <h1>Welcome to Report Manager</h1>
        <p>
          Efficiently manage user reports with our comprehensive dashboard.
          Create, view, and edit reports with ease.
        </p>
      </div>
      <div className="reportCount">
        <div className="totalReports">
          <i className="fa-regular fa-user"></i>
          <div className="reportStats">
            <p>TOTAL REPORTS</p>
            <h1>{cards.length}</h1>
          </div>
        </div>
      </div>
      <div className="reportButtons">
        <button className="create-btn">
          <Link to="/create">+ Create New Report</Link>
        </button>
        <button className="view-btn">
          <Link to="/reports">
            {" "}
            <i className="fa-regular fa-file-lines"></i> View All Reports
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
