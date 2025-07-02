import { useNavigate } from "react-router-dom";
import ReportCard from "./ReportCard";

function ViewReport({ cards, setCards, handleEdit }) {
  const navigate = useNavigate();
  function handleDelete(cardId) {
    console.log("Deleting ID:", cardId);
    fetch(`http://localhost:3001/reports/${cardId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setCards(cards.filter((c) => c.id !== cardId));
      } else {
        alert("Delete Failed");
      }
    });
  }
  return (
    <div className="view-report-section">
      <div className="view-report-heading">
        <h1>User Reports</h1>
        <p>View and manage all user reports</p>
      </div>
      <div className="view-report-container">
        {cards.map((card) => (
          <ReportCard
            imageUrl={card.imageUrl}
            details={card}
            key={card.id}
            onDelete={() => handleDelete(card.id)}
            onEdit={() => {
              handleEdit(card);
            }}
          />
        ))}
        {cards.length === 0 && (
          <div className="first-report-dialog">
            <i class="fa-regular fa-file-lines"></i>
            <h3>No reports yet</h3>
            <p>Get started by creating your first report</p>
            <button
              className="first-report-btn"
              onClick={() => navigate("/create")}
            >
              Create your first report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReport;
