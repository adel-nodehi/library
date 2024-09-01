import Header from "../components/Header";
import Hero from "../components/Hero";
import BooksList from "../components/BooksList";
import { useBooks } from "../contexts/BooksContext";

function HomePage() {
  const { books, isLoading, numFound } = useBooks();

  return (
    <div>
      <Header />
      <Hero />
      <BooksList books={books} isLoading={isLoading} numFound={numFound} />
    </div>
  );
}

export default HomePage;
