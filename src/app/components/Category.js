/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCategory, getCategories } from '../redux/reducers/categorySlice';
import ToastContext from './ToastContext';
import { showToastify } from './Toastify';

const Category = ({ storeId }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [trigger, setTrigger] = useState(false);
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trigger) {
      const categoryData = {
        name: categoryName,
        description,
        store_id: storeId,
      };

      dispatch(addCategory(categoryData)).then((res) => {
        setShowToast(true);
        if (!res.error) {
          showToastify('Category added successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Failed to add category', 'error');
          }
        }
        setCategoryName('');
        setDescription('');
        dispatch(getCategories(storeId));
        setTrigger(false);
      });
    }
  }, [categoryName, description, dispatch, setShowToast, storeId, trigger]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setTrigger(true);
  };

  return (
    <>
      <Form onSubmit={handleAddCategory}>
        <Row className="pe-5 ps-5 m-3">
          <Col md={9}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    placeholder="Category Name"
                    type="text"
                    name="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Button type="submit">Add Category</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Category;
