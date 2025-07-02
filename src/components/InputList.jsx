import Input from "./Input";

function InputList({
  name,
  setName,
  email,
  setEmail,
  qualification,
  setQualification,
  phone,
  setPhone,
  errors,
  handleUpload,
  imageUrl,
  resumeUpdated,
}) {
  function handleAdd(e) {
    e.preventDefault();
    setQualification([...qualification, ""]);
  }
  function handleRemove(e, i) {
    e.preventDefault();
    setQualification(qualification.filter((_, idx) => i !== idx));
  }
  return (
    <>
      <Input
        icon={"fa-solid fa-user"}
        label={"Full Name"}
        setState={setName}
        value={name}
        error={errors.name}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[A-Za-z\s]*$/.test(value)) {
            setName(value);
          }
        }}
      />
      <Input
        icon={"fa-regular fa-envelope"}
        label={"Email"}
        type="email"
        setState={setEmail}
        value={email}
        error={errors.email}
      />
      <Input
        icon={"fa-solid fa-phone"}
        label={"Phone Number"}
        setState={setPhone}
        type={"tel"}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,10}$/.test(value)) {
            setPhone(value);
          }
        }}
        value={phone}
        error={errors.phone}
      />

      {qualification.map((q, idx) => (
        <Input
          key={idx}
          icon={"fa-solid fa-graduation-cap"}
          label={`Qualification ${idx > 0 ? idx + 1 : ""}`}
          setState={(val) => {
            const updated = [...qualification];
            updated[idx] = val;
            setQualification(updated);
          }}
          value={q}
          multipleFields={idx === qualification.length - 1}
          error={idx === 0 ? errors.qualification : ""}
          handleAdd={handleAdd}
          canDelete={true}
          length={qualification.length}
          handleRemove={(e) => handleRemove(e, idx)}
        />
      ))}
      <div className="image-input">
        <div className="image-input-input">
          <Input
            icon={"fa-solid fa-upload"}
            label={"Image"}
            type="file"
            onChange={(e) => handleUpload(e, "Image")}
            error={errors.imageUrl}
          />
        </div>
        <div className="image-input-img">
          <img src={imageUrl} alt="" />
        </div>
      </div>
      <Input
        icon={"fa-solid fa-file-lines"}
        label={"Resume"}
        type="file"
        error={errors.resumeUrl}
        onChange={(e) => handleUpload(e, "Resume")}
        accept={".pdf"}
      />
      {resumeUpdated && (
        <div className="resume-uploaded">
          <p>Resume uploaded</p>
          <i className="fa-solid fa-check"></i>
        </div>
      )}
    </>
  );
}

export default InputList;
