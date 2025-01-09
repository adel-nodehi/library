import Header from "../components/Header";
import Hero from "../components/Hero";
import BooksList from "../components/BooksList";
import { useBooks } from "../contexts/BooksContext";
import Footer from "../components/Footer";

function HomePage() {
  const { books, isLoading, numFound, query } = useBooks();

  return (
    <main className="main">
      <Header />
      <Hero />
      <BooksList
        books={books}
        isLoading={isLoading}
        numFound={numFound}
        fallbackMessage={`No search result for (${query.split("+").join(" ")})`}
        query={query}
      />
      <Footer />
    </main>
  );
}

export default HomePage;
