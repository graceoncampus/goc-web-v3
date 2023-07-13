import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';
import { Button } from 'react-bootstrap';

import './RidesLanding.scss';

export const RidesLanding = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.RIDES}
      body={<RidesLandingBody />}
    />
  );
};

const rides = [
  {
    driver: 'Michael Bao',
    riders: ['Person1', 'Person2', 'Person3', 'Person4', 'Person5'],
    comments: 'Leaving Early!',
  },
  {
    driver: 'Michael Bao',
    riders: [
      'Person1',
      'Person2',
      'Person3',
      'Person4',
      'Person5',
      'Person6',
      'Person7',
    ],
    comments: 'Staying',
  },
  {
    driver: 'Michael Bao',
    riders: ['Person1', 'Person2', 'Person3'],
    comments: 'Evening only',
  },
];

const RidesLandingBody = () => {
  return (
    <div>
      <div className="overlay" id="rides-landing">
        <h1>
          Need a ride?
          <br />
          We've got you covered.
        </h1>
        <Button
          className="button"
          variant="dark"
          href="/rides/rider/signup"
          target="_blank"
        >
          I need a ride
        </Button>
        <Button
          className="button"
          variant="dark"
          href="/rides/driver/signup"
          target="_blank"
        >
          I can drive
        </Button>
      </div>
      <div className="rides-container">
        <div className="table-header">
          <div className="column-item">Driver</div>
          <div className="column-item">Rider(s)</div>
          <div className="column-item">Comments</div>
        </div>

        {rides.map((ride, i) => {
          return (
            <div className={i % 2 == 0 ? 'table-row' : 'even table-row'}>
              <div className="column-item">{ride.driver} </div>
              <div className="column-item">
                {ride.riders.map((rider, i) => {
                  return <span>{rider}</span>;
                })}
              </div>
              <div className="column-item">{ride.comments} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
