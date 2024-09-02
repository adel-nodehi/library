import { useState } from "react";
import { useBooks } from "../contexts/BooksContext";

function Hero() {
  const { onSearch } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSearch(searchQuery);
  }

  function handleChange(e) {
    if (e.target.value === "") onSearch("the lord of the rings");

    setSearchQuery(e.target.value);
  }

  return (
    <div className="hero__container">
      <div className="hero">
        <h1>find your book of choice.</h1>
        <p>
          Lose yourself in a world of endless stories. Discover your next
          favorite read, personalized just for you.
        </p>

        <form className="search-box" autoComplete="off" onSubmit={handleSubmit}>
          <input
            value={searchQuery}
            onChange={handleChange}
            type="search"
            id="search"
            placeholder="Search"
            required
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
