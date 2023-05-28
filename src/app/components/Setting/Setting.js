import React, { useEffect, useState } from 'react';
import {
  Col,
  Container, Form, Row, Tab, Tabs,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UserAccountMngt from '../UserAccountMngt';
import Tax from './Tax';
import Discount from './Discount';
// import { getTaxList } from '../../redux/reducers/taxSlice';
import { getShops } from '../../redux/reducers/shopSlice';

const Setting = () => {
  const { outlets } = useSelector((state) => state.shop);
  // const { taxes } = useSelector((state) => state.tax);
  const [shopId, setShopId] = useState(0);
  const dispatch = useDispatch();

  const handleShopChange = (event) => {
    const { value } = event.target;
    setShopId(value);
    console.log('shopId from settings======> ', value);
    // dispatch(getTaxList(parseInt(value, 10)));
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    dispatch(getShops(user.id));
  }, [dispatch]);
  return (
    <Container>
      <Form className="p-5">
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Form.Control as="select" value={shopId} name="store_id" onChange={handleShopChange}>
              <option value="">---Select Shop---</option>
              {outlets.map((sh) => (
                <option value={sh.id} key={sh.id}>
                  {sh.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col md={3} />
        </Row>
      </Form>
      <Tabs
        defaultActiveKey="settings"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="acc" title="User Accounts">
          <UserAccountMngt />
        </Tab>
        <Tab eventKey="taxes" title="Taxes">
          <Tax shopId={shopId} />
        </Tab>
        <Tab eventKey="discount" title="Discount">
          <Discount />
        </Tab>
      </Tabs>
    </Container>
  );
};

Setting.propTypes = {};

Setting.defaultProps = {};

export default Setting;
