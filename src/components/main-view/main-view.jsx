import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";

import { BrowserRouter as Router, Routes, Route, Redirect, Link } from "react-router-dom";

import {setMovies, setUser} from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { NavBar} from "../navbar/navbar";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";

import {Container, Col, Row,} from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
          user: null 
        }
    }

    componentDidMount() {
      let accessToken = localStorage.getItem("token");
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem("user"),
        });
        this.getMovies(accessToken);
      }
    }
  
    getMovies(token) {
      axios
        .get("https://best-marvel-movies.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          // Assign the result to the state
          this.props.setMovies (response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
      }
      
      onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
          user: null
        });
        window.open("/", "_self");
      }


      render() {
        let { movies } = this.props;
        let { user } = this.state;
        return (
          <Router>
            <NavBar user={user} />
            <Row className="main-view justify-content-md-center">
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          movies={movies}
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return movies.map((m) => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ));
                }}
              />
    
              <Route
                path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col lg={8} md={8}>
                      <RegistrationView />
                    </Col>
                  );
                }}
              />
    
              <Route
                path={`/users/${user}`}
                render={({ history }) => {
                  if (!user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <ProfileView
                        user={user}
                        onBackClick={() => history.goBack()}
                        movies={movies}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path={`/user-update/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <UserUpdate
                        user={user}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
    
              <Route
                path="/movies/:movieId"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <MovieView
                        movie={movies.find((m) => m._id === match.params.movieId)}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
    
              <Route
                path="/directors/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find((m) => m.Director.Name === match.params.name)
                            .Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
    
              <Route
                path="/genres/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </Row>
          </Router>
        );
      }
    }

    let mapStateToProps = state => {
      return { 
        movies: state.movies,
      user: state.user,
     };
    };

    export default connect(mapStateToProps, { setMovies })(MainView);



