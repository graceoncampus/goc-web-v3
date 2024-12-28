import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { Template } from "layouts/Template";
import { signIn } from "aws-amplify/auth";

export const Login = () => {
  return <Template activeKey={NavbarActiveKey.LOGIN} body={<LoginBody />} />;
};

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Container className={"text-center login-container"} fluid>
      <span className={"signup-form-title"}>Welcome!</span>

      {/* TODO: Form Validation. use Yup? */}
      <Form
        className={"justify-content-center"}
        onSubmit={(event: any) => {
          event.preventDefault();

          signIn({ username, password })
            .then((value: any) => {
              // Signed in successfully so we reload.
              navigate("/");
            })
            .catch((reason: any) => {
              console.error(`Failed to sign user in: ${reason}`);
            });
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

          <div>
            <Button variant={"submit"} type={"submit"}>
              LOG IN
            </Button>

            <Button variant={"link"} onClick={() => navigate("/reset")}>
              Forgot Password?
            </Button>
          </div>
          <span>Don't have an account? </span>
          <Button variant={"link"} onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Col>
      </Form>
    </Container>
  );
};
