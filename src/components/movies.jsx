import React, { Component } from 'react';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    count: null,
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: 0, name: 'All Genres' },
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { movies, currentPage, pageSize, selectedGenre, sortColumn } =
      this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: paginatedMovies.length, data: paginatedMovies };
  };

  displayMoviesCount = () => {
    const { totalCount: count } = this.getPagedData();

    return count === 0
      ? 'There are no movies in the database'
      : `Showing ${count} movies in the database`;
  };

  displayTable = () => {
    const { totalCount: count, data: movies } = this.getPagedData();
    const { sortColumn } = this.state;

    if (count === 0) return '';

    return (
      <MoviesTable
        movies={movies}
        sortColumn={sortColumn}
        onLike={this.handleLike}
        onDelete={this.deleteMovie}
        onSort={this.handleSort}
      />
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

export default Movies;
