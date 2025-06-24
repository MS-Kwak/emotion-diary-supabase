export default function Header({ title, leftChild, rightChild }) {
  return (
    <header className="flex items-center py-4 border-b-1 border-gray-300">
      <div className="flex w-1/4 justify-start">{leftChild}</div>
      <div className="flex w-1/2 text-2xl justify-center">
        {title}
      </div>
      <div className="flex w-1/4 justify-end">{rightChild}</div>
    </header>
  );
}
