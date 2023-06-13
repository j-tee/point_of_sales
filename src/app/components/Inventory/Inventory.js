/* eslint-disable max-len */
/* eslint-disable default-case */
import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  Container, Row, Col, Form, Button, Alert, Table, DropdownButton, Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Trash3 } from 'react-bootstrap-icons';
import { Details, Edit } from '@mui/icons-material';
import {
  addProduct, addStock, getProducts, getStocks,
} from '../../redux/reducers/inventorySlice';
import { getShops } from '../../redux/reducers/shopSlice';
import { getCategories } from '../../redux/reducers/categorySlice';
import PaginationComponent from '../Pagination';
import Category from '../Category';
import TaxModalDialog from '../Setting/TaxModalDialog';
import DiscountModalDialog from '../Setting/DiscountModalDialog';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';

const Inventory = () => {
  const { stocks, message } = useSelector((state) => state.inventory);
  const user = JSON.parse(localStorage.getItem('user'));
  const { outlets } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);
  const { products, pagination } = useSelector((state) => state.inventory) ?? [];
  const [totalPages, setTotalPages] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [storeId, setStoreId] = useState(0);
  const [stockId, setStockId] = useState(0);
  const [productName, setProductName] = useState('');
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const { setShowToast } = useContext(ToastContext);
  const [params, setParams] = useState({
    storeId: 0,
    categoryId: 0,
    stockId: 0,
    page: 1,
    perPage: 10,
  });
  const [categoryId, setCategoryId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);
  const [expDate, setExpDate] = useState();
  const [manufacturer, setManufacturer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [unitCost, setUnitCost] = useState(0);
  const [productId, setProductId] = useState(0);
  const [mnfDate, setMnfDate] = useState();
  const [stockDate, setStockDate] = useState('');
  const dispatch = useDispatch();
  const [newStock, setNewStock] = useState();
  const [newProduct, setNewProduct] = useState({
    store_id: '',
    product_name: '',
    unit_price: '',
    qty_in_stock: '',
    exp_date: '',
    manufacturer: '',
    description: '',
    country: '',
    unit_cost: '',
    mnf_date: '',
    category_id: '',
  });

  const [trigger, setTrigger] = useState(false);

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
      .then(() => {
        setTotalPages(Math.ceil(pagination.totalItems / itemsPerPage));
      });
  }, [dispatch, memoizedParams, pagination.totalItems, itemsPerPage]);

  useEffect(() => {
    handleProductFetch();
  }, [currentPage, itemsPerPage, handleProductFetch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'store_id': {
        setStoreId(value);
        dispatch(getCategories(parseInt(value, 10)));
        dispatch(getStocks(parseInt(value, 10)));
        setParams((prevParams) => ({
          ...prevParams,
          storeId: value,
        }));
        handleProductFetch();
        break;
      }
      case 'stock_id': {
        setStockId(value);
        setParams((prevParams) => ({
          ...prevParams,
          stockId: value,
        }));
        handleProductFetch();
        break;
      }
      case 'product_name': {
        setProductName(value);
        setParams((prevParams) => ({
          ...prevParams,
          product_name: value,
        }));
        handleProductFetch();
        break;
      }
      case 'category_id': {
        setCategoryId(value);
        setParams((prevParams) => ({
          ...prevParams,
          categoryId: value,
        }));
        handleProductFetch();
        break;
      }
      case 'unit_price': {
        setUnitPrice(value);
        break;
      }
      case 'qty_in_stock': {
        setQtyInStock(value);
        break;
      }
      case 'unit_cost': {
        setUnitCost(value);
        break;
      }
      case 'country': {
        setCountry(value);
        setParams((prevParams) => ({
          ...prevParams,
          country: value,
        }));
        handleProductFetch();
        break;
      }
      case 'description': {
        setDescription(value);
        break;
      }
      case 'manufacturer': {
        setManufacturer(value);
        setParams((prevParams) => ({
          ...prevParams,
          manufacturer: value,
        }));
        handleProductFetch();
        break;
      }
      case 'exp_date': {
        setExpDate(value);
        setParams((prevParams) => ({
          ...prevParams,
          exp_date: value,
        }));
        break;
      }
      case 'mnf_date': {
        setMnfDate(value);
        break;
      }
    }
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
    setNewStock({
      ...newStock, store_id: storeId,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    dispatch(addProduct(newProduct)).then((res) => {
      setShowToast(true);
      if (!res.error) {
        showToastify('New product added successfully', 'success');
        window.location.reload();
      } else if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify(message || 'An error occurred while adding new product to the database', 'error');
        }
      }
    });
    setNewProduct({
      store_id: '',
      stock_id: '',
      product_name: '',
      unit_price: '',
      qty_in_stock: '',
      exp_date: '',
      description: '',
      manufacturer: '',
      country: '',
      unit_cost: '',
      mnf_date: '',
      category_id: '',
    });
  };

  // const handleDeleteProduct = (productId) => {
  //   setProducts(products.filter((product) => product.id !== productId));
  // };

  const getExpiringProducts = () => {
    const now = new Date();
    return products.filter((product) => product.expiryDate && new Date(product.expiryDate) < now);
  };

  const getLowStockProducts = () => products.filter((product) => product.quantity < 10);
  useEffect(() => {
    dispatch(getStocks(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    dispatch(getStocks(storeId));
    dispatch(getProducts({ storeId: 0, categoryId: 0 }));
    if (user) {
      dispatch(getShops(user.id));
    }
    // Fetch country data from API
    axios.get('https://restcountries.com/v2/all')
      .then((response) => {
        const countries = response.data.map((country) => ({ label: country.name, value: country.alpha3Code }));
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleStoreIdChange = (e) => {
    e.preventDefault();
    setStoreId(e.target.value);
    setNewStock({
      ...newStock, store_id: e.target.value,
    });
  };

  const handleStockDateChange = (e) => {
    setStockDate(e.target.value);
    setNewStock({
      ...newStock, stock_date: e.target.value,
    });
  };
  // const handleDiscountModalClick = (productId) => {
  //   setProductId(productId);
  //   setDiscountModalOpen(true);
  // };

  const handleTaxModalClick = (productId) => {
    setProductId(productId);
    setTaxModalOpen(true);
  };
  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };
  const handleAddStock = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger && (storeId > 0)) {
      dispatch(addStock(newStock))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('New stock added successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify(message || 'An error occured while adding new stock entry', 'error');
            }
          }
          setTrigger(false);
          dispatch(getStocks(storeId));
        });
    }
  }, [dispatch, newStock, trigger, storeId, setShowToast, message]);

  useEffect(() => {
    dispatch(getCategories(storeId));
  }, [dispatch, storeId]);
  return (
    <Container>
      <Row className="pt-5 mt-5">
        <Col sm={3}>
          <Row>
            <h1>Add Product</h1>
            <hr />
          </Row>
          <Row>
            <Form onSubmit={handleAddProduct}>
              <Form.Group>
                <Form.Control as="select" value={stockId} name="stock_id" onChange={handleChange}>
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
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" name="category_id" value={categoryId} onChange={handleChange} required>
                  <option value="">-- Select Category --</option>
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="product_name" value={productName} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="unit_price" value={unitPrice} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Unit Cost</Form.Label>
                <Form.Control type="number" name="unit_cost" value={unitCost} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="qty_in_stock" value={qtyInStock} onChange={handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="date" name="expiry_date" value={expDate} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Manufacture Date</Form.Label>
                <Form.Control type="date" name="mnf_date" value={mnfDate} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control type="text" name="manufacturer" value={manufacturer} onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control as="select" name="country" value={country} onChange={handleChange}>
                  <option value="">-- Select Country --</option>
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
            <hr />
          </Row>
        </Col>
        <Col sm={9}>
          <Row>
            <h1>Stock</h1>
            <hr />
            <Form onSubmit={handleAddStock}>
              <Row className="pe-5 ps-5 m-3">
                <Col md={9}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Control as="select" name="store_id" value={storeId} onChange={handleStoreIdChange} required>
                          <option value="">-- Select Store/Shop --</option>
                          {outlets.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Control type="date" name="stock_date" value={stockDate} onChange={handleStockDateChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={3}>
                  <Button type="submit">New Stock Entry</Button>
                </Col>
              </Row>
            </Form>
            <Category storeId={storeId} />
            {/* <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stock ID</th>
                  <th>Stock Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {stocks && stocks.map((stock) => (
                  <tr key={stock.i}>
                    <td>{stock.id}</td>
                    <td>{stock.stock_date}</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </Table> */}
            <hr />
          </Row>
          <Row>
            <Row>
              <Col md={3}>
                <h4>Product List</h4>
              </Col>
              <Col md={9}>
                &nbsp;
              </Col>
            </Row>
            {products.length === 0 ? (
              <Alert variant="info">No products added</Alert>
            ) : (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>In Stock</th>
                    <th>Sold</th>
                    <th>Damages</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td><strong>{product.attributes.product_name}</strong></td>
                      <td>{product.attributes.qty_in_stock}</td>
                      <td>{product.attributes.qty_of_product_sold}</td>
                      <td>{product.attributes.qty_damaged}</td>
                      <td>{product.attributes.qty_available}</td>
                      {/* <td>
                        {product.exp_date && new Date(product.exp_date) < new Date() ? (
                          <Alert variant="danger">Expired!</Alert>
                        ) : null}
                      </td> */}
                      <td>
                        {product.exp_date && new Date(product.exp_date) < new Date() ? (
                          <Alert variant="danger">Expired! &nbsp; &nbsp;</Alert>
                        ) : null}
                        <Button variant="danger" size="sm" onClick={() => handleTaxModalClick(product.id)}><Trash3 color="white" size={16} /></Button>
                        &nbsp; &nbsp;
                        <Button variant="primary" size="sm" onClick={() => handleTaxModalClick(product.id)}><Edit color="white" size={16} /></Button>
                        &nbsp; &nbsp;
                        <Button variant="info" size="sm" onClick={() => handleTaxModalClick(product.id)}><Details color="white" size={16} /></Button>
                        &nbsp; &nbsp;
                        <Button variant="info" size="sm" onClick={() => handleTaxModalClick(product.id)}>Taxes</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
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
            {getExpiringProducts().length > 0 ? (
              <Alert variant="warning">
                The following products are expiring soon:
                {' '}
                {getExpiringProducts().map((product) => product.product_name).join(', ')}
              </Alert>
            ) : null}
            {getLowStockProducts().length > 0 ? (
              <Alert variant="warning">
                The following products are running low on stock:
                {' '}
                {getLowStockProducts().map((product) => product.product_name).join(', ')}
              </Alert>
            ) : null}
          </Row>
        </Col>
      </Row>
      <TaxModalDialog
        isOpen={taxModalOpen}
        onRequestClose={() => setTaxModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setTaxModalOpen={setTaxModalOpen}
        productId={productId}
        storeId={storeId}
      />
      <DiscountModalDialog
        isOpen={discountModalOpen}
        onRequestClose={() => setDiscountModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setDiscountModalOpen={setDiscountModalOpen}
      />
    </Container>
  );
};

export default Inventory;
