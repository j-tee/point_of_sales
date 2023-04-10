/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

function ShoppingCartIcon({ cartCount }) {
  return (
    <div>
      <i className="bi bi-cart-fill" />
      <Badge bg="danger">{cartCount}</Badge>

    </div>
  );
}

ShoppingCartIcon.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default ShoppingCartIcon;
