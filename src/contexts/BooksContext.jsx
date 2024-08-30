import { createContext, useContext, useEffect, useRef, useState } from "react";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const numFound = useRef(0);
  console.log(books);

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
            return {
              id: book.key,
              title: book.title,
              author: book.author_name,
              coverId: book.cover_i,
              publishYear: book.first_publish_year,
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

  return (
    <BooksContext.Provider
      value={{
        books,
        isLoading,
        setQuery,
        numFound: numFound.current,
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
