import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Container, Form, ListGroup, Row,
} from 'react-bootstrap';
import {
  getAllShops, registerShop, updateShop, deleteShop,
} from './shopSlice';
import ShopService from '../../app/services/data/shopService';

const Shop = () => {
  const dispatch = useDispatch();
  const { outlets, message, isLoading } = useSelector((state) => state.shop) ?? {};
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const user = localStorage.getItem('user');

  useEffect(() => {
    dispatch(getAllShops(user.id));
  }, [dispatch]);

  const handleCreateShop = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerShop({ store: { name, address } }));
      setName('');
      setAddress('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateShop = async (id, shop) => {
    try {
      dispatch(updateShop({ id, store: shop }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await ShopService.deleteStore(id);
      dispatch(deleteShop(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="mb-3">Shops</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {message && <p>{message}</p>}
          <Form onSubmit={handleCreateShop}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter shop name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter shop address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Add Shop</Button>
              </Col>
            </Row>
          </Form>
          <ListGroup className="mt-3">
            {outlets.map((shop) => (
              <ListGroup.Item key={shop.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{shop.name}</h5>
                  <p>{shop.address}</p>
                </div>
                <div>
                  <Button variant="warning" className="me-2" onClick={() => handleUpdateShop(shop.id, shop)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteShop(shop.id)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
};

export default Shop;
