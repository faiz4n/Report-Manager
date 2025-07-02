import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ReportForm from "./ReportForm";
import ViewReport from "./ViewReport";
import InputList from "./InputList";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState([""]);
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(function () {
    fetch("http://localhost:3001/reports")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const details = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: phone,
    qualification: qualification,
    imageUrl: imageUrl,
    resumeUrl: resumeUrl,
  };

  function handleEdit(card) {
    setName(card.name);
    setEmail(card.email);
    setPhone(card.phone);
    setQualification(card.qualification);
    setEditingId(card.id);
    setImageUrl(card.imageUrl);
    setResumeUrl(card.resumeUrl);
    navigate("/create");
  }

  function handleUpload(e, type) {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "Report");

    const uploadUrl =
      type === "Image"
        ? "https://api.cloudinary.com/v1_1/dpeuqqipy/image/upload"
        : "https://api.cloudinary.com/v1_1/dpeuqqipy/raw/upload";

    fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (type === "Image") setImageUrl(data.secure_url);
        if (type === "Resume")
          setResumeUrl(
            data.secure_url.replace("/upload", "/upload/fl_attachment")
          );
        console.log(details);
      });
  }

  function onCreateCard() {
    const newErrors = {};

    if (!name) newErrors.name = "Name required";
    if (!email) newErrors.email = "Email required";
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!phone) newErrors.phone = "Phone Number required";
    if (!qualification.some((q) => q && q.trim())) {
      newErrors.qualification = "At least one qualification required";
    }
    if (!imageUrl) newErrors.imageUrl = "Image upload is required";
    if (!resumeUrl) newErrors.resumeUrl = "Resume upload is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (editingId) {
      fetch(`http://localhost:3001/reports/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, id: editingId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCards(cards.map((card) => (card.id === editingId ? data : card)));
          navigate("/reports");
        });
    } else {
      fetch("http://localhost:3001/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      })
        .then((res) => res.json())
        .then((data) => {
          setCards([...cards, data]);
          navigate("/reports");
        });
    }

    setName("");
    setEmail("");
    setPhone("");
    setQualification([""]);
    setEditingId(null);
    setImageUrl("");
    setResumeUrl("");
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection cards={cards} />} />
        <Route
          path="/create"
          element={
            <ReportForm
              details={details}
              editingId={editingId}
              onCreateCard={onCreateCard}
            >
              <InputList
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                qualification={qualification}
                setQualification={setQualification}
                errors={errors}
                handleUpload={handleUpload}
              />
            </ReportForm>
          }
        />

        <Route
          path="/reports"
          element={
            <ViewReport
              details={details}
              onCreateForm={onCreateCard}
              cards={cards}
              setCards={setCards}
              handleEdit={handleEdit}
              imageUrl={imageUrl}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
