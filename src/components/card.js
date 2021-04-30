import { string } from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Button, Card } from 'react-bootstrap';

export default function Cards({ image, name, index, url }) {
  return (
    <Link to={ url }>
      <Card data-testid={ `${index}-recipe-card` }>
        <Card.Img variant="top" data-testid={ `${index}-card-img` } src={ image } />
        <Card.Body>
          <Card.Title data-testid={ `${index}-card-name` }>{name}</Card.Title>
          {/* <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card&apos;s content.
        </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
}

Cards.propTypes = {
  image: string,
  name: string,
}.isRequired;
