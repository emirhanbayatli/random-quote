import { Page } from "../App";
import { useState, useContext, useEffect } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../AuthContext";

export function SignInUserPage({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) {
  const logIn = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    if (email && password) {
      logIn
        ?.logIn(email, password)
        .then(() => {
          setMessage("Sign in successful.");
          setCurrentPage(Page.home);
        })
        .catch((error) => {
          console.error("Sign in error:", error);
          setMessage("Sign in failed. Please check your email and password.");
        });
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
        Sign In
      </h1>

      <form onSubmit={handleSignIn} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="pass"
            className="text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="pass"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {message && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto">
            {message}
          </p>
        )}

        <Button type="submit" label="Sign In" className="py-3" />
      </form>

      <Button
        className="cursor-pointer mt-2"
        handleOnClick={() => setCurrentPage(Page.createUserPage)}
        label=" Don't have an account?"
      />
    </main>
  );
}
