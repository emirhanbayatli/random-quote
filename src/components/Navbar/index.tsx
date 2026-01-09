import { AuthContext } from "../../AuthContext";
import { useContext, useState, useEffect } from "react";
interface NavbarProps {
  setCurrentPage: (page: any) => void;
  pages: {
    home: any;
    profile: any;
    [key: string]: any;
  };
}

export function Navbar({ setCurrentPage, pages }: NavbarProps) {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const isLoggedIn = !!authContext?.user;

  const items = [
    {
      id: 1,
      name: "Home",

      onClick: () => {
        if (isLoggedIn) {
          setCurrentPage(pages.home);
        } else {
          setCurrentPage(pages.SignInUserPage);
          setError("First, please sign in.");
        }
      },
    },
    {
      id: 2,
      name: "Profile",
      onClick: () => {
        if (isLoggedIn) {
          setCurrentPage(pages.profile);
        } else {
          setError("You need to sign in first to access your profile.");
          setCurrentPage(pages.SignInUserPage);
        }
      },
    },
    {
      id: 3,
      name: isLoggedIn ? "Sign Out" : "Sign In",
      onClick: () => {
        if (isLoggedIn) {
          authContext?.logOut();
          setCurrentPage(pages.SignInUserPage);
        } else {
          setCurrentPage(pages.SignInUserPage);
        }
      },
    },
    {
      id: 4,
      name: "Posts Page",
      onClick: () => setCurrentPage(pages.postsPage),
    },
  ];

  return (
    <div>
      <nav className="bg-slate-100 text-slate-900 p-4">
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
      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center">
          {error}
        </p>
      )}
    </div>
  );
}
