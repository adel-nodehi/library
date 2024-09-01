import BooksList from "../components/BooksList";
import Header from "../components/Header";
import { useBooks } from "../contexts/BooksContext";

function SavedPage() {
  const { savedBooks } = useBooks();
  console.log(savedBooks);
  return (
    <div>
      <Header />
      <BooksList books={savedBooks} />
    </div>
  );
}

export default SavedPage;
