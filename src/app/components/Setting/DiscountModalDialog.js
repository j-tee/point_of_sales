/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Modal } from 'react-bootstrap';

const DiscountModalDialog = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setDiscountModalOpen,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  console.log(setDiscountModalOpen);

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);
  return (
    <>
      <Modal show={isOpen} onHide={onRequestClose} size="xl" style={{ marginTop: `${modalTop}px` }}>
        <Container>
          <h1>Discount Modal</h1>
        </Container>
      </Modal>
    </>
  );
};

DiscountModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setDiscountModalOpen: PropTypes.func.isRequired,
};

export default DiscountModalDialog;
