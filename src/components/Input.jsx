function Input({
  icon,
  label,
  setState,
  value,
  type = "text",
  multipleFields = false,
  handleAdd,
  canDelete = false,
  length,
  handleRemove,
  error,
  onChange,
  accept,
}) {
  const handleChange = onChange || ((e) => setState(e.target.value));
  return (
    <>
      <label>
        <i className={icon}></i> {label}
      </label>

      <div className="input-div">
        <input
          type={type}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={value}
          onChange={handleChange}
          accept={accept}
        />
        {canDelete && length > 1 && (
          <button className="del-qual-btn" onClick={handleRemove}>
            X
          </button>
        )}
      </div>

      {multipleFields && (
        <button
          type="button"
          className="add-label"
          onClick={(e) => handleAdd(e)}
        >
          + Add {label}
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default Input;
