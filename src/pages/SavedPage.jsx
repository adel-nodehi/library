import { useNavigate } from "react-router-dom";

import BooksList from "../components/BooksList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";
import { useBooks } from "../contexts/BooksContext";
import { useAuth } from "../contexts/AuthContext";

function SavedPage() {
  const { isLoggedIn } = useAuth();
  const { savedBooks } = useBooks();
  const navigate = useNavigate();

  if (!isLoggedIn) navigate("/");

  return (
    <main className="main">
      <Header />

      <Title className="saved__title">Saved books:</Title>

      <BooksList
        books={savedBooks}
        numFound={savedBooks.length}
        fallbackMessage="You have not saved a book yet."
      />

      <Footer />
    </main>
  );
}

export default SavedPage;
