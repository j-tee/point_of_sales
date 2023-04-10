import React, { useEffect } from 'react';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../Order/Order';
import { getProducts } from '../../redux/reducers/inventorySlice';

const Product = () => {
  const { products } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  let storeId = 0;
  let prodId;
  const handleAddToCart = (id, productId = 0) => {
    storeId = id;
    prodId = productId;
    console.log('store and prod Ids', prodId, storeId);
  };
  const params = {
    storeId,
    categoryId: 0,
  };
  useEffect(() => {
    dispatch(getProducts(params));
  }, []);
  return (
    <div className="container-fluid">
      <Row>
        <Col md={8}>
          <h1>Products</h1>
          <hr />
        </Col>
        <Col md={4}>
          <h1>Orders</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Row>
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      $
                      {product.unit_price}
                    </Card.Text>
                    <Card.Text>
                      Quantity:
                      {' '}
                      {product.qty_in_stock}
                    </Card.Text>
                    <Card.Text>
                      Category:
                      {' '}
                      {product.category.name}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleAddToCart(product.store_id, product.id)} disabled={product.qty_in_stock === 0}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Order storeId={storeId} productId={prodId} />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
