import { createContext, useContext, useEffect, useRef, useState } from "react";
import { server } from "../helper/server";

const dbServer = server("http://localhost:8000/savedBooks");

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const numFound = useRef(0);
  const [savedBooks, setSavedBooks] = useState([]);
  const savedBooksId = savedBooks.map((book) => book.id);
  console.log(savedBooks, books);

  function handleBookMark(id) {
    // toggle bookmark on book state
    setBooks((curBooks) =>
      curBooks.map((book) => {
        if (book.id !== id) return book;

        book.isBookMarked
          ? dbServer.deleteItem(book.id)
          : dbServer.addData(book);

        return {
          ...book,
          isBookMarked: !book.isBookMarked,
        };
      })
    );
  }

  // fetch books from api
  useEffect(function () {
    async function fetchBooks() {
      try {
        setIsLoading(true);

        const res = await fetch(
          "https://openlibrary.org/search.json?title=the+lord+of+the+rings"
        );

        if (!res.ok) throw new Error("fetch error");

        const data = await res.json();

        numFound.current = data.numFound;

        setBooks(() =>
          data.docs.map((book) => {
            const id = book.key.replaceAll("/", ".");

            return {
              id,
              title: book.title,
              author: book.author_name,
              coverId: book.cover_i,
              publishYear: book.first_publish_year,
              isBookMarked: savedBooksId.includes(id),
            };
          })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // fetch saved books from json-server
  useEffect(function () {
    async function getSavedBooks() {
      const data = await dbServer.getData();
      setSavedBooks(data);
    }

    getSavedBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        setQuery,
        numFound: numFound.current,
        onBookMark: handleBookMark,
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
