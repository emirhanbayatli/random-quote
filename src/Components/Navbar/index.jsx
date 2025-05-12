export function Navbar({ setCurrentPage, pages }) {
  const items = [
    { id: 1, name: "Home", onClick: () => setCurrentPage(pages.home) },
    { id: 2, name: "Profile", onClick: () => setCurrentPage(pages.profile) },
    { id: 5, name: "Login" },
  ];
  return (
    <nav className="bg-slate-100 text-slate-900 p-4 ">
      <ul className="flex gap-4 justify-evenly">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className="text-slate-500 hover:text-slate-900 transition-colors duration-100 ease-in-out"
              onClick={item.onClick}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
