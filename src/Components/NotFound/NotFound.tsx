import React from 'react';
import { Link } from 'react-router-dom';

import { Template } from '../Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

const NotFoundBody = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const NotFound = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.RIDES} body={<NotFoundBody />} />
    );
}