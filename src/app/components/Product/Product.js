/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/reducers/inventorySlice';
import Customer from '../Customer/Customer';
import Order from '../Order/Order';
import OrderLineItem from '../OrderLineItem/OrderLineItem';

const Product = () => {
  const { products } = useSelector((state) => state.inventory);
  // const [customerId, setCustomerId] = useState(null);
  const [storeId, setStoreId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [startOrder, setStartOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const [btnStatus, setBtnStatus] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (id, prodId, catId) => {
    setStoreId(id);
    setProductId(prodId);
    setCategoryId(catId);
    setStartOrder(true);
    setOrderStatus('pending');
    setTrigger((trigger) => trigger + 1);
    console.log('store and prod and catId Ids', id, prodId, catId);
  };

  const params = {
    storeId,
    categoryId: 0,
    orderStatus: 'pending',
  };
  useEffect(() => {
    dispatch(getProducts(params));
  }, []);

  const setAddToCartButtonStatus = (status) => {
    setBtnStatus(status);
    console.log('BUTTON_STATUS =>', btnStatus);
  };
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
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product.store_id, product.id, product.category_id)}
                      disabled={product.qty_in_stock === 0 || btnStatus}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Customer setAddToCartButtonStatus={setAddToCartButtonStatus} />
          </Row>
          <Row>
            <Order trigger={trigger} storeId={storeId} productId={productId} categoryId={categoryId} startOrder={startOrder} orderStatus={orderStatus} />
          </Row>
          <Row>
            <OrderLineItem productId={productId} trigger={trigger} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
