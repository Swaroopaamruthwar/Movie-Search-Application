import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      setCurrentPage(1);
      const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}&page=1`);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setMovies([])
      setTotalPages(0)
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      try {
        setError('');
        const nextPage = currentPage + 1;
        const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}&page=${nextPage}`);
        setMovies(response.data.results);
        setCurrentPage(nextPage);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      try {
        setError('');
        const previousPage = currentPage - 1;
        const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}&page=${previousPage}`);
        setMovies(response.data.results);
        setCurrentPage(previousPage);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <div>
          <h1>Movie Search</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Enter a movie title"
                className='input'
              />
            </div>
            <div>
              <button type="submit" className="search-btn">Search</button>
            </div>
          </form>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>





      {totalPages > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

