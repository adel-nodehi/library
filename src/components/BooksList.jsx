import { useBooks } from "../contexts/BooksContext";
import BookItem from "./BookItem";

function BooksList() {
  const { books, isLoading, numFound } = useBooks();

  return (
    <div className="books__container">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
