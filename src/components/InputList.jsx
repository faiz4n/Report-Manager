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
        type="number"
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

      <Input
        icon={"fa-solid fa-upload"}
        label={"Image"}
        type="file"
        onChange={(e) => handleUpload(e, "Image")}
        error={errors.imageUrl}
      />
      <Input
        icon={"fa-solid fa-file-lines"}
        label={"Resume"}
        type="file"
        error={errors.resumeUrl}
        onChange={(e) => handleUpload(e, "Resume")}
      />
    </>
  );
}

export default InputList;
