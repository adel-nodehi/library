import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { server } from "../helper/server";
import { useAuth } from "./AuthContext";

const savedBooksServer = server("http://localhost:8000/savedBooks");

const BooksContext = createContext();

function BooksProvider({ children }) {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const numFound = books.reduce((acc, cur) => (cur.coverId ? acc + 1 : acc), 0);
  const [savedBooks, setSavedBooks] = useState([]);
  const savedBooksId = useMemo(
    () => savedBooks.map((book) => book.id),
    [savedBooks]
  );
  const ableToFetch = useRef(true);

  function handleBookMark(book, userId) {
    ableToFetch.current = false;

    // toggle bookmark on book state
    setBooks((curBooks) =>
      curBooks.map((curBook) => {
        if (curBook.id !== book.id) return curBook;

        const newBook = {
          ...curBook,
          isBookMarked: !curBook.isBookMarked,
        };

        return newBook;
      })
    );

    if (book.isBookMarked) {
      // Delete from json file
      savedBooksServer.deleteItem(book.id);

      // Delete from saved books
      setSavedBooks((curBooks) =>
        curBooks.filter((curBook) => curBook.id !== book.id)
      );
    }
    if (!book.isBookMarked) {
      const newBook = { ...book, isBookMarked: true, userId };

      // Add to json file
      savedBooksServer.addData(newBook);

      // Add to json saved books
      setSavedBooks((curBooks) => [...curBooks, newBook]);
    }
  }

  function handleSearch(searchQuery) {
    if (searchQuery === query) return;

    ableToFetch.current = true;

    const apiSearchQuery = searchQuery.split(" ").join("+");

    if (apiSearchQuery === query) return;

    setQuery(apiSearchQuery);
  }

  // fetch books from api
  useEffect(
    function () {
      const controller = new AbortController();

      if (!ableToFetch.current) return;

      async function fetchBooks() {
        const finalQuery = query ? query : "the+lord+of+the+rings";
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://openlibrary.org/search.json?title=${finalQuery}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("fetch error");

          const data = await res.json();

          const newBooks = data.docs.map((book) => {
            const id = book.key.replaceAll("/", ".");

            return {
              id,
              title: book.title,
              author: book.author_name ?? "unknown",
              coverId: book.cover_i,
              publishYear: book.first_publish_year,
              isBookMarked: savedBooksId.includes(id),
            };
          });

          setBooks(newBooks);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Request aborted");
          } else {
            console.error(err);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchBooks();
      return () => {
        controller.abort();
      };
    },
    [savedBooksId, query, ableToFetch]
  );

  // fetch saved books from json-server
  useEffect(
    function () {
      async function getSavedBooks() {
        const data = await savedBooksServer.getData();

        const userSavedBooks = data.filter(
          (savedBook) => savedBook.userId === user?.id
        );

        setSavedBooks(userSavedBooks);
      }

      getSavedBooks();
    },
    [user?.id]
  );

  useEffect(() => {
    setBooks((curBooks) =>
      curBooks.map((curBook) => {
        const newBook = {
          ...curBook,
          isBookMarked: savedBooksId.includes(curBook.id),
        };

        return newBook;
      })
    );
  }, [savedBooksId]);

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        onSearch: handleSearch,
        numFound,
        onBookMark: handleBookMark,
        savedBooks,
        query,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error("BooksContext was used outside BooksProvider");
  return context;
}

export { BooksProvider, useBooks };
