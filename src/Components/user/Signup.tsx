import { confirmSignUp, resendSignUpCode, signUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HeaderNavbarActiveKey } from "../Header";
import { Template } from "../Template";
// import { PhoneInput } from "react-international-phone";
import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";

async function handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

export const Signup = () => {
  return <Template activeKey={HeaderNavbarActiveKey.LOGIN} body={<SignupBody />} />;
};

export interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  gradYear?: string;
}

const SignupBody = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [username, setUsername] = useState("");
  return !signedUp ? (
    <SignupForm setSignedUp={setSignedUp} setUsername={setUsername} />
  ) : (
    <ConfirmationForm username={username} />
  );
};

interface SignupFormProps {
  setSignedUp: Function;
  setUsername: Function;
}

const SignupForm = ({ setSignedUp, setUsername }: SignupFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<Value>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gradYear, setGradYear] = useState("");
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 10; year >= currentYear - 90; year--) {
    years.push(year);
  }

  const onSignup = async (event: any) => {
    event.preventDefault();

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            phone_number: phoneNumber,
            name: firstName,
            family_name: lastName,
            "custom:address": address,
            "custom:grad_year": gradYear,
          },
        },
      });
      setSignedUp(true);
    } catch (error: any) {
      console.log(error);
      if (error.name === "UsernameExistsException") {
        try {
          const response = await resendSignUpCode({ username: email });

          setSignedUp(true);
        } catch (error) {
          console.log("error resending code: ", error);
        }
      }
      console.log("error signing up:", error.code);
    }
  };

  return (
    <Container className={"text-center login-container"} fluid>
      <Col className={"mx-auto "} xs={"9"} sm={"8"} md={"8"} lg={"7"} xl={"6"}>
        <span className={"signup-form-title"}>Welcome!</span>

        <Form className={"justify-content-center"} onSubmit={onSignup}>
          <Col>
            <Row className={"text-start gx-5"}>
              <Col>
                <Form.Group className={"text-start mb-3"} controlId={"first"}>
                  <Form.Label className={"signup-form-label mb-1"}>First Name *</Form.Label>
                  <Form.Control
                    placeholder={"Shawn"}
                    onChange={({ target: { value } }) => {
                      setFirstName(value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className={"text-start mb-3"} controlId={"last"}>
                  <Form.Label className={"signup-form-label mb-1"}>Last Name *</Form.Label>
                  <Form.Control
                    placeholder={"Zhuang"}
                    onChange={({ target: { value } }) => {
                      setLastName(value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className={"text-start mb-3"} controlId={"email"}>
                  <Form.Label className={"signup-form-label mb-1"}>Email *</Form.Label>
                  <Form.Control
                    type={"email"}
                    placeholder={"shawnzhuang@gmail.com"}
                    onChange={({ target: { value } }) => {
                      setEmail(value);
                      setUsername(value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className={"text-start mb-3"} controlId={"number"}>
                  <Form.Label className={"signup-form-label mb-1"}>Phone Number *</Form.Label>
                  <PhoneInput
                    className={"form-control"}
                    // defaultCountry="us"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  {/* <Form.Control
                    placeholder={"Phone Number"}
                    onChange={({ target: { value } }) => {
                      setPhoneNumber(value);
                    }}
                    required
                  /> */}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className={"text-start mb-3"} controlId={"password"}>
                  <Form.Label className={"signup-form-label mb-1"}>Password *</Form.Label>
                  <Form.Control
                    type={"password"}
                    placeholder={"Password"}
                    onChange={({ target: { value } }) => {
                      setPassword(value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className={"text-start mb-3"} controlId={"password"}>
                  <Form.Label className={"signup-form-label mb-1"}>Confirm Password *</Form.Label>
                  <Form.Control
                    type={"password"}
                    placeholder={"Password Again"}
                    onChange={({ target: { value } }) => {
                      setConfirmPassword(value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className={"text-start mb-3"} controlId={"address"}>
                  <Form.Label className={"signup-form-label mb-1"}>Dorm/Address *</Form.Label>
                  <Form.Control
                    placeholder={"424 Veteran Ave"}
                    onChange={({ target: { value } }) => {
                      setAddress(value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className={"text-start mb-3"} controlId={"year"}>
                  <Form.Label className={"signup-form-label mb-1"}>Graduation Year</Form.Label>
                  <select
                    id="year"
                    value={gradYear}
                    onChange={({ target: { value } }) => setGradYear(value)}
                    className={"form-control"}
                  >
                    <option value="">--Select Year--</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Col>
            </Row>

            <Button variant={"submit"} type={"submit"}>
              Sign up
            </Button>
          </Col>
        </Form>

        <span>
          Have an account?
          <Button variant={"link"} onClick={() => navigate("/login")}>
            Login
          </Button>
        </span>
      </Col>
    </Container>
  );
};

interface ConfirmationFormProps {
  username: string;
}
const ConfirmationForm = ({ username }: ConfirmationFormProps) => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  return (
    <Container className={"text-center login-container"} fluid>
      <span className={"signup-form-title"}>Check your email for a confirmation code to finish signing up!</span>

      <Form
        className={"justify-content-center"}
        onSubmit={async (event: any) => {
          event.preventDefault();

          try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
              username,
              confirmationCode: code,
            });
            if (isSignUpComplete) {
              navigate("/");
            }
          } catch (error) {
            console.log("error confirming sign up", error);
          }
        }}
      >
        <Col className={"mx-auto"} xs={"6"} sm={"5"} md={"4"} lg={"3"} xl={"2"}>
          <Form.Group className={"text-start mb-3"} controlId={"username"}>
            <Form.Label className={"signup-form-label"}>Confirmation Code</Form.Label>
            <Form.Control
              placeholder={"Enter your confirmation code"}
              onChange={({ target: { value } }) => {
                setCode(value);
              }}
              required
            />
          </Form.Group>

          <Button variant={"submit"} type={"submit"}>
            Verify
          </Button>
        </Col>
      </Form>
    </Container>
  );
};
