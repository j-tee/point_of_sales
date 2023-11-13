/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  Col, Container, Form, Modal, Row,
} from 'react-bootstrap';

const ProductDetailsModal = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setProductDetailsModalOpen, product,
  } = props;
  const [modalTop, setModalTop] = useState(0);

  useEffect(() => {
    if (isOpen && product) {
      setModalTop(calculateModalPosition());
      setProductDetailsModalOpen(true);
    }
  }, [isOpen, calculateModalPosition, product, setProductDetailsModalOpen]);
  return (
    <Container>
      <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <Modal.Title>
            Details of
            {' '}
            {product && product.attributes.product_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <h4>Store</h4>
                  {product && product.attributes.store_name}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Stock</h4>
                  {product && product.attributes.stock_details}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Category</h4>
                  {product && product.attributes.category_name}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group>
                  <h4>Product Name</h4>
                  {product && product.attributes.product_name}
                </Form.Group>

              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Description</h4>
                  {product && product.attributes.description}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Price</h4>
                  {product && product.attributes.unit_price}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group>
                  <h4>Unit Cost</h4>
                  {product && product.attributes.unit_cost}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Quantity</h4>
                  {product && product.attributes.qty_in_stock}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Expiry Date</h4>
                  {product && product.attributes.exp_date}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group>
                  <h4>Manufacture Date</h4>
                  {product && product.attributes.mnf_date}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Manufacturer</h4>
                  {product && product.attributes.manufacturer}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <h4>Country</h4>
                  {product && product.attributes.country}
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>&nbsp;</Col>
              <Col md={4}>
               &nbsp;
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetailsModal;
