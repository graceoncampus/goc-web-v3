import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { Template } from "layouts/Template";

export const Reset = () => {
  return (
    <Template activeKey={NavbarActiveKey.LOGIN}>
      <ResetBody />
    </Template>
  );
};

const ResetBody = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <Container className={"text-center login-container"} fluid>
      <Col className={"mx-auto "} xs={"7"} sm={"6"} md={"5"} lg={"4"} xl={"3"}>
        <div className={"signup-form-title"}>Forgot Password?</div>
        <div>Enter your email to receive instructions to reset it.</div>

        <Form
          className={"justify-content-center"}
          onSubmit={(event: any) => {
            event.preventDefault();
            // todo: handle email submit for account recovery
          }}
        >
          <Form.Group className={"text-start mb-3"} controlId={"email"}>
            <Form.Label className={"signup-form-label"}>Email</Form.Label>
            <Form.Control
              placeholder={"Email"}
              onChange={({ target: { value } }) => {
                setEmail(value);
              }}
              required
            />
          </Form.Group>

          <Button variant={"submit"} type={"submit"}>
            Submit
          </Button>
          <Button variant={"link"} onClick={() => navigate("/signup")}>
            Create a new account
          </Button>

          <Button variant={"secondary"} onClick={() => navigate(-1)}>
            Back to login
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
