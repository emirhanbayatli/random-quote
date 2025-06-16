import { createContext, useReducer, useContext, Dispatch } from "react";
import { quotes as intialQuotes } from "./quotes";
import { ReactNode } from "react";
import { Quote } from "./types";

export const QuotesContext = createContext<Quote[] | undefined>(undefined);

export const QuotesDispatchContext = createContext<
  | Dispatch<SetQuotesAction | LikeDislikeQuoteAction | AddFavoriteQuoteAction>
  | undefined
>(undefined);

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({
  children,
}: QuotesContextProviderProps) => {
  // const [quotes, setQuotes] = useState(intialQuotes);
  const [quotes, dispatch] = useReducer(quotesReducer, intialQuotes);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};
export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  LIKE_QUOTE = "LIKE_QUOTE",
  DISLIKE_QUOTE = "DISLIKE_QUOTE",
  ADD_NEW_QUOTE = "ADD_NEW_QUOTE",
  UPDATE_QUOTE = "UPDATE_QUOTE",
  DELETE_QUOTE = "DELETE_QUOTE",
  ADD_FAVORITE_QUOTE = "ADD_FAVORITE_QUOTE",
}

type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};

type LikeDislikeQuoteAction = {
  type: QuotesActionType.DISLIKE_QUOTE | QuotesActionType.LIKE_QUOTE;
  payload: {
    quote: string;
  };
};

type AddFavoriteQuoteAction = {
  type: QuotesActionType.ADD_FAVORITE_QUOTE;
  payload: {
    quote: string;
  };
};

function quotesReducer(
  state: Quote[],
  action: SetQuotesAction | LikeDislikeQuoteAction | AddFavoriteQuoteAction,
): Quote[] {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;

    case QuotesActionType.LIKE_QUOTE:
      console.log("Triggered like quote action");
      const updatedQuotes = state.map((prevQuote: Quote) => {
        if (prevQuote.quote === action.payload.quote) {
          return { ...prevQuote, likedBy: prevQuote.likedBy + 1 };
        } else {
          return prevQuote;
        }
      });

      return updatedQuotes;
    // TODO: ADD Dislike quote action case
    case QuotesActionType.DISLIKE_QUOTE:
      console.log("Triggered dislike quote action");
      const updatedsQuotes = state.map((prevQuote: Quote) => {
        if (prevQuote.quote === action.payload.quote) {
          return { ...prevQuote, likedBy: prevQuote.likedBy - 1 };
        } else {
          return prevQuote;
        }
      });

      return updatedsQuotes;

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
        `Unsupported Quotes Action Type used. Supported types: ${QuotesActionType.SET_QUOTES}, ${QuotesActionType.LIKE_QUOTE}, ${QuotesActionType.DISLIKE_QUOTE}`,
      );
      return state;
  }
}

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
