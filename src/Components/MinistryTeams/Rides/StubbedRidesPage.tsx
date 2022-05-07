/**
 * TEMP PAGE - STUBBED PAGE TO BE REPLACED.
 */

import React from 'react';
import { Container } from 'react-bootstrap';
import { HeaderNavbarActiveKey } from 'Components/MinistryTeams/Header/Header';
import { MinistryTeamTemplate } from 'Components/MinistryTeams/Template/MinistryTeamTemplate';

const StubbedRidesBody = () => {
    return (
        <Container fluid>
            <span> PUT STUFF HERE! </span>
        </Container>
    );
};

export const StubbedRidesPage = () => {
    return (
        <MinistryTeamTemplate activeKey={HeaderNavbarActiveKey.RIDES} body={<StubbedRidesBody />}/>
    );
}