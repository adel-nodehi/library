import BookItem from "./BookItem";

function BooksList({ books, isLoading, numFound }) {
  return (
    <div className="books__container">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
