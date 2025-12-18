import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-900">
      <div className="w-full max-w-7xl px-4">
        <SearchBar />
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
