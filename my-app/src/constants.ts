import { Label, GroceryItem } from "./types";

// Existing dummy notes list (no changes here)
export const dummyNotesList = [
    {
        id: 1,
        title: "test note 1 title",
        content: "test note 1 content",
        label: Label.other,
        favorite: false,
    },
    {
        id: 2,
        title: "test note 2 title",
        content: "test note 2 content",
        label: Label.personal,
        favorite: false,
    },
    {
        id: 3,
        title: "test note 3 title",
        content: "test note 3 content",
        label: Label.personal,
        favorite: false,
    },
    {
        id: 4,
        title: "test note 4 title",
        content: "test note 4 content",
        label: Label.personal,
        favorite: false,
    },
    {
        id: 5,
        title: "test note 5 title",
        content: "test note 5 content",
        label: Label.personal,
        favorite: false,
    },
];

// Define the dummyGroceryList
export const dummyGroceryList: GroceryItem[] = [
    { name: "Apples", isPurchased: false },
    { name: "Bread", isPurchased: true },
    { name: "Ramen", isPurchased: false },
    { name: "Ube ice cream", isPurchased: false }
];
