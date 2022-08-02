import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container} from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
    }
  

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="movieViewContainer">
        <Row>
          <Col>
           <div className="movie-poster">
            <img src={movie.ImagePath} />
           </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <button onClick={() => { onBackClick(null); }}>Back</button>
          </Col>
        </Row>
       </Container>
      );
    }
  }

  MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      ImagePath: PropTypes.string,
  }).isRequired,
};
