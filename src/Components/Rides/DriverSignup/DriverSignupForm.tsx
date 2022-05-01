/**
 * Driver signup form.
 */

import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { EventTimeOption, CreateDriverInput, RideSignupStatus } from 'Api';
import { getEventsByEventId } from 'graphql/queries';
import { createDriver } from 'graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';

import 'css/common/forms.scss';


interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

export const DriverSignupForm = (driverSignupFormProps: DriverSignupFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [eventId, setEventId] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventTimes, setEventTimes] = useState<EventTimeOption[]>([]);

  const [driverName, setDriverName] = useState<string>('');
  const [driverEmail, setDriverEmail] = useState<string>('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState<string>('');
  const [driverEventTime, setDriverEventTime] = useState<string>('');
  const [driverAddress, setDriverAddress] = useState<string>('');
  const [driverNumRiderSpots, setDriverNumRiderSpots] = useState<number>(0);
  const [driverComments, setDriverComments] = useState<string>('');

  /**
   * Get search params from url (fires on render).
   */
  useEffect(() => {
    setEventId(searchParams.get('eventId') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchEventData = async () => {
      await (API.graphql(graphqlOperation(getEventsByEventId, {
        eventId: eventId
      })) as Promise<any>).then((result) => {
        const eventData = result.data.getEventsByEventId.items[0];

        setEventName(eventData['eventName']);
        setEventTimes(eventData['eventTimes']);
      }).catch((reason => {
        console.log(reason); // Log failure to the client - this will help us trace issues.
      }));
    };

    fetchEventData();
  }, [eventId]);

  /**
   * Pull event data from GraphQL backend (fires only when eventId changes).
   */
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const driverSignupData: CreateDriverInput = {
      eventId: eventId,
      driverName: driverName,
      driverEmail: driverEmail,
      driverPhoneNumber: driverPhoneNumber,
      driverEventTime: driverEventTime,
      driverAddress: driverAddress,
      driverNumRiderSeats: driverNumRiderSpots,
      driverComments: driverComments,
      driverSignupStatus: RideSignupStatus.IN_PROGRESS
    };

    await (API.graphql(graphqlOperation(createDriver, {
      input: driverSignupData
    })) as Promise<any>).then((result) => {
      driverSignupFormProps.setDriverSignupCompleted(true);
    }).catch((reason => {
      console.log(reason); // Log failure to the client - this will help us trace issues.
    }));
  };

  const eventTimesRadioButtons = eventTimes.map((eventTime: EventTimeOption) => {
    const eventTimeHeading = eventTime.timeHeading;
    const eventTimeSubtext = eventTime.timeSubtext;

    
    return (
        <Form.Check
            key={eventTimeHeading}
            name={'radio-time'}
            type={'radio'}
            id={`${eventTimeHeading}-radio`}
            className={'signup-form-radio-button'}
            label={
              <div className={'time-label'}>
                    <span className={'signup-form-radio-text'}>
                      {eventTimeHeading}
                    </span>
                <div className={'signup-form-radio-subheading'}>
                  {eventTimeSubtext}
                </div>
              </div>
            }
            onChange={({target: {value}}) => setDriverEventTime(eventTimeHeading)}
            required
        />
    );
  });

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'8'}>
        <span className={'signup-form-title'}>Sign up to drive to {eventName}!</span>

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

                {eventTimesRadioButtons}
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
