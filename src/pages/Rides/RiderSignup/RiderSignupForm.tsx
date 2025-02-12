/**
 * Rider signup form.
 */

import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { PickupLocationPopup } from "./PickupLocationPopup/PickupLocationPopup";

interface RiderSignupFormProps {
  setRiderSignupCompleted: (riderSignupValue: boolean) => void;
}

type EventTimeOption = {
  heading: string;
  subtext: string;
};

export const RiderSignupForm = (riderSignupFormProps: RiderSignupFormProps) => {
  const [eventPickupLocations, setEventPickupLocations] = useState<string[]>([
    "Hedrick Turnaround",
    "Holly Turnaround",
    "De Neve Turnaround",
  ]);
  const [eventTimes, setEventTimes] = useState<EventTimeOption[]>([
    {
      heading: "Morning",
      subtext: "(9am - 12:30pm)",
    },
    {
      heading: "Evening",
      subtext: "(6pm - 7:30pm)",
    },
    {
      heading: "Staying",
      subtext: "(9am - 7:30pm)",
    },
  ]);

  const [riderName, setRiderName] = useState<string>("");
  const [riderEmail, setRiderEmail] = useState<string>("");
  const [riderPhoneNumber, setRiderPhoneNumber] = useState<string>("");
  const [riderEventPickupLocation, setRiderEventPickupLocation] =
    useState<string>("");
  const [riderEventTime, setRiderEventTime] = useState<string>("");
  const [riderComments, setRiderComments] = useState<string>("");

  const [
    disableOffCampusPickupLocationTextInput,
    setDisableOffCampusPickupLocationTextInput,
  ] = useState(true);

  const eventPickupLocationsRadioButtons = eventPickupLocations.map(
    (pickupLocationName: string) => {
      return (
        <Form.Check
          key={pickupLocationName}
          name={"radio-pickup-location"}
          type={"radio"}
          id={`${pickupLocationName}-pickup-location-radio`}
          className={"signup-form-radio-button"}
          label={
            <span className={"signup-form-radio-text"}>
              {pickupLocationName}
            </span>
          }
          onClick={(pickupLocationClickEvent) => {
            setRiderEventPickupLocation(pickupLocationName);
            setDisableOffCampusPickupLocationTextInput(true);
          }}
          required={true}
        />
      );
    },
  );

  const eventTimesRadioButtons = eventTimes.map(
    (eventTime: EventTimeOption) => {
      const eventTimeHeading = eventTime.heading;
      const eventTimeSubtext = eventTime.subtext;

      return (
        <Form.Check
          key={eventTimeHeading}
          name={"radio-time"}
          type={"radio"}
          id={`${eventTimeHeading}-radio`}
          className={"signup-form-radio-button"}
          label={
            <div className={"time-label"}>
              <span className={"signup-form-radio-text"}>
                {eventTimeHeading}
              </span>
              <div className={"signup-form-radio-subheading"}>
                {eventTimeSubtext}
              </div>
            </div>
          }
          onChange={({ target: { value } }) =>
            setRiderEventTime(eventTimeHeading)
          }
          required={true}
        />
      );
    },
  );

  return (
    <Container>
      <Col className={"mx-auto text-center"} lg={"8"}>
        <span className={"signup-form-title"}>
          Sign up for a ride to Church!
        </span>

        <Form className={"text-center"} onSubmit={() => {}}>
          <Row className={"text-start gx-5"}>
            <Col lg={"6"}>
              <Form.Group className={"mb-3"} controlId={"riderName"}>
                <Form.Label className={"signup-form-label"}>
                  {" "}
                  Name *{" "}
                </Form.Label>
                <Form.Control
                  placeholder={"Enter your name"}
                  onChange={({ target: { value } }) => setRiderName(value)}
                  required={true}
                />
              </Form.Group>

              <Form.Group className={"mb-3"} controlId={"riderEmail"}>
                <Form.Label className={"signup-form-label"}>
                  {" "}
                  Email *{" "}
                </Form.Label>
                <Form.Control
                  type={"email"}
                  placeholder={"Enter your email"}
                  onChange={({ target: { value } }) => setRiderEmail(value)}
                  required={true}
                />
              </Form.Group>

              <Form.Group className={"mb-3"} controlId={"riderPhoneNumber"}>
                <Form.Label className={"signup-form-label"}>
                  {" "}
                  Phone Number *{" "}
                </Form.Label>
                <Form.Control
                  type={"tel"}
                  placeholder={"Enter your phone number"}
                  onChange={({ target: { value } }) =>
                    setRiderPhoneNumber(value)
                  }
                  required={true}
                />
              </Form.Group>

              <Form.Group className={"mb-3"} controlId={"riderPickupLocation"}>
                <div>
                  <Form.Label className={"signup-form-label"}>
                    {" "}
                    Pickup Location *{" "}
                  </Form.Label>

                  <PickupLocationPopup />
                </div>

                {eventPickupLocationsRadioButtons}

                <div className={"off-campus-radio-text-input"}>
                  <Form.Check
                    className={"pe-3 signup-form-radio-button"}
                    name={"radio-pickup-location"}
                    type={"radio"}
                    id={"off-campus-pickup-location-radio"}
                    label={
                      <span className={"signup-form-radio-text"}>
                        {" "}
                        Off&nbsp;Campus{" "}
                      </span>
                    }
                    onClick={(apartmentClickEvent) => {
                      setDisableOffCampusPickupLocationTextInput(false);
                    }}
                    required={true}
                  />

                  <Form.Control
                    type={"text"}
                    size={"sm"}
                    disabled={disableOffCampusPickupLocationTextInput}
                    required={true}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col lg={"6"}>
              <Form.Group className={"mb-3"} controlId={"riderTime"}>
                <Form.Label className={"signup-form-label"}>
                  {" "}
                  Time *{" "}
                </Form.Label>
                {eventTimesRadioButtons}
              </Form.Group>

              <Form.Group className={"mb-3"} controlId={"riderComments"}>
                <Form.Label className={"signup-form-label"}>
                  {" "}
                  Comments{" "}
                </Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={4}
                  onChange={({ target: { value } }) => setRiderComments(value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant={"submit"} type={"submit"}>
            <strong>SIGN UP</strong>
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
