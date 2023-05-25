import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Container, Form, ListGroup, Row,
} from 'react-bootstrap';
import {
  getShops, registerShop, updateShop, deleteShop,
} from '../../redux/reducers/shopSlice';
import ShopService from '../../services/data/shopService';

const Shop = () => {
  console.log('Calling shop ===> ');
  const dispatch = useDispatch();
  // localStorage.clear();
  const { outlets, message, isLoading } = useSelector((state) => state.shop) ?? {};
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('MESSAGE====>', message);

  useEffect(() => {
    if (user) {
      dispatch(getShops(user.id));
    }
  }, [dispatch]);

  const handleCreateShop = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerShop({ store: { name, address } }))
        .then(() => (dispatch(getShops(user.id))));
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
              React.createElement(ListGroup.Item, { key: shop.id, className: 'd-flex justify-content-between align-items-center' },
                React.createElement('div', null,
                  React.createElement('h5', null, shop.name),
                  React.createElement('p', null, shop.address)),
                React.createElement('div', null,
                  React.createElement(Button, { variant: 'warning', className: 'me-2', onClick: () => handleUpdateShop(shop.id, shop) }, 'Edit'),
                  React.createElement(Button, { variant: 'danger', onClick: () => handleDeleteShop(shop.id) }, 'Delete')))
            ))}
          </ListGroup>

        </>
      )}
    </Container>
  );
};

export default Shop;
