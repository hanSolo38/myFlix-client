import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movie, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);

    useEffect(() => {
        if (!token) return;

        fetch("https://favorite-movies-cc1f1f0fe8fb.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.title,
                        genre: doc.genre,
                        director: doc.director,
                        imageUrl: doc.imageUrl,
                        description: doc.description
                    };
                });
            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <Row className="justify-content-md-center mt-5">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    <hr />
                    or create a new account:<br />
                    <br />
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                (() => {
                    const selectedGenre = selectedMovie.genre.name;
                    const similarMovies = movie.filter(movie => movie.genre.name === selectedGenre && movie.id !== selectedMovie.id
                    );
        
                    return (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
                            <br />
                            <hr /> 
                            <h2>Similar Movies</h2>
                            <div>
                                {similarMovies.length > 0 ? (
                                    <Row>
                                        {similarMovies.map(movie => (
                                            <Col className="mb-5" key={movie.id} md={4}>
                                                <MovieCard
                                                key={movie.id}
                                                movie={movie}
                                                onMovieClick={(newSelectedMovie) => {
                                                    setSelectedMovie(newSelectedMovie);
                                                }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <div>No similar movies found.</div>
                                )}
                            </div>
                        </Col>
                    );
                })()
            ) : movie.length === 0 ? (
                <>
                    <Button 
                        variant="primary"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                        }}
                    >
                    Logout
                    </Button>
                    <div>The list is empty!</div>
                </>
            ) : (
                <>
                    <Row>
                        {movie.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                                <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col md={2} className="d-flex justify-content-left">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                }}
                            >
                            Logout
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Row>
    );
};