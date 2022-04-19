/**
 * Driver signup form.
 */

import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { CreateDriverInput, RideSignupStatus } from 'Api';
import { createDriver } from 'graphql/mutations';

import 'css/common/forms.scss';

import { API, graphqlOperation } from 'aws-amplify';

interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

export const DriverSignupForm = (driverSignupFormProps: DriverSignupFormProps) => {
  const [driverName, setDriverName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
  const [driverEventTime, setDriverEventTime] = useState('');
  const [driverAddress, setDriverAddress] = useState('');
  const [driverNumRiderSpots, setDriverNumRiderSpots] = useState(0);
  const [driverComments, setDriverComments] = useState('');

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const driverSignupData: CreateDriverInput = {
      eventId: 'EVENT_ID',
      driverName: driverName,
      driverEmail: driverEmail,
      driverPhoneNumber: driverPhoneNumber,
      driverEventTime: driverEventTime,
      driverAddress: driverAddress,
      driverNumRiderSeats: driverNumRiderSpots,
      driverComments: driverComments,
      driverSignupStatus: RideSignupStatus.IN_PROGRESS
    };

    const createDriverSignupResult = await (API.graphql(graphqlOperation(createDriver, {
      input: driverSignupData
    })) as Promise<any>).then((result) => {
      driverSignupFormProps.setDriverSignupCompleted(true);
    }).catch((reason => {
      console.log(reason); // Log failure to the client - this will help us trace issues.
    }));
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
                <Form.Control placeholder={'Enter your name'}
                              onChange={({target: {value}}) => setDriverName(value)}
                              required />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverEmail'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Email *{' '}
                </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'}
                              onChange={({target: {value}}) => setDriverEmail(value)}
                              required />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Phone Number *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your phone number'}
                              onChange={({target: {value}}) => setDriverPhoneNumber(value)}
                              required />
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverEventTime'}>
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
                  onChange={({target: {value}}) => setDriverEventTime('morning')}
                  required />

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
                  onChange={({target: {value}}) => setDriverEventTime('evening')}
                  required />

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
                  onChange={({target: {value}}) => setDriverEventTime('staying')}
                  required />

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
                  onChange={({target: {value}}) => setDriverEventTime('morning-evening')}
                  required />
              </Form.Group>
            </Col>

            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'driverAddress'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Address *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your address'}
                              onChange={({target: {value}}) => setDriverAddress(value)}
                              required />
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverNumRiderSpots'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Number of spots (excluding you) *{' '}
                </Form.Label>
                <Form.Control
                  placeholder={'Enter number of spots in your car'}
                  onChange={({target: {value}}) => setDriverNumRiderSpots(parseInt(value))}
                  required />
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverComments'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Comments{' '}
                </Form.Label>
                <Form.Control
                    as={'textarea'}
                    rows={4}
                    onChange={({target: {value}}) => setDriverComments(value)} />
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
