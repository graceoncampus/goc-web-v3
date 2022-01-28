import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Turnarounds } from '../../../Constants/RidesConstants';

import './RiderSignup.css';

export const RiderSignup = () => {
  const [disableApartmentTurnaroundTextInput, setDisableApartmentTurnaroundTextInput] = useState(true);

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'10'}>
        <h1 className={'pb-4'}>Sign up for a ride to Church!</h1>

        <Form className={'text-center'}>
          <Row className={'text-start gx-5'}>
            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'riderName'}>
                <Form.Label> Name * </Form.Label>
                <Form.Control placeholder={'Enter your name'} />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderEmail'}>
                <Form.Label> Email * </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'} />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderPhoneNumber'}>
                <Form.Label> Phone Number * </Form.Label>
                <Form.Control placeholder={'Enter your phone number'} />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderTurnaround'}>
                <Form.Label> Turnaround * </Form.Label>
                {
                  Turnarounds.map((turnaroundName: string) => {
                    return (
                        <Form.Check
                            name={'rider-turnaround'}
                            type={'radio'}
                            id={`${turnaroundName}-turnaround-radio`}
                            label={`${turnaroundName}`}
                            onClick={(turnaroundClickEvent) => {
                              setDisableApartmentTurnaroundTextInput(true);
                            }}
                        />
                    );
                  })
                }

                <div className={'apartment-radio-text-input'}>
                  <Form.Check
                      className={'pe-3'}
                      name={'rider-turnaround'}
                      type={'radio'}
                      id={'apartment-turnaround-radio'}
                      label={'Apartment'}
                      onClick={(apartmentClickEvent) => {
                        setDisableApartmentTurnaroundTextInput(false);
                      }}
                  />

                  <Form.Control
                      className={'w-50'}
                      size={'sm'}
                      type={'text'}
                      disabled={disableApartmentTurnaroundTextInput}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'riderTime'}>
                <Form.Label> Time * </Form.Label>
                <Form.Check
                  name={'rider-time'}
                  type={'radio'}
                  id={'morning-time-radio'}
                  label={
                    <div className="time-label">
                      <div>Morning</div>
                      <div className="time-label-subheading">9am - 12:30pm</div>
                    </div>
                  }
                ></Form.Check>

                <Form.Check
                  name={'rider-time'}
                  type={'radio'}
                  id={'evening-time-radio'}
                  label={
                    <div className="time-label">
                      <div>Evening</div>
                      <div className="time-label-subheading">6pm - 7:30pm</div>
                    </div>
                  }
                />

                <Form.Check
                  name={'rider-time'}
                  type={'radio'}
                  id={'staying-time-radio'}
                  label={
                    <div className="time-label">
                      <div>Staying</div>
                      <div className="time-label-subheading">9am - 7:30pm</div>
                    </div>
                  }
                />

                <Form.Check
                  name={'rider-time'}
                  type={'radio'}
                  id={'morning-evening-time-radio'}
                  label={
                    <div className="time-label">
                      <div>Morning & Evening</div>
                      <div className="time-label-subheading">
                        9am - 12:30pm |<strong>RETURN</strong>| 6pm - 7:30pm
                      </div>
                    </div>
                  }
                />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderComments'}>
                <Form.Label> Comments </Form.Label>
                <Form.Control as={'textarea'} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant={'primary'} type={'submit'}>
            Sign Up
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
