/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProductSearch({ storeId }) {
  console.log('STORE ID', storeId);
  return (
    <Form>
      <Row>
        <Col className="pb-2" xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Select Country --</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="pb-2" xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Category --</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Product Name --</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Manufacturer --</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="pb-2" xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Expiry Date --</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="pb-2" xs={3}>
          <Form.Group>
            <Form.Control as="select" name="contry">
              <option value="">-- Unit Cost --</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

ProductSearch.propTypes = {
  storeId: PropTypes.number.isRequired,
};

export default ProductSearch;
