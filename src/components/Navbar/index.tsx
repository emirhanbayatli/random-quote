export enum Pages {
  Home = "home",
  Profile = "profile",
  Login = "login",
}
interface NavbarProps {
  setCurrentPage: (page: Pages) => void;
  pages: {
    [Pages.Home]: any;
    [Pages.Profile]: any;
    [key: string]: any;
  };
}

export function Navbar({ setCurrentPage, pages }: NavbarProps) {
  const items = [
    { id: 1, name: "Home", onClick: () => setCurrentPage(Pages.Home) },
    { id: 2, name: "Profile", onClick: () => setCurrentPage(Pages.Profile) },
    { id: 3, name: "Login", onClick: () => setCurrentPage(Pages.Login) },
  ];

  return (
    <nav className="bg-slate-100 text-slate-900 p-4 ">
      <ul className="max-w-screen-md mx-auto flex gap-4 justify-start">
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
