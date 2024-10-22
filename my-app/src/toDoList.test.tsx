import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList"; // Import your ToDoList component
import "@testing-library/jest-dom";

describe("ToDoList Component", () => {
    test("Read: All items in the list are displayed", () => {
      render(<ToDoList />);
  
      // Assert that the items from the dummy data are displayed
      expect(screen.getByText("Apples")).toBeInTheDocument();
      expect(screen.getByText("Bread")).toBeInTheDocument();
      expect(screen.getByText("Ramen")).toBeInTheDocument();
      expect(screen.getByText("Ube ice cream")).toBeInTheDocument();
    });

    test("Item count matches number of checked items", () => {
        render(<ToDoList />);
    
        // Simulate checking an item
        const applesCheckbox = screen.getByLabelText("Apples");
        fireEvent.click(applesCheckbox); // Check apples
    
        // Assert that the remaining items count is updated
        const itemsRemaining = screen.getByText(/Items remaining:/i);
        expect(itemsRemaining).toHaveTextContent("Items remaining: 3");
      });
    
      test("Delete item works", () => {
        render(<ToDoList />);
    
        const ramenCheckbox = screen.getByLabelText("Ramen");
        fireEvent.click(ramenCheckbox); // Check Ramen
    
        // Assert that milk is checked
        expect(ramenCheckbox).toBeChecked();
      });
    });