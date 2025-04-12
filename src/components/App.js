import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

// =======================================
// ORIGINAL CODE
// =======================================

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    // alert("Are you sure you want to delete all items?");
    const confirm = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onToggleItems={handleToogleItems}
        onClearList={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
