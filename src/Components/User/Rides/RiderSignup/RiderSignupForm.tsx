/**
 * Rider signup form.
 */

import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { EventTimeOption, CreateRiderInput, RideSignupStatus } from '../../../../Api';
import { getEventsByEventId } from '../../../../graphql/queries';
import { createRider } from '../../../../graphql/mutations';

import { useComponentDidUpdateEffect } from 'Hooks/UseComponentDidUpdateEffect';

import { API, graphqlOperation } from 'aws-amplify';

import { PickupLocationPopup } from "./PickupLocationPopup/PickupLocationPopup";

import '../../../../css/common/forms.scss';

interface RiderSignupFormProps {
  setRiderSignupCompleted: (riderSignupValue: boolean) => void;
}

export const RiderSignupForm = (riderSignupFormProps: RiderSignupFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [eventId, setEventId] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventPickupLocations, setEventPickupLocations] = useState<string[]>([]);
  const [eventTimes, setEventTimes] = useState<EventTimeOption[]>([]);

  const [riderName, setRiderName] = useState<string>('');
  const [riderEmail, setRiderEmail] = useState<string>('');
  const [riderPhoneNumber, setRiderPhoneNumber] = useState<string>('');
  const [riderEventPickupLocation, setRiderEventPickupLocation] = useState<string>('');
  const [riderEventTime, setRiderEventTime] = useState<string>('');
  const [riderComments, setRiderComments] = useState<string>('');

  const [
    disableOffCampusPickupLocationTextInput,
    setDisableOffCampusPickupLocationTextInput,
  ] = useState(true);

  /**
   * Get search params from url (fires on render).
   */
  useEffect(() => {
    setEventId(searchParams.get('eventId') || '');
  }, [searchParams]);

  /**
   * Pull event data from GraphQL backend (fires only when eventId updates).
   */
  useComponentDidUpdateEffect(() => {
    const fetchEventData = async () => {
      await (API.graphql(graphqlOperation(getEventsByEventId, {
        eventId: eventId
      })) as Promise<any>).then((result) => {
        const eventData = result.data.getEventsByEventId.items[0];

        setEventName(eventData['eventName']);
        setEventPickupLocations(eventData['eventPickupLocations']);
        setEventTimes(eventData['eventTimes']);
      }).catch((reason => {
        console.error(reason); // Log failure to the client - this will help us trace issues.
      }));
    };

    fetchEventData();
  }, [eventId]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const riderSignupData: CreateRiderInput = {
      eventId: eventId,
      riderName: riderName,
      riderEmail: riderEmail,
      riderPhoneNumber: riderPhoneNumber,
      riderEventTime: riderEventTime,
      riderEventPickupLocation: riderEventPickupLocation,
      riderComments: riderComments,
      riderSignupStatus: RideSignupStatus.IN_PROGRESS
    };

    await (API.graphql(graphqlOperation(createRider, {
      input: riderSignupData
    })) as Promise<any>).then((result) => {
      riderSignupFormProps.setRiderSignupCompleted(true);
    }).catch((reason) => {
      console.error(reason); // Log failure to the client - this will help us trace issues.
    });
  }

  const eventPickupLocationsRadioButtons = eventPickupLocations.map((pickupLocationName: string) => {
    return (
      <Form.Check
        key={pickupLocationName}
        name={'radio-pickup-location'}
        type={'radio'}
        id={`${pickupLocationName}-pickup-location-radio`}
        className={'signup-form-radio-button'}
        label={
          <span className={'signup-form-radio-text'}>
            {pickupLocationName}
          </span>
        }
        onClick={pickupLocationClickEvent => {
          setRiderEventPickupLocation(pickupLocationName);
          setDisableOffCampusPickupLocationTextInput(true);
        }}
        required
      />
    );
  });

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
            onChange={({target: {value}}) => setRiderEventTime(eventTimeHeading)}
            required
        />
    );
  });

  return (
    <Container>
      <Col className={'mx-auto text-center'} lg={'8'}>
        <span className={'signup-form-title'}>
          Sign up for a ride to {eventName}!
        </span>

        <Form className={'text-center'} onSubmit={handleFormSubmit}>
          <Row className={'text-start gx-5'}>
            <Col lg={'6'}>
              <Form.Group className={'mb-3'} controlId={'riderName'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Name *{' '}
                </Form.Label>
                <Form.Control placeholder={'Enter your name'}
                              onChange={({target: {value}}) => setRiderName(value)}
                              required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderEmail'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Email *{' '}
                </Form.Label>
                <Form.Control type={'email'} placeholder={'Enter your email'}
                              onChange={({target: {value}}) => setRiderEmail(value)}
                              required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderPhoneNumber'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Phone Number *{' '}
                </Form.Label>
                <Form.Control type={"tel"} placeholder={'Enter your phone number'}
                              onChange={({target: {value}}) => setRiderPhoneNumber(value)}
                              required/>
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderPickupLocation'}>
                <div>
                  <Form.Label className={'signup-form-label'}>
                      {' '}
                      Pickup Location *{' '}
                  </Form.Label>

                  <PickupLocationPopup />
                </div>

                {eventPickupLocationsRadioButtons}

                <div className={'off-campus-radio-text-input'}>
                  <Form.Check
                    className={'pe-3 signup-form-radio-button'}
                    name={'radio-pickup-location'}
                    type={'radio'}
                    id={'off-campus-pickup-location-radio'}
                    label={
                      <span className={'signup-form-radio-text'}>
                        {' '}
                        Off&nbsp;Campus{' '}
                      </span>
                    }
                    onClick={apartmentClickEvent => {
                      setDisableOffCampusPickupLocationTextInput(false);
                    }}
                    required
                  />

                  <Form.Control
                    type={'text'}
                    size={'sm'}
                    disabled={disableOffCampusPickupLocationTextInput}
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

                {eventTimesRadioButtons}
              </Form.Group>

              <Form.Group className={'mb-3'} controlId={'riderComments'}>
                <Form.Label className={'signup-form-label'}>
                  {' '}
                  Comments{' '}
                </Form.Label>
                <Form.Control
                    as={'textarea'}
                    rows={4}
                    onChange={({target: {value}}) => setRiderComments(value)} />
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
