import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        const selectedGenre = selectedMovie.genre.name;

        let similarMovies = movie.filter(movie => movie.genre.name === selectedGenre && movie.id !== selectedMovie.id);

        return (
        <div>
            <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
            <br />
            <hr /> 
            <h2>Similar Movies</h2>
            <div>
                {similarMovies.length > 0 ? (
                    similarMovies.map(movie => (
                        <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                        />
                    ))
                ) : (
                    <div>No similar movies found.</div>
                )}
            </div>
        </div>
        );
    }

    if (movie.length === 0) {
        return ( 
        <>
            <button 
                onClick={() => {
                    setUser(null);
                    setToken(null);
                }}
            >
            Logout
            </button>
            <div>The list is empty!</div>
        </>
    );
    }

    return (
        <div>
            {movie.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
            ))}
            <button 
                onClick={() => {
                    setUser(null);
                    setToken(null);
                }}
            >
            Logout
            </button>
        </div>
    );
};