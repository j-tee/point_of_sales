/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Dropdown, DropdownButton, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTax, getTaxList, getTaxedProducts,
} from '../../redux/reducers/taxSlice';
import PaginationComponent from '../Pagination';
// import { useSelector } from 'react-redux';

const Tax = (props) => {
  const { shopId } = props;
  const { taxes, products, pagination } = useSelector((state) => state.tax);
  const [taxRate, setTaxRate] = useState();
  const [taxName, setTaxName] = useState();
  const [taxId, setTaxId] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  // const [visible, setVisible] = useState(true);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  // const [taxedProductUpdated, setTaxedProductUpdated] = useState(true);

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getTaxedProducts({
      storeId: shopId, taxId, page: currentPage, perPage: itemsPerPage,
    }))
      .then(() => {
        setTotalPages(pagination.total_pages);
      });
  }, [currentPage, dispatch, itemsPerPage, pagination.total_pages, shopId, taxId]);

  const handleTaxSubmit = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  // const handleApplyToSelectedProducts = () => {
  //   dispatch(getProductWithoutTaxes({
  //     shopId, taxId, page: currentPage, perPage: itemsPerPage,
  //   }));
  //   setVisible(false);
  // };

  // const handleApplyTax = () => {
  //   setVisible(true);
  //   dispatch(applyTax(taxId));
  // };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setTaxedProductUpdated(true);
  };
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  // const handleCheckboxChange = (productId) => {
  //   setSelectedProducts((prevSelectedProducts) => {
  //     if (prevSelectedProducts.includes(productId)) {
  //       return prevSelectedProducts.filter((id) => id !== productId);
  //     }
  //     return [...prevSelectedProducts, productId];
  //   });
  // };
  // const handleSelectAllChange = (event) => {
  //   if (event.target.checked) {
  //     const allProductIds = products.map((product) => product.id);
  //     setSelectedProducts(allProductIds);
  //   } else {
  //     setSelectedProducts([]);
  //   }
  // };

  // const selectAllChecked = selectedProducts.length === products.length;

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
        {/* <Col md={6}>
          <Button onClick={handleApplyTax}>Apply To All Products</Button>
        </Col>
        <Col md={6}>
          <Button onClick={handleApplyToSelectedProducts}>Apply To All Selected Products</Button>
        </Col> */}
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
        {/* {!visible && (
        <Form>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Check
                    type="checkbox"
                    label="Select All"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChange}
                  />
                </td>
              </tr>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      label={product.product_name}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
        )} */}
        <div className="d-flex justify-content-between align-items-center">
          <PaginationComponent
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={pagination?.totalItems || 0}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            totalPages={totalPages}
            hideDisabled={totalPages === 0}
            hideNavigation={totalPages === 1}
          />
          <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${itemsPerPage}`}>
            <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
          </DropdownButton>
        </div>
      </Row>
    </div>
  );
};

export default Tax;
