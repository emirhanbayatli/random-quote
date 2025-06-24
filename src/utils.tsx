import { Quote } from "./types";
import { db, collections } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// database e veriyi yukleyen function.

export const addQuotesToDb = (quotes: Quote[]) => {
  quotes.map(async ({ quote, author, likedBy, id }) => {
    try {
      await setDoc(doc(db, collections.quotes, id), {
        quote,
        author,
        likedBy,
      });
    } catch (error) {
      console.log(error + "An error occured when uploading quotes");
    }
  });
};

// addQuotesToDb(quotes);

// database den tum veriyi alan function .

export function getQuotes(): Promise<Quote[]> {
  return getDocs(collection(db, collections.quotes))
    .then((querySnapshot) => {
      const quotesFromDB: Quote[] = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Quote;
      });
      return quotesFromDB;
    })
    .catch((error) => {
      console.error("An error occured when fetching all quotes", error);
      return [];
    });
}
