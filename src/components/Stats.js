export default function Stats({ items }) {
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
