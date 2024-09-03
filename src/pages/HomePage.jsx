import Header from "../components/Header";
import Hero from "../components/Hero";
import BooksList from "../components/BooksList";
import { useBooks } from "../contexts/BooksContext";
import Footer from "../components/Footer";

function HomePage() {
  const { books, isLoading, numFound } = useBooks();
  console.log(isLoading);

  return (
    <main className="main">
      <Header />
      <Hero />
      <BooksList books={books} isLoading={isLoading} numFound={numFound} />
      <Footer />
    </main>
  );
}

export default HomePage;
