import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";
import { ReactNode } from "react";
import { Quote } from "./types";
import { getQuotes } from "./utils";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./firebase";

export const QuotesContext = createContext<Quote[] | undefined>(undefined);

export const QuotesDispatchContext = createContext<
  Dispatch<SetQuotesAction | AddFavoriteQuoteAction> | undefined
>(undefined);

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({
  children,
}: QuotesContextProviderProps) => {
  const [quotes, dispatch] = useReducer(quotesReducer, []);

  useEffect(() => {
    getQuotes()
      .then((data) => {
        dispatch({ type: QuotesActionType.GET_QUOTES, payload: data });
      })
      .catch((error) => {
        console.error("An error occured when fetching all quotes", error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "quotes"), (snapshot) => {
      const quotesData = snapshot.docs.map((doc) => {
        const { id, ...data } = doc.data() as Quote & { id?: string };
        return { id: doc.id, ...data };
      });

      dispatch({ type: QuotesActionType.SET_QUOTES, payload: quotesData });
    });

    return () => unsubscribe();
  }, []);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export enum QuotesActionType {
  GET_QUOTES = "GET_QUOTES",
  SET_QUOTES = "SET_QUOTES",

  ADD_NEW_QUOTE = "ADD_NEW_QUOTE",
  UPDATE_QUOTE = "UPDATE_QUOTE",
  DELETE_QUOTE = "DELETE_QUOTE",
  ADD_FAVORITE_QUOTE = "ADD_FAVORITE_QUOTE",
}

type GetQuotesAction = {
  type: QuotesActionType.GET_QUOTES;
  payload: Quote[];
};

type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};

type AddFavoriteQuoteAction = {
  type: QuotesActionType.ADD_FAVORITE_QUOTE;
  payload: {
    quote: string;
  };
};

function quotesReducer(
  state: Quote[],
  action: SetQuotesAction | AddFavoriteQuoteAction | GetQuotesAction,
): Quote[] {
  switch (action.type) {
    case QuotesActionType.GET_QUOTES:

    case QuotesActionType.SET_QUOTES:
      return action.payload;

    case QuotesActionType.ADD_FAVORITE_QUOTE:
      console.log("Triggered favorite quote action");
      const updateQuotes = state.map((prevQuote: Quote) => {
        if (prevQuote.quote === action.payload.quote) {
          return { ...prevQuote, isFavorite: !prevQuote.isFavorite };
        } else {
          return prevQuote;
        }
      });

      return updateQuotes;

    default:
      console.error(
        `Unsupported Quotes Action Type used. Supported types: ${QuotesActionType.SET_QUOTES}`,
      );
      return state;
  }
}

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
