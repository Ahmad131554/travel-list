import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

// =======================================
// TEST FOR REMOVING ITEMS
// =======================================

// export default function App() {
//   const [items, setItems] = useState([]);
//   function handleAddItems(item) {
//     setItems((items) => [...items, item]);
//   }

//   function handleRemoveItems(id) {
//     setItems((items) => items.filter((item) => id !== item.id));
//   }
//   return (
//     <div className="app">
//       <Logo />
//       <Form onAddItems={handleAddItems} />
//       <PackingList items={items} onRemoveItems={handleRemoveItems} />
//       <Stats />
//     </div>
//   );
// }

// function Logo() {
//   return <h1>🌴 Far Away 💼</h1>;
// }

// function Form({ onAddItems }) {
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   function handleSubmit(e) {
//     e.preventDefault();

//     const newItem = { description, quantity, packed: false, id: Date.now() };

//     onAddItems(newItem);

//     setDescription("");
//     setQuantity(1);
//   }
//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your 😍 trip?</h3>
//       <select
//         value={quantity}
//         onChange={(e) => setQuantity(Number(e.target.value))}
//       >
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//           <option value={num} key={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => {
//           setDescription(e.target.value);
//         }}
//       />
//       <button>Add</button>
//     </form>
//   );
// }

// function PackingList({ items, onRemoveItems }) {
//   return (
//     <div className="list">
//       <ul>
//         {items.map((item) => (
//           <Item onRemoveItems={onRemoveItems} item={item} key={item.id} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function Item({ item, onRemoveItems }) {
//   return (
//     <li>
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <button onClick={() => onRemoveItems(item.id)}>❌</button>
//     </li>
//   );
// }

// function Stats() {
//   return (
//     <footer className="stats">
//       <em>You have X itmes on your list and you have packed x(x%)</em>
//     </footer>
//   );
// }

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onToggleItems={handleToogleItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemoveItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItems={onRemoveItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="input">Sort by Input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onRemoveItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items into your list🚀</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got Everything.Ready to go🚀"
          : `💼You have ${numItems} itmes on your list and you have packed ${numPacked}(
        ${percentage}%)`}
      </em>
    </footer>
  );
}

// =======================================
// SELF WRITTEN CODE WITH LIFTING STATE
// =======================================
// export default function App() {
//   const [items, setItems] = useState([]);

//   function onAddItem(item) {
//     setItems((items) => [...items, item]);
//   }

//   return (
//     <div className="app">
//       <Logo />
//       <Form onAddItem={onAddItem} />
//       <PackingList items={items} />
//       <Stats />
//     </div>
//   );
// }

// function Logo() {
//   return <h1>🌴Far Away🧳</h1>;
// }

// function Form({ onAddItem }) {
//   const [quantity, setQuantity] = useState(1);
//   const [description, setDescription] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     const newItem = { quantity, description, id: Date.now(), packed: false };
//     console.log(newItem);
//     onAddItem(newItem);
//   }

//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your 😍 trip?</h3>
//       <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
//           <option key={i}>{i}</option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }

// function PackingList({ items }) {
//   return (
//     <div className="list">
//       <ul>
//         {items.map((item) => (
//           <List key={item.id} item={item} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function List({ item }) {
//   return (
//     <li>
//       <span>
//         {item.quantity} {item.description}
//       </span>
//       <button>❌</button>
//     </li>
//   );
// }

// function Stats() {
//   return (
//     <footer className="stats">
//       Start adding some items to your packing list 🚀
//     </footer>
//   );
// }

// =======================================
// SELF WRITTEN CODE
// =======================================

// function Logo() {
//   return <h1>🌴Far Away💼</h1>;
// }

// function Form() {
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   function handleSubmit(e) {
//     e.preventDefault();
//     const data = { description, quantity, packed: false, id: Date.now() };
//     console.log(data);
//     setQuantity(1);
//     setDescription("");
//   }
//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your 😍 trip?</h3>
//       <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
//           <option key={i}>{i}</option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }

// function PackingList() {
//   return (
//     <div className="list">
//       <ul>
//         {initialItems.map((item) => (
//           <List item={item} key={item.id} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function List({ item }) {
//   return (
//     <li>
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <button>❌</button>
//     </li>
//   );
// }

// function Stats() {
//   return (
//     <footer className="stats">
//       <em>💼 You have 1 items on your list, and you already packed 0 (0%)</em>
//     </footer>
//   );
// }
