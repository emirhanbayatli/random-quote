import { NavbarProps } from "../../types";
export function Navbar({ setCurrentPage, pages }: NavbarProps) {
  const items = [
    { id: 1, name: "Home", onClick: () => setCurrentPage(pages.home) },
    { id: 2, name: "Profile", onClick: () => setCurrentPage(pages.profile) },
    {
      id: 3,
      name: "Sign In",
      onClick: () => setCurrentPage(pages.SignInUserPage),
    },
    {
      id: 4,
      name: "Posts Page",
      onClick: () => setCurrentPage(pages.postsPage),
    },
  ];
  return (
    <nav className="bg-slate-100 text-slate-900 p-4 ">
      <ul className="max-w-screen-md mx-auto flex gap-4 justify-between">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className="font-semibold text-lg text-slate-500 hover:text-slate-900 transition-colors duration-100 ease-in-out"
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
