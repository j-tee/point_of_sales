/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteForeverOutlined } from '@mui/icons-material';
import {
  addProductTax, deleteProductTax, getTaxList, getTaxesOnAProduct,
} from '../../redux/reducers/taxSlice';

const TaxModalDialog = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setTaxModalOpen, productId, storeId,
  } = props;
  const { taxes } = useSelector((state) => state.tax);
  const { taxesOnProduct } = useSelector((state) => state.tax);
  const [modalTop, setModalTop] = useState(0);
  // const [productTaxObject, setProductTaxObject] = useState({});
  const dispatch = useDispatch();
  console.log(setTaxModalOpen);
  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
      dispatch(getTaxesOnAProduct(productId));
      dispatch(getTaxList(storeId));
    }
  }, [isOpen, calculateModalPosition, dispatch, productId, storeId]);

  const handleCheckboxChange = (e) => {
    // e.preventDefault();
    const obj = {
      product_tax: {
        product_id: productId,
        tax_id: e.target.id,
      },
    };
    if (e.target.checked) {
      dispatch(addProductTax(obj))
        .then(() => {
          dispatch(getTaxesOnAProduct(productId));
        });
    } else {
      dispatch(deleteProductTax({ product_id: productId, tax_id: e.target.id }));
    }
  };
  return (
    <>
      <Modal show={isOpen} onHide={onRequestClose} size="xl" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <Modal.Title>Taxes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              Avalable Taxes
            </Col>
          </Row>
          <Row>
            {taxes.map((tax) => (
              <Col md={4} key={tax.id}>
                <Form.Check
                  type="checkbox"
                  name={tax.id}
                  id={tax.id}
                  label={`${tax.name} ${tax.rate}%`}
                  //   checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Col>
            ))}
          </Row>
          <hr />
          <Row>
            <Col md={4}>
              Applied Taxes
            </Col>
          </Row>
          {taxesOnProduct.map((tax) => (
            <Col md={4} key={tax.id}>
              {tax.attributes.name}
              {' '}
              {' '}
              {' '}
              {tax.attributes.rate}
              {' '}
              %
              {' '}
              <Button variant="outline-danger" size="sm"><DeleteForeverOutlined color="white" size={16} /></Button>
                        &nbsp; &nbsp;
            </Col>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

TaxModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setTaxModalOpen: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
  storeId: PropTypes.number.isRequired,
};

export default TaxModalDialog;
