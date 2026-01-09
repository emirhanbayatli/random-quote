import { Quote } from "./types";
import { db, collections } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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

export async function addQuote(
  authorInput: string,
  quoteInput: string,
  userID: string,
) {
  try {
    const trimmedAuthor = authorInput.trim();
    const trimmedQuote = quoteInput.trim();
    if (!trimmedAuthor || !trimmedQuote) {
      return {
        success: false,
        message: "Quote and Author fields cannot be empty.",
      };
    }
    if (trimmedAuthor.length < 2 || trimmedAuthor.length > 200) {
      return {
        success: false,
        message: "Quote must be between 2 and 200 characters.",
      };
    }

    if (trimmedQuote.length < 2 || trimmedQuote.length > 200) {
      return {
        success: false,
        message: "Quote must be between 2 and 200 characters.",
      };
    }
    await addDoc(collection(db, "quotes"), {
      author: trimmedAuthor,
      quote: trimmedQuote,
      likedBy: [],
      dislikedBy: [],
      createdBy: userID,
    });

    return { success: true, message: "Quote added successfully!" };
  } catch (error) {
    console.log(error + "Quote added unsuccessfully!");
    return { success: false, message: "Quote added unsuccessfully!" };
  }
}

export async function deleteQuote(id: string, userID: string) {
  const quoteRef = doc(db, "quotes", id);
  const docSnap = await getDoc(quoteRef);
  const createdBy = docSnap.data()?.createdBy;

  if (createdBy !== userID) {
    return {
      success: false,
      message: "Quote deleted unsuccessfully! Invalid user id.",
    };
  }
  try {
    await deleteDoc(doc(db, "quotes", id));
    return { success: true, message: "Quote deleted successfully!" };
  } catch (error) {
    console.error("Quote deleted unsuccessfully! ", error);
    return { success: false, message: "Quote deleted unsuccessfully!" };
  }
}

export async function updateQuote(
  id: string,
  userID: string,
  newAuthor: string,
  newQuote: string,
) {
  const trimmedAuthor = newAuthor.trim();
  const trimmedQuote = newQuote.trim();
  if (!trimmedAuthor || !trimmedQuote) {
    return {
      success: false,
      message: "Quote and Author fields cannot be empty.",
    };
  }

  if (trimmedAuthor.length < 2 || trimmedAuthor.length > 200) {
    return {
      success: false,
      message: "Quote must be between 2 and 200 characters.",
    };
  }

  if (trimmedQuote.length < 2 || trimmedQuote.length > 200) {
    return {
      success: false,
      message: "Quote must be between 2 and 200 characters.",
    };
  }
  const quoteRef = doc(db, "quotes", id);
  const docSnap = await getDoc(quoteRef);

  const createdBy = docSnap.data()?.createdBy;

  if (createdBy !== userID) {
    return {
      success: false,
      message: "Quote updated unsuccessfully! Invalid user id.",
    };
  }

  try {
    await updateDoc(quoteRef, {
      author: trimmedAuthor,
      quote: trimmedQuote,
    });
    return { success: true, message: "Quote updated successfully!" };
  } catch (error) {
    return { success: false, message: "Quote updated unsuccessfully!" };
  }
}

export async function toggleLike(quoteId: string, userId: string) {
  try {
    const ref = doc(db, "quotes", quoteId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return { success: false, message: "Quote not found." };
    }

    const data = snap.data();
    let likedBy = data.likedBy || [];
    let dislikedBy = data.dislikedBy || [];

    const hasLiked = likedBy.includes(userId);
    const hasDisliked = dislikedBy.includes(userId);

    if (hasDisliked) {
      dislikedBy = dislikedBy.filter((id: string) => id !== userId);
    }

    if (hasLiked) {
      likedBy = likedBy.filter((id: string) => id !== userId);
    } else {
      likedBy = [...likedBy, userId];
    }

    await updateDoc(ref, { likedBy, dislikedBy });

    return {
      success: true,
      message: hasLiked ? "Like removed." : "Liked successfully.",
    };
  } catch (error) {
    return { success: false, message: "Like action failed." };
  }
}

export async function toggleDislike(quoteId: string, userId: string) {
  try {
    const ref = doc(db, "quotes", quoteId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return { success: false, message: "Quote not found." };
    }

    const data = snap.data();
    let likedBy = data.likedBy || [];
    let dislikedBy = data.dislikedBy || [];

    const hasLiked = likedBy.includes(userId);
    const hasDisliked = dislikedBy.includes(userId);

    if (hasLiked) {
      likedBy = likedBy.filter((id: string) => id !== userId);
    }

    if (hasDisliked) {
      dislikedBy = dislikedBy.filter((id: string) => id !== userId);
    } else {
      dislikedBy = [...dislikedBy, userId];
    }

    await updateDoc(ref, { likedBy, dislikedBy });

    return {
      success: true,
      message: hasDisliked ? "Dislike removed." : "Disliked successfully.",
    };
  } catch (error) {
    return { success: false, message: "Dislike action failed." };
  }
}
