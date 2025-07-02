function ReportCard({ details = {}, onDelete, onEdit }) {
  const { name, email, phone, qualification = [] } = details;
  return (
    <div className="report-card">
      <div className="details">
        <div className="photo">
          <img
            src={
              details.imageUrl ||
              "https://via.placeholder.com/100x100?text=No+Image"
            }
            alt="Profile Photo"
          />
        </div>
        <h2 className="name">{name}</h2>
      </div>
      <div className="contacts">
        <p className="email">
          <i className="fa-regular fa-envelope"></i> {email}
        </p>
        <p className="number">
          <i className="fa-solid fa-phone"></i> {phone}
        </p>
      </div>
      <div className="qualification">
        <label>
          <i className="fa-solid fa-graduation-cap"></i> Qualifications
        </label>
        <ul>
          {qualification.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      </div>
      <div className="report-card-buttons">
        <button className="download-resume-btn">
          <a href={details.resumeUrl} download target="_blank">
            <i className="fa-solid fa-download"></i> Resume
          </a>
        </button>
        <button className="edit-btn" onClick={onEdit}>
          <i className="fa-regular fa-edit"></i> Edit
        </button>
        <button className="del-report-btn" onClick={onDelete}>
          <i className="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
