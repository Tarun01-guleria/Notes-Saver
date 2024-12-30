import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast("note created successfully");
    },
    updateToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => (item._id = note._id));
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("note updated");
      }
    },
    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((item) => item?._id === noteId);

      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note deleted");
      }
    },
  },
});

export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } =
  notesSlice.actions;
console.log(notesSlice.actions);

export default notesSlice.reducer;
