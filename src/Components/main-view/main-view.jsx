import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movie, setMovies] = useState([
        {
            id: 1,
            title: 'Inception',
            description: 'A genre that explores futuristic concepts, advanced technology, and extraterrestrial life.',
            genre: {
                name: 'Science Fiction',
                description: 'A genre that explores futuristic concepts, advanced technology, and extraterrestrial life.'
            },
            director: {
                name: 'Christopher Nolan',
                bio: 'Christopher Nolan is a British-American filmmaker known for his innovative storytelling and visually striking films, including Inception, The Dark Knight Trilogy, and Interstellar. Born on July 30, 1970, he is celebrated for exploring complex themes of time and identity.',
                birthdate: new Date('1970-07-30T00:00:00.000Z'),
                deathdate: null
            },
            imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSR1QehLSRaoyK_SdS22HiJSMkeVnI6xEHTyiI8KQv838LqRiNmIbpPM32C98J9HZ4kJZPe',
            featured: true     
        },
        {
            id: 2,
            title: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in space.',
            genre: {
              name: 'Science Fiction',
              description: 'A genre that explores futuristic concepts, advanced technology, and extraterrestrial life.'
            },
            director: {
              name: 'Christopher Nolan',
              bio: 'Christopher Nolan is a British-American filmmaker known for his innovative storytelling and visually striking films, including Inception, The Dark Knight Trilogy, and Interstellar. Born on July 30, 1970, he is celebrated for exploring complex themes of time and identity.',
              birthdate: new Date('1970-07-30T00:00:00.000Z'),
              deathdate: null
            },
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1beX5NmDZEd_vN2gja1SCmN6RW7kMwb_xsx9nHrHseAadgMQIFvIs1V8Hy7aG7flV_Tt2g',
            featured: true
        },
        {
            id: 3,
            title: 'Kill Bill: Vol. 1',
            description: 'A former assassin seeks revenge on her ex-colleagues.',
            genre: {
              name: 'Action',
              description: 'A genre characterized by excitement, high-energy sequences, and fast-paced plots.'
            },
            director: {
              name: 'Quentin Tarantino',
              bio: 'Quentin Tarantino is an American filmmaker known for his unique style, characterized by nonlinear storytelling and dark humor.',
              birthdate: new Date('1963-03-27T00:00:00.000Z'),
              deathdate: null
            },
            imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSlLnLZMfKcXnz59Qx-i27ZIYTNm_HPkdj77zKV2IjYA_iQ7ccdXNOaFlXSReAocFGwhNJVyQ',
            featured: false
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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