import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Button } from "../../components/Button/index";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { QuoteCard } from "../../components/QuoteCard";
import { useQuotesContext } from "../../QuotesContextProvider";

export const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [quoteInput, setQuoteInput] = useState<string>("");
  const [authorInput, setAuthorInput] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const [editQuoteId, setEditQuoteId] = useState<string | null>(null);
  const [editQuoteInput, setEditQuoteInput] = useState("");
  const [editAuthorInput, setEditAuthorInput] = useState("");
  const [addNewQuote, setaddNewQuote] = useState<boolean>(false);

  const quotes = useQuotesContext();
  const userEmail = authContext?.user?.email?.toUpperCase().split("@")[0];
  const userID = authContext?.user?.uid;
  const isMessagePositive = message?.includes("unsuccessfully") == false;

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  async function addQuote(e: React.FormEvent) {
    try {
      e.preventDefault();
      await addDoc(collection(db, "quotes"), {
        author: authorInput,
        quote: quoteInput,
        likedBy: 0,
        whoAddQuote: userID,
      });

      setMessage("Quote added successfully!");
      setQuoteInput("");
      setAuthorInput("");
    } catch (error) {
      setMessage("Quote added unsuccessfully!");
      console.log(error + "Quote added unsuccessfully!");
    }
  }

  async function deleteQuote(id: string) {
    try {
      await deleteDoc(doc(db, "quotes", id));
      setMessage("Quote deleted successfully!");
    } catch (error) {
      setMessage("Quote deleted unsuccessfully!!");
      console.error("Quote deleted unsuccessfully! ", error);
    }
  }

  async function updateQuote(id: string, newAuthor: string, newQuote: string) {
    const quoteRef = doc(db, "quotes", id);
    try {
      await updateDoc(quoteRef, {
        author: newAuthor,
        quote: newQuote,
      });

      setMessage("Quote updated successfully!!");
    } catch (error) {
      setMessage("Quote updated unsuccessfully!!");
    }
  }
  console.log(editQuoteId + "editQuoteId");

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {userEmail}!</h1>

      {addNewQuote === true ? (
        <form className="space-y-4 mb-6" onSubmit={addQuote}>
          <input
            type="text"
            placeholder="Quote"
            className="w-full p-2 border rounded"
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="w-full p-2 border rounded"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            required
          />
          <Button label="Save" type="submit" />
          <Button label="Cancel" handleOnClick={() => setaddNewQuote(false)} />
        </form>
      ) : (
        <Button label="Add Quote" handleOnClick={() => setaddNewQuote(true)} />
      )}

      <section>
        {quotes?.map((quote) =>
          quote.whoAddQuote === userID ? (
            <div key={quote.id} className="mb-4">
              {editQuoteId === quote.id ? (
                <form
                  className="space-y-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await updateQuote(
                      quote.id,
                      editAuthorInput,
                      editQuoteInput,
                    );
                    setEditQuoteId(null);
                  }}
                >
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editQuoteInput}
                    onChange={(e) => setEditQuoteInput(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editAuthorInput}
                    onChange={(e) => setEditAuthorInput(e.target.value)}
                    required
                  />
                  <Button label="Save" type="submit" />
                  <Button
                    label="Cancel"
                    handleOnClick={() => setEditQuoteId(null)}
                  />
                </form>
              ) : (
                <div>
                  <QuoteCard
                    quote={quote.quote}
                    author={quote.author}
                    likedBy={quote.likedBy}
                  />
                  <Button
                    label="Delete"
                    handleOnClick={() => deleteQuote(quote.id)}
                  />
                  <Button
                    label="Edit"
                    handleOnClick={() => {
                      setEditQuoteId(quote.id);
                      setEditQuoteInput(quote.quote);
                      setEditAuthorInput(quote.author);
                    }}
                  />
                </div>
              )}
            </div>
          ) : null,
        )}
      </section>
      {message && (
        <p
          className={`text-sm mt-2 ${
            isMessagePositive
              ? "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center"
              : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center"
          }`}
        >
          {message}
        </p>
      )}
    </main>
  );
};
