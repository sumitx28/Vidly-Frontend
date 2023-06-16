import './App.css';
import MoviesTable from './components/moviesTable';
import { getMovies, deleteMovie } from './services/fakeMovieService';

function App() {
  return (
    <main className='container'>
      <MoviesTable getMovies={getMovies} deleteMovie={deleteMovie} />
    </main>
  );
}

export default App;
