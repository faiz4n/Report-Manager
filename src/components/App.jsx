import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getDocs, addDoc, doc, updateDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ReportForm from "./ReportForm";
import ViewReport from "./ViewReport";
import InputList from "./InputList";

function App() {
  const navigate = useNavigate();
  const reportsRef = collection(db, "reports");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState([""]);
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeUpdated, setResumeUpdated] = useState(false);

  useEffect(function () {
    async function fetchReports() {
      const data = await getDocs(reportsRef);
      console.log(data);
      const reportData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCards(reportData);
    }
    fetchReports();
  }, []);

  const details = {
    name: name.trim(),
    email: email.trim(),
    phone: phone,
    qualification: qualification.map((q) => q.trim()),
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
    setResumeUpdated(false);
    navigate("/create");
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setQualification([""]);
    setEditingId(null);
    setImageUrl("");
    setResumeUrl("");
    setResumeUpdated(false);
  }

  function handleUpload(e, type) {
    if (type === "Resume") setResumeUpdated(false);

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
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
        if (type === "Image") {
          setImageUrl(data.secure_url);
        } else if (type === "Resume") {
          setResumeUrl(
            data.secure_url.replace("/upload", "/upload/fl_attachment")
          );
        }
        console.log(details);
        if (type === "Resume") setResumeUpdated(true);
      });
  }

  function onCreateCard() {
    setResumeUpdated(false);
    const newErrors = {};

    if (!name) newErrors.name = "Name required";
    if (!email) newErrors.email = "Email required";
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!phone) newErrors.phone = "Phone Number required";
    if (!qualification.some((q) => q)) {
      newErrors.qualification = "At least one qualification required";
    }
    if (!imageUrl) newErrors.imageUrl = "Image upload is required";
    if (!resumeUrl) newErrors.resumeUrl = "Resume upload is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const filteredQualifications = qualification.filter((q) => q);

    const detailsToSave = {
      ...details,
      qualification: filteredQualifications,
    };

    if (editingId) {
      const docRef = doc(db, "reports", editingId);
      updateDoc(docRef, detailsToSave).then(() => {
        setCards(
          cards.map((card) =>
            card.id === editingId ? { ...detailsToSave, id: editingId } : card
          )
        );
        navigate("/reports");
      });
    } else {
      addDoc(reportsRef, detailsToSave).then((docRef) => {
        const newCard = { ...detailsToSave, id: docRef.id };
        setCards([...cards, newCard]);
        navigate("/reports");
      });
    }

    resetForm();
  }

  return (
    <>
      <Header resetForm={resetForm} />
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
                imageUrl={imageUrl}
                resumeUpdated={resumeUpdated}
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
