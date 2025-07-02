function ReportForm({ children, details, onCreateCard, editingId }) {
  const { name, email, phone, qualification } = details;
  return (
    <div className="form-container">
      <form className="create-report-form">
        <div className="form-heading">
          <h1>{editingId ? "Update Report" : "Create New Report"}</h1>
          <p>
            {editingId
              ? "Edit the form below to update a new report"
              : "Fill out the form below to create a new report"}
          </p>
        </div>
        <div className="form-inputs">{children}</div>
        <button
          className="submit-form-btn"
          onClick={(e) => {
            e.preventDefault();
            console.log(name, email, phone, qualification);
            onCreateCard();
          }}
        >
          <i className="fa-solid fa-floppy-disk"></i>{" "}
          {editingId ? "Update Report" : "Create Report"}
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
