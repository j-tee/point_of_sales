/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import { useSelector } from 'react-redux';
import styles from './Dashboard.module.css';
import Shop from '../Shop/Shop';

const Dashboard = () => (

  <Container>
    <Shop />
  </Container>

);
export default Dashboard;
