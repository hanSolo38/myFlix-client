import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movie, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://favorite-movies-cc1f1f0fe8fb.herokuapp.com/movies")
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
    }, []);

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
        return <div>The list is empty!</div>;
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
        </div>
    );
};