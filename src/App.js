import './App.css';
import Movies from './components/movies';
import {
  getMovies,
  deleteMovie,
  toggleLike,
} from './services/fakeMovieService';

function App() {
  return (
    <main className='container'>
      <Movies
        getMovies={getMovies}
        deleteMovie={deleteMovie}
        likeMovie={toggleLike}
      />
    </main>
  );
}

export default App;
