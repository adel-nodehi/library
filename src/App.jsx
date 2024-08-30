import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SavedPage from "./pages/SavedPage";
import { BooksProvider } from "./contexts/BooksContext";

function App() {
  return (
    <BooksProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </BrowserRouter>
    </BooksProvider>
  );
}

export default App;
