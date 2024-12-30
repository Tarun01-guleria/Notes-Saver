import { useSelector, useDispatch } from "react-redux";
import { removeFromNotes } from "../Redux/notesSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function Notes() {
  const notes = useSelector((state) => state.notes.notes);
  const [searchNote, setSearchNote] = useState("");
  const dispatch = useDispatch();

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchNote.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(removeFromNotes(id));
    toast.success("Note deleted!");
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search notes..."
        value={searchNote}
        onChange={(e) => setSearchNote(e.target.value)}
        className="search-bar"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "6px",
          margin: "20px",
          minWidth: "550px",
          borderRadius: "2px",
        }}
      />
      {filteredData.map((note) => (
        <div
          className="card"
          style={{
            width: "48rem",
            margin: "10px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "1px solid orange",
            borderRadius: "5px",
          }}
          key={note._id}
        >
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>

            <button
              className="btn btn-danger"
              style={{ margin: "5px" }}
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>
            <button className="btn btn-dark" style={{ margin: "5px" }}>
              <Link
                to={`/?notesId=${note._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                Edit
              </Link>
            </button>

            <button className="btn btn-warning" style={{ margin: "5px" }}>
              <Link
                to={`/notes/${note._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                View
              </Link>
            </button>
            <button
              className="btn btn-secondary"
              style={{ margin: "5px" }}
              onClick={() => {
                navigator.clipboard.writeText(note.content);
                toast.success("Copied to clipboard!");
              }}
            >
              Copy
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              fontWeight: "lighter",
            }}
          >
            {note.createdAt}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
