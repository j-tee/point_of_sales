import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Container, Form, ListGroup, Row,
} from 'react-bootstrap';
import {
  getShops, registerShop, updateShop, deleteShop,
} from '../../redux/reducers/shopSlice';
import ShopService from '../../services/data/shopService';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';

const Shop = () => {
  const dispatch = useDispatch();
  // localStorage.clear();
  const { outlets, isLoading } = useSelector((state) => state.shop);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { setShowToast } = useContext(ToastContext);
  // const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getShops(0));
  }, [dispatch]);

  const handleCreateShop = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerShop({ store: { name, address } }))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('Shop registered successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to register shop', 'error');
            }
          }
          dispatch(getShops(0));
        });
      setName('');
      setAddress('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateShop = async (id, shop) => {
    try {
      dispatch(updateShop({ id, store: shop })).then((res) => {
        setShowToast(true);
        if (!res.error) {
          showToastify('Shop updated successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Failed to update shop', 'error');
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await ShopService.deleteStore(id);
      dispatch(deleteShop(id)).then((res) => {
        setShowToast(true);
        if (!res.error) {
          showToastify('Shop deleted successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Failed to remove shop from database', 'error');
          }
        }
      });
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
