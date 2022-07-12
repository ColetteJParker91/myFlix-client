import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', Genre:"Action", Director:"Christopher Nolan", ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', Genre:"Drama", Director:"Frank Darabont",  ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg'},
            { _id: 3, Title: 'Gladiator', Description: 'Commodus takes over power and demotes Maximus, one of the preferred generals of his father, Emperor Marcus Aurelius. As a result, Maximus is relegated to fighting till death as a gladiator.', Genre:'Action', Director:"Ridley Scott", ImagePath: 'https://m.media-amazon.com/images/I/61MSIFHAxML._AC_SY445_.jpg'}
          ],
          selectedMovie: null
        };
    }
        setSelectedMovie(newSelectedMovie) {
            this.setState({
              selectedMovie: newSelectedMovie
            });
      }


      render() {
        const { movies, selectedMovie } = this.state;
    
        if (selectedMovie) return <MovieView movie={selectedMovie} />;
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
            <div className="main-view">
      {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
    </div>
            );
      }
}

    export default MainView;