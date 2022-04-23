import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { TiDelete } from 'react-icons/ti';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { HiTrash } from 'react-icons/hi';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
  BsBellFill,
} from 'react-icons/bs';
import { MdHomeFilled, MdPublish } from 'react-icons/md';
import { AiFillMail } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './CreateEventSignupForm.scss';

interface TimeChoice {
  heading: string;
  subtext: string;
}

interface SidePanelProps {
  signupNotifications: string;
  numSignups: number;
}

const SignupFormCreator = () => {
  const [includePickupLocation, setIncludePickupLocation] = useState(false);
  const [includeTimeChoices, setIncludeTimeChoices] = useState(false);
  const [timeChoices, setTimeChoices] = useState([
    { heading: 'Morning', subtext: '9am-12:30pm' },
  ]);
  const [eventTitle, setEventTitle] = useState('');

  return (
    <Form className={'ps-3 pe-3'} onSubmit={e => e.preventDefault()}>
      <h1 className={'mb-3'}>
        <input
          className={'title-input'}
          required
          placeholder={'Untitled Event'}
          value={eventTitle}
          onChange={e => setEventTitle(e.target.value)}
        />
      </h1>
      <Form.Group className={'d-flex-column form-creator'}>
        <span className={'form-title'}>Sign Up Form</span>
        <Form.Check
          label={'include pickup location choices'}
          className={'mb-3 mt-2'}
          onChange={e => {
            setIncludePickupLocation(!includePickupLocation);
          }}
          checked={includePickupLocation}
        />
        <Form.Check
          label={'include time choices'}
          onChange={e => {
            setIncludeTimeChoices(!includeTimeChoices);
          }}
          checked={includeTimeChoices}
        />
        {includeTimeChoices && (
          <div>
            {timeChoices.map((timeChoice: TimeChoice, index: number) => {
              return (
                <div className={'d-flex justify-content-start'} key={index}>
                  <div style={{ width: '50%' }}>
                    Heading:{' '}
                    <input
                      required
                      value={timeChoice.heading}
                      placeholder={'Enter heading'}
                      onChange={e =>
                        setTimeChoices(
                          timeChoices.map((tc, i) =>
                            index == i
                              ? {
                                  heading: e.target.value,
                                  subtext: tc.subtext,
                                }
                              : tc,
                          ),
                        )
                      }
                      className={'sub-input bold-text'}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    Subtext:{' '}
                    <input
                      value={timeChoice.subtext}
                      placeholder={'Enter time range'}
                      onChange={e =>
                        setTimeChoices(
                          timeChoices.map((tc, i) =>
                            index == i
                              ? {
                                  heading: tc.heading,
                                  subtext: e.target.value,
                                }
                              : tc,
                          ),
                        )
                      }
                      className={'sub-input bold-text'}
                    />
                  </div>
                  <IconContext.Provider value={{ size: '26' }}>
                    <TiDelete
                      onClick={() =>
                        setTimeChoices(timeChoices.filter((_, i) => index != i))
                      }
                      style={{ alignSelf: 'center', cursor: 'pointer' }}
                    />
                  </IconContext.Provider>
                </div>
              );
            })}
            <div className={'mb-3'}>
              <span
                className={'add-options'}
                onClick={() => {
                  setTimeChoices([
                    ...timeChoices,
                    { heading: '', subtext: '' },
                  ]);
                }}
              >
                + Add Options
              </span>
            </div>
          </div>
        )}
        <Button variant={'submit'} className={'p-3 mt-3 mb-3'} type={'submit'}>
          publish event sign up form
        </Button>
      </Form.Group>
    </Form>
  );
};

const Utilities = () => {
  return (
    <div className={'panel'}>
      <div className={'utility'} onClick={() => console.log('publish rides')}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <MdPublish />
        </IconContext.Provider>
        <span className={'ms-2'}>publish rides</span>
      </div>
      <div
        className={'utility'}
        onClick={() => console.log('send driver email')}
      >
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <AiFillMail />
        </IconContext.Provider>
        <span className={'ms-2'}>send driver email</span>
      </div>
      <div className={'utility'} onClick={() => console.log('delete event')}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <HiTrash />
        </IconContext.Provider>
        <span className={'ms-2'}>delete event</span>
      </div>
    </div>
  );
};

const SidePanel = ({ signupNotifications, numSignups }: SidePanelProps) => {
  return (
    <div className={'panel'}>
      <div className={'d-flex flex-row align-items-center mb-3'}>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <BsBellFill />
        </IconContext.Provider>
        <div className={'ms-1'}>
          signup notifications <br />
          {signupNotifications}
        </div>
      </div>
      <div className={'signups'}>
        {numSignups == 0 ? 'no' : numSignups} signups
      </div>

      <div
        className={'create-rides'}
        onClick={() => console.log('create rides')}
      >
        <span className={'me-2'}>CREATE RIDES</span>
        <IconContext.Provider value={{ size: '2.5rem' }}>
          <BsFillArrowRightCircleFill />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export const CreateEventSignupForm = () => {
  // fetch
  const [signupNotifications, setSignupNotifications] = useState('none');
  const [numSignups, setNumSignups] = useState(0);

  return (
    <Container className={'page'} fluid>
      <Row>
        <Col lg={6}>
          <SignupFormCreator />
        </Col>
        <Col lg={3}>
          <Utilities />
        </Col>
        <Col lg={3}>
          <SidePanel
            signupNotifications={signupNotifications}
            numSignups={numSignups}
          />
        </Col>
      </Row>
    </Container>
  );
};
