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

// eslint-disable-next-line no-unused-vars
const userData = [{ label: 'New Users', value: 258, color: '#387908' }, { label: 'Returning Users', value: 169, color: '#990000' }];

const revenueData = [{ label: 'Subscription Revenue', value: 1245, color: '#387908' }, { label: 'Ad Revenue', value: 335, color: '#990000' }];

const pageViewsData = [{ label: 'Homepage', value: 5423, color: '#387908' }, { label: 'About Us', value: 3452, color: '#990000' }, { label: 'Contact Us', value: 1897, color: '#004c99' }];

const taskData = [{ id: 1, title: 'Update Homepage', completed: true }, { id: 2, title: 'Create About Us Page', completed: false }, { id: 3, title: 'Respond to Customer Emails', completed: false }];

const COLORS = ['#387908', '#990000', '#004c99'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Dashboard = () => {
  const { shops } = useSelector((state) => state.outlet) ?? {};
  return (
    <>
      {
        shops
          ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.heading}>Sales Forge</h1>
                <nav>
                  {/* Include navigation links for different sections of the dashboard */}
                </nav>
              </header>
              <main>
                <Row>
                  <Col>
                    <Card className={styles.card}>
                      <Card.Header className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Overview</h2>
                      </Card.Header>
                      <Card.Body className={styles.cardBody}>
                        <div className={styles.stats}>
                          <div className={styles.stat}>
                            <div className={styles.statLabel}>Total Users</div>
                            <div className={styles.statValue}>427</div>
                          </div>
                          <div className={styles.stat}>
                            <div className={styles.statLabel}>New Users</div>
                            <div className={styles.statValue}>258</div>
                          </div>
                          <div className={styles.stat}>
                            <div className={styles.statLabel}>Returning Users</div>
                            <div className={styles.statValue}>169</div>
                          </div>
                          <div className={styles.stat}>
                            <div className={styles.statLabel}>Total Revenue</div>
                            <div className={styles.statValue}>$1,580</div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Card className={styles.card}>
                      <Card.Header className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Analytics</h2>
                      </Card.Header>
                      <Card.Body className={styles.cardBody}>
                        <div className={styles.chartContainer}>
                          <h3 className={styles.chartTitle}>Page Views</h3>
                          <div className={styles.chart}>
                            <Pie
                              data={pageViewsData}
                              dataKey="value"
                              nameKey="label"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              label
                            >
                              {pageViewsData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Pie>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className={styles.card}>
                      <Card.Header className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Tasks</h2>
                      </Card.Header>
                      <Card.Body className={styles.cardBody}>
                        <ul className={styles.tasks}>
                          {taskData.map((task) => (
                            <li
                              className={`${styles.task} ${task.completed ? styles.completed : ''}`}
                              key={task.id}
                            >
                              {task.title}
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </main>

            </>
          )
          : <Shop />
      }
    </>
  );
};
export default Dashboard;
