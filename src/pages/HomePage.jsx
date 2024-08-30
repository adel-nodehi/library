import { useBooks } from "../contexts/BooksContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BooksList from "../components/BooksList";

function HomePage() {
  const state = useBooks();
  console.log(state);

  return (
    <div>
      <Header />
      <Hero />
      <BooksList />
    </div>
  );
}

export default HomePage;
