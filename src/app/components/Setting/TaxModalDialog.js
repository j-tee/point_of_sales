/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Modal } from 'react-bootstrap';

const TaxModalDialog = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setTaxModalOpen,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  console.log(setTaxModalOpen);
  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);
  return (
    <>
      <Modal show={isOpen} onHide={onRequestClose} size="xl" style={{ marginTop: `${modalTop}px` }}>
        <Container>
          <h1>TAX MODAL DIALOG</h1>
        </Container>
      </Modal>
    </>
  );
};

TaxModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setTaxModalOpen: PropTypes.func.isRequired,
};

export default TaxModalDialog;
