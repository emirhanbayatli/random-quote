import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Button } from "../../components/Button/index";
import { QuoteCard } from "../../components/QuoteCard";
import { useQuotesContext } from "../../QuotesContextProvider";
import { addQuote, deleteQuote, updateQuote } from "../../utils";

export const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const [quoteInput, setQuoteInput] = useState<string>("");
  const [authorInput, setAuthorInput] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editQuoteId, setEditQuoteId] = useState<string | null>(null);
  const [editQuoteInput, setEditQuoteInput] = useState("");
  const [editAuthorInput, setEditAuthorInput] = useState("");
  const [addNewQuote, setaddNewQuote] = useState<boolean>(false);

  const quotes = useQuotesContext();
  const userEmail = authContext?.user?.email?.toUpperCase().split("@")[0];
  const userID = authContext?.user?.uid;

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message, error]);

  async function handleAddQuote(e: React.FormEvent) {
    e.preventDefault();
    const result = await addQuote(authorInput, quoteInput, userID as string);
    if (result.success) {
      setMessage(result.message);
      setQuoteInput("");
      setAuthorInput("");
    } else {
      setError(result.message);
    }
  }

  async function handleDeleteQuote(id: string) {
    const result = await deleteQuote(id, userID as string);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  }
  async function handleUpdateQuote(
    id: string,
    newAuthor: string,
    newQuote: string,
  ) {
    const result = await updateQuote(id, userID as string, newAuthor, newQuote);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {userEmail}!</h1>

      {addNewQuote === true ? (
        <form
          className="space-y-4 mb-6"
          onSubmit={(e) => handleAddQuote(e)}
          noValidate
        >
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
          quote.createdBy === userID ? (
            <div key={quote.id} className="mb-4">
              {editQuoteId === quote.id ? (
                <form
                  className="space-y-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await handleUpdateQuote(
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
                    likedBy={quote.likedBy.length}
                    dislikedBy={quote.dislikedBy.length}
                  />
                  <Button
                    label="Delete"
                    handleOnClick={() => handleDeleteQuote(quote.id)}
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
          className={`text-sm mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center`}
        >
          {message}
        </p>
      )}
      {error && (
        <p
          className={
            "text-sm mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-3 max-w-lg mx-auto text-center"
          }
        >
          {error}
        </p>
      )}
    </main>
  );
};
