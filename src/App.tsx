import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import GlobalSearchLogo from "./assets/GlobalSearchLogo.png";
import { CountryProvider } from "./context/CountryContext";

function App() {
  return (
    <CountryProvider>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-100 to-indigo-900 px-4">
        <div className="container max-w-4xl py-12">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-linear-to-br to mb-8 from-gray-400 to-gray-900 text-center text-5xl font-bold">
              Country Finder
            </h1>
            <img
              src={GlobalSearchLogo}
              alt="Global Search Logo"
              className="mx-auto w-120 object-cover"
            />
          </div>
          <div>
            <SearchBar />
            <SearchResults />
          </div>
        </div>
      </div>
    </CountryProvider>
  );
}

export default App;
