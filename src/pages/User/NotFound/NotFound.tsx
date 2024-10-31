/**
 * 404 not found page for users.
 */

import React from "react";
import { Link } from "react-router-dom";

import { Template } from "pages/User/Template/Template";
import { HeaderNavbarActiveKey } from "pages/User/Header/Header";

const NotFoundBody = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const NotFound = () => {
  return (
    <Template activeKey={HeaderNavbarActiveKey.NONE} body={<NotFoundBody />} />
  );
};
