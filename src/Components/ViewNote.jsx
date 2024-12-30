import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewNote() {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.notes.notes);
  const note = allNotes.find((n) => String(n._id) === id);

  if (!note) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        <h2>Note not found</h2>
      </div>
    );
  }

  return (
    <div
      className="view-note"
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        border: "1px solid orange",
        borderRadius: "5px",
        maxWidth: "800px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={note.title || ""}
        disabled
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "18px",
          textAlign: "center",
          fontWeight: "bold",
          border: "1px solid orange",
          borderRadius: "5px",
          backgroundColor: "black",
          color: "white",
        }}
      />
      <textarea
        value={note.content || ""}
        disabled
        style={{
          width: "100%",
          height: "300px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid orange",
          borderRadius: "5px",
          backgroundColor: "black",
          color: "white",
        }}
      ></textarea>
    </div>
  );
}

export default ViewNote;
