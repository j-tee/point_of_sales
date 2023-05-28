/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTax, applyTax, getTaxList } from '../../redux/reducers/taxSlice';
// import { useSelector } from 'react-redux';

const Tax = (props) => {
  const { shopId } = props;
  const { taxes, products } = useSelector((state) => state.tax);
  const [taxRate, setTaxRate] = useState();
  const [taxName, setTaxName] = useState();
  const [taxId, setTaxId] = useState();
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  console.log('taxes========>', taxes);

  useEffect(() => {
    dispatch(getTaxList(shopId));
  }, [dispatch, shopId]);

  useEffect(() => {
    if (trigger) {
      const taxData = {
        name: taxName,
        rate: taxRate,
        store_id: shopId,
      };

      dispatch(addTax(taxData)).then(() => {
        setTaxName('');
        setTaxRate('');
        dispatch(getTaxList(shopId));
        setTrigger(false);
      });
    }
  }, [dispatch, shopId, taxName, taxRate, trigger]);

  const handleTaxSubmit = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  const handleApplyTax = () => {
    dispatch(applyTax(taxId));
  };
  return (
    <div>
      <Form className="p-5" onSubmit={handleTaxSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                placeholder="New Tax Name"
                type="text"
                name="tax_name"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                placeholder="Tax Rate"
                type="number"
                name="tax_rate"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button type="submit">Add New Tax</Button>
          </Col>
        </Row>
      </Form>

      <Form className="ps-5 pe-5">
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Form.Control as="select" value={taxId} name="tax_id" onChange={(e) => setTaxId(e.target.value)}>
              <option value="">---Select Tax---</option>
              {taxes.map((tax) => (
                <option value={tax.id} key={tax.id}>
                  {tax.name}
                  {' '}
                  {tax.rate}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col md={3} />
        </Row>
      </Form>
      <Row>
        <Col md={6}>
          <Button onClick={handleApplyTax}>Apply To All Products</Button>
        </Col>
        <Col md={6}>
          <Button>Apply To All Selected Products</Button>
        </Col>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Tax</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.name}</td>
                <td>{product.rate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default Tax;
