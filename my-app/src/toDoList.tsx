import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types"; 
import { dummyGroceryList } from "./constants"; 
import { useParams } from "react-router-dom";


export function ToDoList() {
  const [items, setItems] = useState<GroceryItem[]>(dummyGroceryList); 
  const [numRemainingItems, setNumRemainingItems] = useState(
    items.filter(item => !item.isPurchased).length 
  );
  const { name } = useParams();

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox = e.target;
    const itemName = checkbox.name;

    const itemIndex = items.findIndex((item) => item.name === itemName);
    items[itemIndex] = { name: itemName, isPurchased: checkbox.checked };

    const uncheckedItems = items.filter((item) => !item.isPurchased); // Filter out unchecked items
    const checkedItems = items.filter((item) => item.isPurchased);

    const newItems = uncheckedItems.concat(checkedItems);
    setItems(newItems);

    // Update numRemainingItems based on the number of unchecked items
    setNumRemainingItems(uncheckedItems.length);
  }

  return (
    <div className="App">
      <div className="App-body">
      <h1>{name}'s To Do List</h1>
        Items remaining: {numRemainingItems}
        <form action=".">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  );
}

// Helper function to render each list item
function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
  return (
    <div key={item.name}>
      <input
        type="checkbox"
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
      />
      {item.name}
    </div>
  );
}
