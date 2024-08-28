import { useBooks } from "../assets/contexts/BooksContext";
import Header from "../components/Header";
import Hero from "../components/Hero";

function HomePage() {
  const state = useBooks();
  console.log(state);

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default HomePage;
