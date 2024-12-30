import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToNotes, addToNotes } from "../Redux/notesSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId");
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.notes);

  // Fetching existing note to edit if notesId exists
  useEffect(() => {
    if (notesId) {
      const note = allNotes.find((note) => note._id === notesId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
    return () => {
      setTitle("");
      setValue("");
    };
  }, [notesId, allNotes]);

  // Function to create or update note
  const createNote = () => {
    if (!title.trim() || !value.trim()) return;

    const note = {
      title: title,
      content: value,
      _id: notesId || Date.now().toString(36),
      createdAt: formatDate(new Date()),
    };

    if (notesId) {
      dispatch(updateToNotes(note));
    } else {
      dispatch(addToNotes(note));
    }

    setTitle("");
    setValue("");
    setSearchParams({}); // Clear search parameters (reset URL)
  };

  // Date formatting function for 'createdAt'
  function formatDate(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .split("/")
      .join("-");

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedDate} ${hours}:${minutes}${ampm}`;
  }

  return (
    <div className="home-container">
      <input
        className="inpTitle"
        type="text"
        placeholder="Enter Title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "6px",
          minWidth: "800px",
          marginTop: "20px",
          borderColor: "orange",
        }}
      />

      <button
        className="btn"
        style={{
          backgroundColor: "black",
          color: "white",
          marginLeft: "22px",
          marginBottom: "9px",
          padding: "3px",
        }}
        onClick={createNote}
      >
        {notesId ? "Update Note" : "Create My Note"}
      </button>

      <div style={{ margin: "10px", minHeight: "100px" }}>
        <textarea
          className="text-area"
          value={value}
          placeholder="Enter Note Here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
