import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import React, { useState, useEffect, useContext } from 'react'; 
import { ThemeContext, themes } from './themeContext';

// Sticky Notes component
export const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]); 

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false, 
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  //toggle theme between light and dark
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  //creating or editing a note
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditing) {
      // Update the existing note
      setNotes(notes.map((note) => (note.id === createNote.id ? createNote : note)));
      setIsEditing(false);
    } else {
      // Create a new note
      createNote.id = notes.length + 1;
      setNotes([createNote, ...notes]);
    }
    setCreateNote(initialNote); // Reset the form
  };

  //deleting a note
  const handleDelete = (id: number) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  //toggling the favorite status of a note
  const handleFavorite = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  //editing a note
  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setCreateNote(noteToEdit); // Pre-fill form with selected note's content
      setIsEditing(true);
    }
  };


  useEffect(() => {
    const favoriteTitlesList = notes
      .filter(note => note.favorite) 
      .map(note => note.title);

    setFavoriteTitles(favoriteTitlesList); 
    console.log("Favorite Note Titles: ", favoriteTitlesList); 
  }, [notes]); 

  return (
    <ThemeContext.Provider value={currentTheme}> {}
      <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.foreground, minHeight: '100vh', padding: '20px' }}>
        {}
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
              required
              style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
            />
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              value={createNote.content}
              onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
              required
              style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
            />
          </div>

          <div>
            <select
              value={createNote.label}
              onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })}
              required
              style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit" style={{ backgroundColor: currentTheme.foreground, color: currentTheme.background }}>
              {isEditing ? "Update Note" : "Create Note"}
            </button>
          </div>
        </form>

        {/* Display notes */}
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
              <div className="notes-header">
                <button onClick={() => handleDelete(note.id)} style={{ backgroundColor: currentTheme.foreground, color: currentTheme.background }}>x</button>
                <button onClick={() => handleEdit(note.id)} style={{ backgroundColor: currentTheme.foreground, color: currentTheme.background }}>Edit</button>
                <button onClick={() => handleFavorite(note.id)} style={{ backgroundColor: currentTheme.foreground, color: currentTheme.background }}>
                  {note.favorite ? "Unfavorite" : "Favorite"}
                </button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.label}</p>
            </div>
          ))}
        </div>

        {/* Display list of favorite notes */}
        <div className="favorite-notes-list">
          <h3>Favorite Notes</h3>
          <ul>
            {favoriteTitles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>

        {/* Toggle Theme Button */}
        <button 
          onClick={toggleTheme} 
          style={{ 
            position: 'fixed', 
            bottom: '20px', 
            left: '20px', 
            padding: '10px', 
            borderRadius: '5px',
            backgroundColor: currentTheme.foreground, 
            color: currentTheme.background 
          }}>
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
};
