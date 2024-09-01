import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { server } from "../helper/server";
import { isArraysEqual } from "../helper/isArraysEqual";

const dbServer = server("http://localhost:8000/savedBooks");

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [query, setQuery] = useState("the+lord+of+the+rings");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const numFound = useRef(0);
  const [savedBooks, setSavedBooks] = useState([]);
  const savedBooksId = useMemo(
    () => savedBooks.map((book) => book.id),
    [savedBooks]
  );
  const ableToFetch = useRef(true);

  function handleBookMark(id) {
    ableToFetch.current = false;

    // toggle bookmark on book state
    setBooks((curBooks) =>
      curBooks.map((book) => {
        if (book.id !== id) return book;

        const newBook = {
          ...book,
          isBookMarked: !book.isBookMarked,
        };

        if (newBook.isBookMarked) {
          dbServer.addData(newBook);

          setSavedBooks((curBooks) => [...curBooks, newBook]);
        }
        if (!newBook.isBookMarked) {
          dbServer.deleteItem(book.id);

          setSavedBooks((curBooks) =>
            curBooks.filter((book) => book.id !== newBook.id)
          );
        }

        return newBook;
      })
    );
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
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://openlibrary.org/search.json?title=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("fetch error");

          const data = await res.json();

          numFound.current = data.numFound;

          const newBooks = data.docs.map((book) => {
            const id = book.key.replaceAll("/", ".");

            return {
              id,
              title: book.title,
              author: book.author_name,
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
  useEffect(function () {
    async function getSavedBooks() {
      const data = await dbServer.getData();

      // if (isArraysEqual(data, savedBooks)) return;

      setSavedBooks(data);
    }

    getSavedBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        onSearch: handleSearch,
        numFound: numFound.current,
        onBookMark: handleBookMark,
        savedBooks,
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
