import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className="border-0">
            <Row className="g-0">
                <Col md={8} className="d-flex flex-column justify-content-center">
                    <Card.Body>
                        <Card.Title className="fs-1" >{movie.title}</Card.Title>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <Card.Text className="fw-bold fs-4 opacity-50">{movie.director.name}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text className="text-end">{movie.genre.name}</Card.Text>
                            </Col>
                        </Row>
                    <Card.Text>{movie.description}</Card.Text>
                    </Card.Body>
                </Col>
                <Col md={4}>
                    <Card.Img variant="top" src={movie.imageUrl} />
                </Col>
                <Button variant="primary" onClick={onBackClick} className="back-button mt-4">Back</Button>
            </Row>
        </Card>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        imageUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};