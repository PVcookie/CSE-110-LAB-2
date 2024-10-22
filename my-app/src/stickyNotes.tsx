import './App.css';
import { Label, Note } from "./types"; // Import the Label and Note types
import { dummyNotesList } from "./constants"; // Import dummy notes list
import React, { useState, useEffect, useContext } from 'react'; // Import necessary hooks
import { ThemeContext, themes } from './themeContext'; // Import ThemeContext

// Sticky Notes component
export const StickyNotes = () => {
  // State for notes and favorite note titles
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]); 

  // Initial empty note state
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false, 
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote); // For note creation/editing
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [currentTheme, setCurrentTheme] = useState(themes.light); // Initialize theme state with light theme

  // Function to toggle theme between light and dark
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  // Handle creating or editing a note
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

  // Handle deleting a note
  const handleDelete = (id: number) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  // Handle toggling the favorite status of a note
  const handleFavorite = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  // Handle editing a note
  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setCreateNote(noteToEdit); // Pre-fill form with selected note
      setIsEditing(true); // Set editing mode
    }
  };

  // Use useEffect to update the favorite notes list whenever notes change
  useEffect(() => {
    const favoriteTitlesList = notes
      .filter(note => note.favorite) // Filter favorite notes
      .map(note => note.title); // Get their titles

    setFavoriteTitles(favoriteTitlesList); // Update favorite titles state
    console.log("Favorite Note Titles: ", favoriteTitlesList); // Log the favorite titles list
  }, [notes]); // Effect runs whenever `notes` changes

  return (
    <ThemeContext.Provider value={currentTheme}> {/* Wrap the content with ThemeContext.Provider */}
      <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.foreground, minHeight: '100vh', padding: '20px' }}>
        {/* Form for creating or editing a note */}
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
