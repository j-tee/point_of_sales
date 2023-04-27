import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, getEmployees } from '../../redux/reducers/employeeSlice';
import { getShops } from '../../redux/reducers/shopSlice';
// import { getEmployees } from '../../redux/reducers/employeeSlice';

const Employee = () => {
  const { employees } = useSelector((state) => state.employee);
  const { outlets } = useSelector((state) => state.shop);
  const [shopId, setShopId] = useState(0);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [employee, setEmployee] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees(0));
  }, []);

  useEffect(() => {
    dispatch(getShops());
  }, []);

  const handleSubmit = () => {
    dispatch(addEmployee(employee));
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
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

Employee.propTypes = {};

Employee.defaultProps = {};

export default Employee;
