import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

    render() {
        const { movies } = this.props;

      if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        return (
          <div className="main-view">
            {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
          </div>
        );
      }
export default Mainview;