/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth.user) ?? {};
  const { isLoggedIn } = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <h1>{user ? user.username : <h3>No user info</h3>}</h1>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
