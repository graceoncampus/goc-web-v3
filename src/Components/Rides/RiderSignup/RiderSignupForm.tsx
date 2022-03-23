/**
 * Rider signup form.
 */

import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Turnarounds } from '../../../Constants/RidesConstants';

import 'css/common/forms.scss';
import { PickupLocationPopup } from "./PickupLocationPopup/PickupLocationPopup";

interface RiderSignupFormProps {
  setRiderSignupCompleted: (riderSignupValue: boolean) => void;
}

export const RiderSignupForm = (riderSignupFormProps: RiderSignupFormProps) => {
  const [
    disableApartmentTurnaroundTextInput,
    setDisableApartmentTurnaroundTextInput,
  ] = useState(true);

  const handleFormSubmit = () => {
    riderSignupFormProps.setRiderSignupCompleted(true);
  }

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'8'}>
        <span className={'signup-form-title'}>
          Sign up for a ride to Church!
        </span>

        <Form className={'text-center'} onSubmit={handleFormSubmit}>
          <Row className={'text-start gx-5'}>
            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'riderName'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Name *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your name'} required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderEmail'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Email *{' '}
                </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'} required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Phone Number *{' '}
                </Form.Label>
                <Form.Control type={"tel"} placeholder={'Enter your phone number'} required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderTurnaround'}>
                <div>
                  <Form.Label className={'signup-form-label'}>
                      {' '}
                      Pickup Location *{' '}
                  </Form.Label>

                  <PickupLocationPopup />
                </div>
                {Turnarounds.map((turnaroundName: string) => {
                  return (
                    <Form.Check
                      name={'radio-pickup-location'}
                      type={'radio'}
                      id={`${turnaroundName}-turnaround-radio`}
                      className={'signup-form-radio-button'}
                      label={
                        <span className={'signup-form-radio-text'}>
                          {' '}
                          {turnaroundName} Turnaround{' '}
                        </span>
                      }
                      onClick={turnaroundClickEvent => {
                        setDisableApartmentTurnaroundTextInput(true);
                      }}
                      required
                    />
                  );
                })}

                <div className={'apartment-radio-text-input'}>
                  <Form.Check
                    className={'pe-3 signup-form-radio-button'}
                    name={'radio-pickup-location'}
                    type={'radio'}
                    id={'apartment-turnaround-radio'}
                    label={
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Off&nbsp;Campus{' '}
                      </span>
                    }
                    onClick={apartmentClickEvent => {
                      setDisableApartmentTurnaroundTextInput(false);
                    }}
                    required
                  />

                  <Form.Control
                    type={'text'}
                    size={'sm'}
                    disabled={disableApartmentTurnaroundTextInput}
                    required
                  />
                </div>
              </Form.Group>
            </Col>

            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'riderTime'}>
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

              <Form.Group className={'mb-3'} controlId={'riderComments'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Comments{' '}
                </Form.Label>
                <Form.Control as={'textarea'} />
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
