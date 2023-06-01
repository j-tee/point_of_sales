/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  Alert, Button, Form, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, deleteNotification, getNotifications } from '../../redux/reducers/inventorySlice';

const Notification = ({ shopId }) => {
//   const [notifications, setNotifications] = useState([]);
  const { notifications } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(shopId));
  }, [dispatch, shopId]);
  const handleSetNotification = (event) => {
    event.preventDefault();
    const notification = {
      type: event.target.type.value,
      value: event.target.value.value,
    };
    // setNotifications([...notifications, notification]);
    dispatch(addNotification(notification))
      .then(() => {
        dispatch(getNotifications(shopId));
      });
    event.target.reset();
  };

  const handleRemoveNotification = (id) => {
    // setNotifications(notifications.filter((_, i) => i !== index));
    dispatch(deleteNotification(id));
  };
  return (
    <div>
      <h3>Notifications</h3>
      <Form onSubmit={handleSetNotification}>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" name="type" required>
            <option value="">Select a type</option>
            <option value="expiry">Expiry Date</option>
            <option value="lowstock">
              Low Stock

            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Value</Form.Label>
          <Form.Control type="text" name="value" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Set
        </Button>
      </Form>
      <hr />
      <h3>Notifications List</h3>
      {notifications.length === 0 ? (
        <Alert variant="info">No notifications set</Alert>
      ) : (
        <ListGroup>
          {notifications.map((notification) => (
            <ListGroup.Item key={notification.id}>
              {notification.type === 'expiry' ? (
                <span>
                  Notify me when a product is expiring in
                  {' '}
                  {notification.value}
                  {' '}
                  days
                </span>
              ) : (
                <span>
                  Notify me when a product has less than
                  {' '}
                  {notification.value}
                  {' '}
                  in stock
                </span>
              )}
              <Button className="float-right" variant="danger" size="sm" onClick={() => handleRemoveNotification(notification.id)}>
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Notification;
