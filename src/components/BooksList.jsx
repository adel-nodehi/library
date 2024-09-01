import BookItem from "./BookItem";
import Loading from "./Loading";

function BooksList({ books, isLoading = false, numFound }) {
  return (
    <div className="books__container">
      {isLoading ? (
        <Loading />
      ) : (
        books.map((book) => <BookItem key={book.id} book={book} />)
      )}
    </div>
  );
}

export default BooksList;
