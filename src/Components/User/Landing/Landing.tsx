import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';

const LandingBody = () => {
    const navigate = useNavigate();

    return (
        <div>
            <span>Landing Page!</span>
            {/* for testing */}
            <button onClick={() => navigate('/rides/rider/signup')}>
                go to rider signup
            </button>
            <button onClick={() => navigate('/rides/driver/signup')}>
                go to driver signup
            </button>
        </div>
    )
}

export const Landing = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.NONE} body={<LandingBody />} />
    );
};
