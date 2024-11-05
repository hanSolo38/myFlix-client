import PropTypes from 'prop-types';
//import { Button, Card } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card
          className="h-100"
          onClick={() => {
            onMovieClick(movie);
          }}
        >
            <Card.Img 
              variant="top" 
              src={movie.imageUrl} 
              alt={movie.title}
              style={{ objectfit: "cover", width: "100%", height: "350px" }} 
              />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Text className="d-flex justify-content-end">{movie.genre.name}</Card.Text>
             {/* <Button onClick={() => onMovieClick(movie)} variant="link">
                Open
              </Button> */}
            </Card.Body>
        </Card>
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