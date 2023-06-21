import './App.css';
import MoviesTable from './components/moviesTable';
import {
  getMovies,
  deleteMovie,
  toggleLike,
} from './services/fakeMovieService';

function App() {
  return (
    <main className='container'>
      <MoviesTable
        getMovies={getMovies}
        deleteMovie={deleteMovie}
        likeMovie={toggleLike}
      />
    </main>
  );
}

export default App;
