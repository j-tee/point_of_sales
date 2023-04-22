/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Card, Button, Row, Col, DropdownButton, Dropdown, Form, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts, getStock, getStocks, getUniqueProductNamesByStock,
} from '../../redux/reducers/inventorySlice';
import Customer from '../Customer/Customer';
import Order from '../Order/Order';
import OrderLineItem from '../OrderLineItem/OrderLineItem';
// import ProductSearch from '../ProductSearch';
import { getShops } from '../../redux/reducers/shopSlice';
import PaginationComponent from '../Pagination';

const Product = () => {
  const {
    products, pagination, stock, names,
  } = useSelector((state) => state.inventory);
  const { stocks } = useSelector((state) => state.inventory);
  const [storeId, setStoreId] = useState(0);
  const { outlets } = useSelector((state) => state.shop);
  // const {totalItems, perPage, curPage} = pagination;
  // const { outlets } = useSelector((state) => state.shop);
  const [stockId, setStockId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [startOrder, setStartOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const [btnStatus, setBtnStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [initLoad, setInitLoad] = useState(true);
  const [productName, setProductName] = useState('');
  const [params, setParams] = useState({
    stockId: 0,
    storeId: 0,
    categoryId: 0,
    country: undefined,
    productName: '',
    page: 1,
    perPage: 10,
  });
  // const [loadData, setLoadData] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (id, prodId, catId) => {
    setStockId(id);
    setProductId(prodId);
    setCategoryId(catId);
    setStartOrder(true);
    setOrderStatus('pending');
    setTrigger((trigger) => trigger + 1);
  };

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      perPage: newItemsPerPage,
      page: 1,
    }));
  }, []);

  const memoizedParams = useMemo(() => params, [params]);

  const handleProductFetch = useCallback(() => {
    dispatch(getProducts(memoizedParams))
      .then((res) => {
        if (initLoad) {
          setStockId(parseInt(res.payload.products.data[0].attributes.stock_id, 10));
          dispatch(getStock(res.payload.products.data[0].attributes.stock_id));
          setInitLoad(false);
        }
        setTotalPages(Math.ceil(pagination.totalItems / itemsPerPage));
      });
  }, [dispatch, memoizedParams, pagination.totalItems, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  };

  useEffect(() => {
    handleProductFetch();
  }, [currentPage, itemsPerPage, handleProductFetch]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(getShops(user.id));
    }
  }, []);

  useEffect(() => {
    setParams((prevParams) => ({ ...prevParams, page: currentPage }));
    dispatch(getProducts(params));
  }, [currentPage]);

  const setAddToCartButtonStatus = (status) => {
    setBtnStatus(status);
  };
  const handleButtonClick = () => {
    window.location.href = '/products';
  };
  const handleStoreChange = (event) => {
    // setInitLoad(false);
    const { value } = event.target;
    setStoreId(parseInt(value, 10));
    dispatch(getStocks(storeId));
    setParams((prevParams) => ({
      ...prevParams,
      storeId: parseInt(value, 10),
      page: 1,
    }));
  };

  const handleStockChange = (event) => {
    // setInitLoad(false);
    const { value } = event.target;
    setStockId(event.target.value);
    dispatch(getStock(parseInt(value, 10)));
    setParams((prevParams) => ({
      ...prevParams,
      stockId: parseInt(value, 10),
      page: 1,
    }));
    dispatch(getUniqueProductNamesByStock(value));
  };
  const handleProductNameChange = (event) => {
    const { value } = event.target;
    setProductName(value);
    setParams((prevParams) => ({
      ...prevParams,
      productName: value,
      page: 1,
    }));
  };
  return (
    <div className="container-fluid pb-5">
      <Row className="pt-5 mt-5">
        <Col md={8}>
          <Row>
            <Col md={3}>
              <h1>Products</h1>
            </Col>
            <Col md={6} className="text-center pt-3 text-muted">
              <h4>
                Stock ID:
                {' '}
                {stock.id}
                {' '}
                -
                {' '}
                {stock.stock_date}
              </h4>
            </Col>
            <Col md={3}>
              <Button style={{ width: '100%' }} onClick={handleButtonClick} className="mt-2 me-1">Refresh Page</Button>
            </Col>
            <hr />
          </Row>
          <Row>
            <Form>
              <Row className="pb-3 ps-2 pe-2 ms-2 me-2">
                <Col md={3}>
                  <Form.Group>
                    <Form.Control as="select" name="store_id" value={storeId} onChange={handleStoreChange} required>
                      <option value="">-- Select Store/Shop --</option>
                      {outlets.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.id}
                          {' '}
                          {option.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Control as="select" value={stockId} name="stock" onChange={handleStockChange}>
                      <option value="">-- Select Stock --</option>
                      {stocks.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.id}
                          {' '}
                          &nbsp;
                          {' '}
                          {option.stock_date}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <FormControl as="select" name="product_name" value={productName} onChange={handleProductNameChange}>
                      <option value="">---Select Product Name---</option>
                      {names.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </FormControl>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button style={{ width: '100%' }}>Find Product</Button>
                </Col>
              </Row>
            </Form>
            <hr />
          </Row>
          {/* <Row>
            <ProductSearch outlets={outlets} handleProductSearch={handleProductSearch} />
            <hr />
          </Row> */}
          <Row>
            <Row>
              {[...products].map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <Card>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.attributes.product_name}</Card.Title>
                      <Card.Text>{product.attributes.description}</Card.Text>
                      <Card.Text>
                        GHS
                        {product.attributes.unit_price}
                      </Card.Text>
                      <Card.Text>
                        Quantity:
                        {' '}
                        {product.attributes.qty_in_stock}
                      </Card.Text>
                      <Card.Text>
                        Category:
                        {' '}
                        {product.attributes.category_name}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product.attributes.stock_id, product.id, product.attributes.category_id)}
                        disabled={product.attributes.qty_in_stock === 0 || btnStatus}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
            <Row>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <PaginationComponent
                  params={params}
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
            <hr />
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <h1>Orders</h1>
            <hr />
          </Row>
          <Row>
            <Customer setAddToCartButtonStatus={setAddToCartButtonStatus} />
          </Row>
          <Row>
            <Order trigger={trigger} stockId={stockId} productId={productId} categoryId={categoryId} startOrder={startOrder} orderStatus={orderStatus} />
          </Row>
          <Row>
            <OrderLineItem productId={productId} trigger={trigger} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
