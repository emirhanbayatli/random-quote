import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Button } from "../components/Button";
import { Page } from "../App";

export const CreateUserPage = ({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (password && password.length < 6) {
      setMessage("Password should be at least 6 characters long.");
      return;
    }

    if (authContext && email && password) {
      authContext
        .createAccount(email, password)
        .then((res: any) => {
          setMessage("Account created successfully.");
        })
        .catch((error) => {
          console.log(error);
          setMessage("Error occured when creating an account.");
        });
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <p className="text-center text-sm text-red-600">{message}</p>
        )}

        <Button type="submit" label="Create Account" className="py-3" />
      </form>
      <a
        className="cursor-pointer"
        onClick={() => setCurrentPage(Page.SignInUserPage)}
      >
        Already have an account? Sign in
      </a>
    </main>
  );
};
