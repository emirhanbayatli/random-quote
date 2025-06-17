import { Page } from "../App";
import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export function SignInUserPage({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage("Sign in successful.");
        const user = userCredential.user;
        setCurrentPage(Page.home);
      })
      .catch((error) => {
        setMessage("Sign in failed. Please check your email and password. ");
        console.error("Error signing in ben yazdim:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
          <p className="text-center text-sm text-red-600">{message}</p>
        )}

        <Button type="submit" label="Sign In" className="py-3" />
      </form>
      <a
        onClick={() => setCurrentPage(Page.createUserPage)}
        className="cursor-pointer "
      >
        Don't have an account?
      </a>
    </main>
  );
}
