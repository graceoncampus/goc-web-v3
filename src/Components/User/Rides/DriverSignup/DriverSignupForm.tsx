/**
 * Driver signup form.
 */

import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import '../../../../css/common/forms.scss';


interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

type EventTimeOption = {
  heading: string,
  subtext: string,
}

export const DriverSignupForm = (driverSignupFormProps: DriverSignupFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [eventTimes, setEventTimes] = useState<EventTimeOption[]>([
    {
      heading: 'Morning',
      subtext: '(9am - 12:30pm)'
    },
    {
      heading: 'Evening',
      subtext: '(6pm - 7:30pm)'
    },
    {
      heading: 'Staying',
      subtext: '(9am - 7:30pm)'
    },
  ]);

  const [driverName, setDriverName] = useState<string>('');
  const [driverEmail, setDriverEmail] = useState<string>('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState<string>('');
  const [driverEventTime, setDriverEventTime] = useState<string>('');
  const [driverAddress, setDriverAddress] = useState<string>('');
  const [driverNumRiderSpots, setDriverNumRiderSpots] = useState<number>(0);
  const [driverComments, setDriverComments] = useState<string>('');


  const eventTimesRadioButtons = eventTimes.map((eventTime: EventTimeOption) => {
    const eventTimeHeading = eventTime.heading;
    const eventTimeSubtext = eventTime.subtext;


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
        onChange={({ target: { value } }) => setDriverEventTime(eventTimeHeading)}
        required
      />
    );
  });

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'8'}>
        <span className={'signup-form-title'}>Sign up to drive to Church!</span>

        <Form className={'text-center'} onSubmit={() => { }} >
          <Row className={'text-start gx-5'}>
            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'driverName'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Name *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your name'}
                  onChange={({ target: { value } }) => setDriverName(value)}
                  required />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverEmail'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Email *{' '}
                </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'}
                  onChange={({ target: { value } }) => setDriverEmail(value)}
                  required />
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'driverPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Phone Number *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your phone number'}
                  onChange={({ target: { value } }) => setDriverPhoneNumber(value)}
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
                  onChange={({ target: { value } }) => setDriverAddress(value)}
                  required />
              </Form.Group>
              <Form.Group className={'mb-3'} controlId={'driverNumRiderSpots'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Number of spots (excluding you) *{' '}
                </Form.Label>
                <Form.Control
                  placeholder={'Enter number of spots in your car'}
                  onChange={({ target: { value } }) => setDriverNumRiderSpots(parseInt(value))}
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
                  onChange={({ target: { value } }) => setDriverComments(value)} />
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
