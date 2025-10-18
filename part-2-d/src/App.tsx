import { useState, useEffect } from "react";
import api from "./services";
import type { NoteProps } from "./types";

const Note = ({ content, important, toggleImportance }: NoteProps) => {
  const label = important ? "make not important" : "make important";

  return (
    <li>
      {content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

const App = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  // Initial render
  useEffect(() => {
    api
      .getAll()
      .then((initialNotes) => {
        console.log("promise fulfilled");
        setNotes(initialNotes);
      })
      .catch((error) => console.error("Error fetching notes: ", error));
  }, []);

  const toggleImportanceOf = (id: string) => {
    const note = notes.find((n) => n.id === id)!;
    const updatedNote = { ...note, important: !note?.important };

    api.udpate(id, updatedNote).then((response) => {
      setNotes(notes.map((note) => (note.id === id ? response.data : note)));
    });
    console.log(notes.find((n) => n.id === id));
  };

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject: NoteProps = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1),
      toggleImportance: () => toggleImportanceOf(String(notes.length + 1)),
    };

    api.create(noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            content={note.content}
            id={""}
            important={false}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
