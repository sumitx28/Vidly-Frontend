import React, { Component } from 'react';

class MoviesTable extends Component {
  state = {
    movies: this.props.getMovies(),
    count: this.props.getMovies().length,
  };

  deleteMovie = (id) => {
    this.props.deleteMovie(id);
    this.setState({
      movies: this.props.getMovies(),
      count: this.props.getMovies().length,
    });
  };

  displayMoviesCount = () => {
    const { count } = this.state;

    return count === 0
      ? 'There are no movies in the database'
      : `Showing ${count} movies in the database`;
  };

  displayTable = () => {
    const { count } = this.state;

    if (count === 0) return '';

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
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
    return (
      <div>
        <h3>{this.displayMoviesCount()}</h3>
        {this.displayTable()}
      </div>
    );
  }
}

export default MoviesTable;
