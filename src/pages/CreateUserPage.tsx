import { useState, useContext, useEffect } from "react";
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
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);
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
          setCurrentPage(Page.home);
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
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto">
            {message}
          </p>
        )}

        <Button type="submit" label="Create Account" className="py-3" />
      </form>
      <Button
        className="cursor-pointer mt-2"
        handleOnClick={() => setCurrentPage(Page.SignInUserPage)}
        label="Already have an account? Sign in"
      />
    </main>
  );
};
