/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, getEmployees } from '../../redux/reducers/employeeSlice';
import { getShops } from '../../redux/reducers/shopSlice';
import UserAccModal from '../UserAccModal';
import { getRoles, getUserByEmail } from '../../redux/reducers/authSlice';
import RoleModal from '../RoleModal';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';
// import { getEmployees } from '../../redux/reducers/employeeSlice';

const Employee = () => {
  const { user, roles } = useSelector((state) => state.auth);
  const { employees } = useSelector((state) => state.employee);
  const { outlets } = useSelector((state) => state.shop);
  const [shopId, setShopId] = useState(0);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [employee, setEmployee] = useState();
  const [userAccModalOpen, setUserAccModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { setShowToast } = useContext(ToastContext);

  useEffect(() => {
    dispatch(getEmployees(0));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getShops());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(addEmployee(employee))
      .then((res) => {
        setShowToast(true);
        if (!res.error) {
          showToastify('Employee added successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Failed to add employee', 'error');
          }
        }
      });
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setEmployee((prevParams) => ({
      ...prevParams,
      name: value,
    }));
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmployee((prevParams) => ({
      ...prevParams,
      email: value,
    }));
  };

  const handleShopChange = (event) => {
    const { value } = event.target;
    setShopId(value);
    setEmployee((prevParams) => ({
      ...prevParams,
      store_id: value,
    }));
    dispatch(getEmployees(value));
  };

  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };

  const handleRoleModalOpen = (emp) => {
    dispatch(getRoles());
    setRoleModalOpen(true);
    dispatch(getUserByEmail(emp.attributes.email));
  };

  const handleModalOpen = (mail, name) => {
    setEmail(mail);
    setName(name);
    setUserAccModalOpen(true);
    dispatch(getUserByEmail(mail));
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="m-5 pt-5">
          <Col md={3}>
            <Form.Control as="select" value={shopId} name="store_id" onChange={handleShopChange}>
              <option value="">---Select Shop---</option>
              {outlets.map((sh) => (
                <option value={sh.id} key={sh.id}>
                  {sh.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col md={3}>
            <Form.Control placeholder="Enter full name" type="text" value={name} onChange={handleNameChange} />
          </Col>
          <Col md={3}>
            <Form.Control placeholder="Enter email address" type="text" value={email} onChange={handleEmailChange} />
          </Col>
          <Col md={3}>
            <Button type="submit">Add New Employee</Button>
          </Col>
        </Row>
      </Form>
      {employees.length === 0 ? (<Alert variant="info">No employees added</Alert>)
        : (
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.attributes.id}>
                  <td>{emp.attributes.name}</td>
                  <td>{emp.attributes.email}</td>
                  <td>
                    {emp.attributes.account_status ? (
                      <>
                        <Button onClick={() => handleRoleModalOpen(emp)} variant="outline-primary">Manage Roles</Button>
                       &nbsp;
                       &nbsp;
                        <Button variant="outline-primary">Lock Account</Button>
                        &nbsp;
                       &nbsp;
                        <Button variant="outline-danger">Delete Account</Button>
                      </>
                    ) : (
                      <Button variant="outline-primary" onClick={() => handleModalOpen(emp.attributes.email, emp.attributes.name)}>
                        Create Account
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      <UserAccModal
        name={name}
        user={user}
        email={email}
        isOpen={userAccModalOpen}
        onRequestClose={() => setUserAccModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setUserAccModalOpen={setUserAccModalOpen}
      />
      <RoleModal
        user={user}
        roles={roles}
        isOpen={roleModalOpen}
        onRequestClose={() => setRoleModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setRoleModalOpen={setRoleModalOpen}
      />
    </Container>
  );
};

Employee.propTypes = {};

Employee.defaultProps = {};

export default Employee;
