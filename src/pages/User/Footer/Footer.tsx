/**
 * Footer.
 */

import React from "react";
import { Button, Row, Col, Container, Form, Image } from "react-bootstrap";

export const Footer = () => {
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
  };

  return (
    <Container className={"footer-container"} fluid>
      <Row className={"footer gx-4"}>
        <Col sm={"4"} className={"pb-3"}>
          <Row className={"gcc-logo pb-3"}>
            <a href={"https://www.gracechurch.org/"}>
              <Image
                fluid
                src={"/assets/logo-gcc.png"}
                alt={"Grace Community Church"}
              />
            </a>
          </Row>

          <div className={"follow-us-col-1"}>
            <Row className={"pb-1"}>
              <span className={"footer-label"}>&nbsp;FOLLOW US</span>
            </Row>

            <Row sm={"auto"} className={"gx-0"}>
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-facebook.png"}
                alt={"Facebook"}
              />
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-instagram.png"}
                alt={"Instagram"}
              />
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-vimeo.png"}
                alt={"Vimeo"}
              />
              <Image
                className={"logo-icon"}
                src={"/assets/logo-wordpress.png"}
                alt={"Wordpress"}
              />
            </Row>
          </div>
        </Col>

        <Col sm={"4"} className={"pb-5"}>
          <Row>
            <span className={"footer-label"}>GRACE ON CAMPUS</span>
          </Row>

          <Row>
            <span className={"footer-text"}>Fridays at 7pm</span>
          </Row>

          <Row className={"pb-3"}>
            <span className={"footer-text"}>Broad Art Center 2160E</span>
          </Row>

          <Row>
            <span className={"footer-label"}>CONTACT US</span>
          </Row>

          <Row>
            <span className={"footer-text"}>Phillip Ko</span>
          </Row>

          <Row>
            <span className={"footer-text"}>(510) 612-7862</span>
          </Row>

          <Row className={"pb-3"}>
            <span className={"footer-text"}>gocateam@gmail.com</span>
          </Row>
        </Col>

        <Col sm={"4"}>
          <Row>
            <span className={"footer-label"}>NEW TO GOC?</span>
          </Row>
          <Row className={"pb-3"}>
            <span className={"footer-text"}>
              We'd love to get in touch with you!
            </span>
          </Row>
          <Row>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className={"footer-form-group"} controlId={"name"}>
                <Form.Label className={"newcomer-form-label"}>
                  {" "}
                  Name{" "}
                </Form.Label>
                <Form.Control placeholder={"Enter your name"} />
              </Form.Group>

              <Form.Group className={"footer-form-group"} controlId={"email"}>
                <Form.Label className={"newcomer-form-label"}>
                  {" "}
                  Email{" "}
                </Form.Label>
                <Form.Control type={"email"} placeholder={"Enter your email"} />
              </Form.Group>

              <Button
                className={"newcomer-form-submit"}
                variant={"submit"}
                type={"submit"}
              >
                SUBMIT
              </Button>
            </Form>
          </Row>

          <div className={"follow-us-col-3"}>
            <Row className={"pt-3 pb-1"}>
              <span className={"footer-label"}>&nbsp;FOLLOW US</span>
            </Row>

            <Row sm={"auto"} className={"gx-0"}>
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-facebook.png"}
                alt={"Facebook"}
              />
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-instagram.png"}
                alt={"Instagram"}
              />
              <Image
                className={"logo-icon me-2"}
                src={"/assets/logo-vimeo.png"}
                alt={"Vimeo"}
              />
              <Image
                className={"logo-icon"}
                src={"/assets/logo-wordpress.png"}
                alt={"Wordpress"}
              />
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
