/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/display-name */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Table } from 'react-bootstrap';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { lineItems } = props;
  return (
    <div ref={ref} className="p-5">
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Product</th>
            <th>Total Cost</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Amt Payable</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.length > 0 ? (
            lineItems.map((item) => (
              <tr key={item.attributes.id}>
                <td>{item.attributes.product_name}</td>
                <td>
                  GHS
                  {parseFloat(item.attributes.total_amount).toFixed(2)}
                </td>
                <td>
                  GHS
                  {parseFloat(item.attributes.total_discount).toFixed(2)}
                </td>
                <td>
                  GHS
                  {parseFloat(item.attributes.total_tax).toFixed(2)}
                </td>
                <td>
                  GHS
                  {parseFloat(item.attributes.amount_payable).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No line items found.</td>
            </tr>
          )}
          <tr>
            <td>TOTAL</td>
            <td>
              GHS
              {' '}
              {lineItems && lineItems.reduce((acc, item) => acc + Number(item.attributes.total_amount), 0).toFixed(2)}
            </td>
            <td>
              GHS
              {' '}
              {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.total_discount), 0).toFixed(2)}
            </td>
            <td>
              GHS
              {' '}
              {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.total_tax), 0).toFixed(2)}
            </td>
            <td>
              GHS
              {' '}
              {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.amount_payable), 0).toFixed(2)}

            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});
