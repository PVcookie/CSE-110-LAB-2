import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("Check to see if the notes are updated", () => {
    render(<StickyNotes />);

    // Create a note
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Initial Title" } });
    fireEvent.change(contentInput, { target: { value: "Initial Content" } });
    fireEvent.click(createButton);

    // edit the note
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentInput, { target: { value: "Updated Content" } });
    fireEvent.click(createButton); // save the updated note

    // Assert that the note is updated
    expect(screen.getByText("Updated Title")).toBeInTheDocument();
    expect(screen.getByText("Updated Content")).toBeInTheDocument();
  });

  test("Delete: Note is deleted from the page", () => {
    render(<StickyNotes />);

    // Create a note
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Delete Note Title" } });
    fireEvent.change(contentInput, { target: { value: "Delete Note Content" } });
    fireEvent.click(createButton);

    // delete the note
    const deleteButtons = screen.getAllByText("x");
    fireEvent.click(deleteButtons[0]);

    // Assert that the note is deleted
    expect(screen.queryByText("Delete Note Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete Note Content")).not.toBeInTheDocument();
  });
});