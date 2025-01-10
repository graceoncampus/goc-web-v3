/**
 * 404 not found page for users.
 */

import React from "react";
import { Link } from "react-router-dom";

import { Template } from "layouts/Template";
import { NavbarActiveKey } from "components/Navbar";

const NotFoundBody = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const NotFound = () => {
  return (
    <Template activeKey={NavbarActiveKey.NONE}>
      <NotFoundBody />
    </Template>
  );
};
