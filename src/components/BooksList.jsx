import BookItem from "./BookItem";

function BooksList() {
  return (
    <div className="books__container">
      {Array.from({ length: 10 }, (_, i) => i).map((item) => (
        <BookItem key={item} />
      ))}
    </div>
  );
}

export default BooksList;
