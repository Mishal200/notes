import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Load from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add Note
  const addNote = () => {
    if (!title) return;

    const newNote = {
      id: Date.now(),
      title,
      description,
      category,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
  };

  // Delete Note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Filter + Search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || note.category === filter)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes App</h2>

      {/* Add Note */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Personal</option>
        <option>Work</option>
        <option>Ideas</option>
        <option>Others</option>
      </select>
      <br /><br />

      <button onClick={addNote}>Add Note</button>

      <hr />

      {/* Search + Filter */}
      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Personal</option>
        <option>Work</option>
        <option>Ideas</option>
        <option>Others</option>
      </select>

      <p>Total: {notes.length}</p>
      <p>Showing: {filteredNotes.length}</p>

      {/* Display Notes */}
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <p>{note.category}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
