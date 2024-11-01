import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
          onClick={() => {
            onMovieClick(movie);
          }}
        >
            <img src={movie.imageUrl} alt={movie.title} style={{ width:'100px', height: 'auto' }} />
            <div>{movie.title}</div>
            <div>{movie.description}</div>
            <div>{movie.genre.name}</div>
        </div>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};