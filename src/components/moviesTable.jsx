import React, { Component } from 'react';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';

class MoviesTable extends Component {
  state = {
    movies: [],
    count: null,
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({
      genres: [{ _id: 0, name: 'All Genres' }, ...getGenres()],
      movies: this.props.getMovies(),
      count: this.props.getMovies().length,
    });
  }

  deleteMovie = (id) => {
    this.props.deleteMovie(id);
    this.setState({
      movies: this.props.getMovies(),
      count: this.props.getMovies().length,
    });
  };

  handleLike = (movie) => {
    this.props.likeMovie(movie._id);
    this.setState({
      movies: this.props.getMovies(),
      count: this.props.getMovies().length,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  displayMoviesCount = () => {
    const { movies, currentPage, pageSize, selectedGenre } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const paginatedMovies = paginate(filtered, currentPage, pageSize);
    const count = paginatedMovies.length;

    return count === 0
      ? 'There are no movies in the database'
      : `Showing ${count} movies in the database`;
  };

  displayTable = () => {
    const { count, movies, currentPage, pageSize, selectedGenre } = this.state;

    if (count === 0) return '';

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;
    const paginatedMovies = paginate(filtered, currentPage, pageSize);

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedMovies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  onClick={() => this.handleLike(movie)}
                />
              </td>
              <td>
                <button
                  onClick={() => this.deleteMovie(movie._id)}
                  className='btn btn-sm btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className='col'>
          <h3>{this.displayMoviesCount()}</h3>
          {this.displayTable()}
          <Pagination
            pageSize={this.state.pageSize}
            totalItems={filtered.length}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default MoviesTable;
