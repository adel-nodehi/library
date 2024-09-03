import BookItem from "./BookItem";
import Loading from "./Loading";
import Message from "./Message";

function BooksList({
  books,
  isLoading = false,
  numFound = 0,
  fallbackMessage = "nothig to show",
  query = "",
}) {
  if (isLoading) return <Loading />;

  if (numFound === 0 && query !== "")
    return <Message>{fallbackMessage}</Message>;

  return (
    <div className="books__container">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
