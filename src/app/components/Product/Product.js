import React from 'react';
import { Card, Button } from 'react-bootstrap';

const inventory = [
  {
    id: 1,
    name: 'Widget A',
    description: 'This is Widget A.',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    quantity: 10,
    category: 'Widgets',
  },
  {
    id: 2,
    name: 'Widget B',
    description: 'This is Widget B.',
    price: 7.99,
    image: 'https://via.placeholder.com/150',
    quantity: 5,
    category: 'Widgets',
  },
  {
    id: 3,
    name: 'Widget C',
    description: 'This is Widget C.',
    price: 15.99,
    image: 'https://via.placeholder.com/150',
    quantity: 2,
    category: 'Widgets',
  },
];

const Product = () => (
  <div className="container">
    <h2>Products</h2>
    <div className="row">
      {inventory.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
          <Card>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>
                $
                {product.price.toFixed(2)}
              </Card.Text>
              <Card.Text>
                Quantity:
                {' '}
                {product.quantity}
              </Card.Text>
              <Card.Text>
                Category:
                {' '}
                {product.category}
              </Card.Text>
              <Button variant="primary" disabled={product.quantity === 0}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>

        </div>
      ))}
    </div>
  </div>
);

export default Product;
