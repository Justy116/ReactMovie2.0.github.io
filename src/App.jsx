import { useState, useEffect } from "react";
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState()

  const API_URL = "http://www.omdbapi.com?apikey=7cbd94e4";
  const searchMovies = (title) => {
    fetch(`${API_URL}&s=${title}}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.Search)
      })
  }

  useEffect(() => {
    searchMovies("Marvel")
  }, [])

  const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  return (
    <div className="app">
    <h1>MovieLand</h1>

    <div className="search">
      <input
        value={searchTerm}
        onChange={handleOnChange}
        placeholder="Search for movies"
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
      />
    </div>

    {movies?.length > 0 ? (
      <div className="container">
        {movies.map((movie) => (
          <MovieCard Title={movie.Title} 
          year={movie.Year} 
          Poster={movie.Poster}
          Type={movie.Type} 
          key={movie.imdbID}/>
        ))}
      </div>
    ) : (
      <div className="empty">
        <h2>No movies found</h2>
      </div>
    )}
  </div>
  );
}
export default App;
