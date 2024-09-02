import BooksList from "../components/BooksList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import { useBooks } from "../contexts/BooksContext";

function SavedPage() {
  const { savedBooks } = useBooks();
  console.log(savedBooks);
  return (
    <div>
      <Header />

      <Title className="saved__title">Saved books:</Title>

      <BooksList books={savedBooks} />

      <Footer />
    </div>
  );
}

export default SavedPage;
