/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';
import Header from '../Header';

const Home = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth) ?? {};
  return (
    <div className={styles.app}>
      <Container>
        <h2>Features</h2>
        <Row>
          <Col md={4}>
            <Card className={styles.feature}>
              <img src="./feature-1.png" alt="Feature 1" />
              <h3>Inventory Management</h3>
              <p>Manage your inventory with ease, track stock levels and receive alerts when you're running low.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.feature}>
              <img src="./feature-2.png" alt="Feature 2" />
              <h3>Sales Reporting</h3>
              <p>View real-time sales data and generate reports to help you make informed business decisions.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.feature}>
              <img src="./feature-3.png" alt="Feature 3" />
              <h3>Customer Management</h3>
              <p>Keep track of your customers and their purchasing history to provide better customer service and drive sales.</p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <h2>What our customers are saying</h2>
        <Row>
          <Col md={6}>
            <Card className={styles.testimonial}>
              <p>"POS Pro has been a game changer for my small business. It's so easy to use and has saved me so much time and effort."</p>
              <span>- John Smith, Owner of ABC Store</span>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={styles.testimonial}>
              <p>"I can't imagine running my business without POS Pro. It has all the features I need and more."</p>
              <span>- Jane Doe, Owner of XYZ Cafe</span>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className={styles.footer}>
        <Container>
          <p>© POS Pro 2023</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
