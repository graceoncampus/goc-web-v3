/**
 * Driver signup form.
 */

import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import 'css/common/forms.scss';

interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

export const DriverSignupForm = (driverSignupFormProps: DriverSignupFormProps) => {
  const handleFormSubmit = () => {
    driverSignupFormProps.setDriverSignupCompleted(true);
  }

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'8'}>
        <span className={'signup-form-title'}>Sign up to drive to Church!</span>

        <Form className={'text-center'} onSubmit={handleFormSubmit}>
          <Row className={'text-start gx-5'}>
            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'driverName'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Name *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your name'} required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverEmail'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Email *{' '}
                </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'} required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Phone Number *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your phone number'} required/>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverTime'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Time *{' '}
                </Form.Label>
                <Form.Check
                  name={'radio-time'}
                  type={'radio'}
                  id={'morning-time-radio'}
                  className={'signup-form-radio-button'}
                  label={
                    <div className={'time-label'}>
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Morning{' '}
                      </span>
                      <div className={'signup-form-radio-subheading'}>
                        9am - 12:30pm
                      </div>
                    </div>
                  }
                  required
                ></Form.Check>

                <Form.Check
                  name={'radio-time'}
                  type={'radio'}
                  id={'evening-time-radio'}
                  className={'signup-form-radio-button'}
                  label={
                    <div className={'time-label'}>
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Evening{' '}
                      </span>
                      <div className={'signup-form-radio-subheading'}>
                        6pm - 7:30pm
                      </div>
                    </div>
                  }
                />

                <Form.Check
                  name={'radio-time'}
                  type={'radio'}
                  id={'staying-time-radio'}
                  className={'signup-form-radio-button'}
                  label={
                    <div className={'time-label'}>
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Staying{' '}
                      </span>
                      <div className={'signup-form-radio-subheading'}>
                        9am - 7:30pm
                      </div>
                    </div>
                  }
                />

                <Form.Check
                  name={'radio-time'}
                  type={'radio'}
                  id={'morning-evening-time-radio'}
                  className={'signup-form-radio-button'}
                  label={
                    <div className={'time-label'}>
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Morning & Evening{' '}
                      </span>
                      <div className={'signup-form-radio-subheading'}>
                        9am - 12:30pm |<strong>RETURN</strong>| 6pm - 7:30pm
                      </div>
                    </div>
                  }
                />
              </Form.Group>
            </Col>

            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'driverPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Address *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your address'} required/>
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Number of spots (excluding you) *{' '}
                </Form.Label>
                <Form.Control
                  placeholder={'Enter number of spots in your car'}
                  required
                />
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverComments'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Comments{' '}
                </Form.Label>
                <Form.Control as={'textarea'} rows={4} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant={'submit'} type={'submit'}>
            <strong>SIGN UP</strong>
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
