/**
 * Login form.
 */

import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";

// import { handleLogin } from 'Auth/Utilities/HandleLogin';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container className={"text-center login-container"} fluid>
      <span className={"signup-form-title"}>
        Please log in to view this page!
      </span>

      <Form
        className={"justify-content-center"}
        onSubmit={(event: any) => {
          event.preventDefault();

          // handleLogin(username, password);
        }}
      >
        <Col className={"mx-auto"} xs={"6"} sm={"5"} md={"4"} lg={"3"} xl={"2"}>
          <Form.Group className={"text-start mb-3"} controlId={"username"}>
            <Form.Label className={"signup-form-label"}>Username</Form.Label>
            <Form.Control
              placeholder={"Enter your username"}
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className={"text-start mb-3"} controlId={"password"}>
            <Form.Label className={"signup-form-label"}>Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder={"Enter your password"}
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              required
            />
          </Form.Group>
        </Col>

        <Button variant={"submit"} type={"submit"}>
          LOG IN
        </Button>
      </Form>
    </Container>
  );
};
